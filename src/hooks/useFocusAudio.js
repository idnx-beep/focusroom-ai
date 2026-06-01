import { useEffect, useRef, useState } from "react";
import { ambiencePresets, getAmbiencePreset, getMusicPreset } from "../data/focusRoomData";

function safeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function useFocusAudio(scene, sound) {
  const contextRef = useRef(null);
  const nodesRef = useRef([]);
  const timersRef = useRef([]);
  const gainsRef = useRef({ music: null, ambience: null });
  const [isAudioOn, setIsAudioOn] = useState(false);

  const stopAudio = () => {
    timersRef.current.forEach((timer) => window.clearInterval(timer));
    timersRef.current = [];

    nodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch {
        // Some AudioNodes do not expose stop or are already stopped.
      }
      try {
        node.disconnect();
      } catch {
        // Disconnect may throw when a node was already detached.
      }
    });

    nodesRef.current = [];
    gainsRef.current = { music: null, ambience: null };
    setIsAudioOn(false);
  };

  const trackNode = (node) => {
    nodesRef.current.push(node);
    return node;
  };

  const makeNoiseBuffer = (context, intensity = 1, seconds = 3) => {
    const bufferSize = Math.floor(context.sampleRate * seconds);
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);
    let brown = 0;

    for (let index = 0; index < bufferSize; index += 1) {
      const white = Math.random() * 2 - 1;
      brown = (brown + 0.022 * white) / 1.022;
      output[index] = (white * 0.08 + brown * 0.92) * intensity * 0.62;
    }

    return buffer;
  };

  const makeImpulseResponse = (context, seconds = 1.6, decay = 2.4) => {
    const length = Math.floor(context.sampleRate * seconds);
    const impulse = context.createBuffer(2, length, context.sampleRate);

    for (let channel = 0; channel < 2; channel += 1) {
      const data = impulse.getChannelData(channel);
      for (let index = 0; index < length; index += 1) {
        const tail = Math.pow(1 - index / length, decay);
        data[index] = (Math.random() * 2 - 1) * tail * 0.28;
      }
    }

    return impulse;
  };

  const makeTone = (context, { frequency, type = "sine", gain = 0.05, attack = 0.02, release = 1, duration = 1.2, detune = 0, destination }) => {
    const now = context.currentTime;
    const oscillator = trackNode(context.createOscillator());
    const envelope = trackNode(context.createGain());

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.detune.setValueAtTime(detune, now);
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(Math.max(gain, 0.0001), now + attack);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration + release);

    oscillator.connect(envelope);
    envelope.connect(destination);
    oscillator.onended = () => {
      try {
        oscillator.disconnect();
        envelope.disconnect();
      } catch {
        // Nodes may already be disconnected during a full reset.
      }
      nodesRef.current = nodesRef.current.filter((node) => node !== oscillator && node !== envelope);
    };
    oscillator.start(now);
    oscillator.stop(now + duration + release + 0.1);
  };

  const startAudio = async (targetScene = scene) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;

    const context = contextRef.current || new AudioContext({ latencyHint: "interactive" });
    contextRef.current = context;
    await context.resume();
    stopAudio();

    const sceneMusic = getMusicPreset(sound, targetScene);
    const sceneAmbience = getAmbiencePreset(sound, targetScene);
    const musicVolume = safeNumber(sound.musicVolume, 72) / 100;
    const ambienceVolume = safeNumber(sound.ambienceVolume, 35) / 100;

    const master = trackNode(context.createGain());
    const musicGain = trackNode(context.createGain());
    const ambienceGain = trackNode(context.createGain());
    const compressor = trackNode(context.createDynamicsCompressor());
    const delay = trackNode(context.createDelay(1.4));
    const delayFeedback = trackNode(context.createGain());
    const reverb = trackNode(context.createConvolver());
    const reverbGain = trackNode(context.createGain());
    const melodyFilter = trackNode(context.createBiquadFilter());
    const padFilter = trackNode(context.createBiquadFilter());
    const ambienceFilter = trackNode(context.createBiquadFilter());
    const baseNoiseGain = trackNode(context.createGain());
    const airFilter = trackNode(context.createBiquadFilter());
    const airGain = trackNode(context.createGain());
    const ambienceMotion = trackNode(context.createOscillator());
    const ambienceMotionGain = trackNode(context.createGain());

    master.gain.value = 0.86;
    musicGain.gain.value = musicVolume * 0.82;
    ambienceGain.gain.value = ambienceVolume * sceneAmbience.level;
    gainsRef.current = { music: musicGain, ambience: ambienceGain };

    compressor.threshold.value = -22;
    compressor.knee.value = 18;
    compressor.ratio.value = 3.2;
    compressor.attack.value = 0.012;
    compressor.release.value = 0.24;

    delay.delayTime.value = sceneMusic.delay ?? 0.28;
    delayFeedback.gain.value = sceneMusic.feedback ?? 0.22;
    reverb.buffer = makeImpulseResponse(context, 1.5, 2.6);
    reverbGain.gain.value = 0.16;

    melodyFilter.type = "lowpass";
    melodyFilter.frequency.value = sceneMusic.filter;
    melodyFilter.Q.value = 0.65;

    padFilter.type = "lowpass";
    padFilter.frequency.value = sceneMusic.filter * 0.58;
    padFilter.Q.value = 0.45;

    delay.connect(delayFeedback);
    delayFeedback.connect(delay);
    delay.connect(musicGain);
    reverb.connect(reverbGain);
    reverbGain.connect(musicGain);
    melodyFilter.connect(musicGain);
    melodyFilter.connect(delay);
    melodyFilter.connect(reverb);
    padFilter.connect(musicGain);
    padFilter.connect(reverb);
    musicGain.connect(master);

    const baseNoise = trackNode(context.createBufferSource());
    const airNoise = trackNode(context.createBufferSource());
    baseNoise.buffer = makeNoiseBuffer(context, sceneAmbience.noise, 4);
    airNoise.buffer = makeNoiseBuffer(context, 0.28, 4);
    baseNoise.loop = true;
    airNoise.loop = true;

    ambienceFilter.type = sceneAmbience.type;
    ambienceFilter.frequency.value = sceneAmbience.frequency;
    ambienceFilter.Q.value = sceneAmbience.q;
    baseNoiseGain.gain.value = 0.9;
    airFilter.type = "highpass";
    airFilter.frequency.value = 2600;
    airFilter.Q.value = 0.18;
    airGain.gain.value = Math.min(0.12, Math.max(0.02, sceneAmbience.air || 0.08));

    ambienceMotion.type = "sine";
    ambienceMotion.frequency.value = 0.045 + (sceneAmbience.motion || 0.2) * 0.08;
    ambienceMotionGain.gain.value = sceneAmbience.frequency * (sceneAmbience.motion || 0.2);
    ambienceMotion.connect(ambienceMotionGain);
    ambienceMotionGain.connect(ambienceFilter.frequency);

    baseNoise.connect(ambienceFilter);
    ambienceFilter.connect(baseNoiseGain);
    baseNoiseGain.connect(ambienceGain);
    airNoise.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(ambienceGain);
    ambienceGain.connect(master);

    const pannerSupported = typeof context.createStereoPanner === "function";
    const chord = sceneMusic.chord || sceneMusic.notes.slice(0, 4);
    chord.forEach((frequency, index) => {
      [-7, 6].forEach((detune, detuneIndex) => {
        const oscillator = trackNode(context.createOscillator());
        const gain = trackNode(context.createGain());
        const panner = pannerSupported ? trackNode(context.createStereoPanner()) : null;
        oscillator.type = sceneMusic.padWave || "sine";
        oscillator.frequency.value = frequency;
        oscillator.detune.value = detune + index * 1.5;
        gain.gain.value = (0.012 + (sceneMusic.warmth || 0.7) * 0.006) / (index + 1.3);
        oscillator.connect(gain);
        if (panner) {
          panner.pan.value = detuneIndex === 0 ? -0.28 : 0.28;
          gain.connect(panner);
          panner.connect(padFilter);
        } else {
          gain.connect(padFilter);
        }
        oscillator.start();
      });
    });

    master.connect(compressor);
    compressor.connect(context.destination);
    baseNoise.start();
    airNoise.start();
    ambienceMotion.start();

    let step = 0;
    const playNote = () => {
      const frequency = sceneMusic.notes[step % sceneMusic.notes.length];
      const harmony = step % 3 === 0 ? frequency * 1.5 : frequency * 2;
      makeTone(context, {
        frequency,
        type: sceneMusic.wave,
        gain: 0.095,
        attack: sceneMusic.attack,
        release: sceneMusic.release,
        duration: 0.08,
        detune: step % 2 === 0 ? -2 : 2,
        destination: melodyFilter
      });
      if ((sceneMusic.shimmer || 0) > 0.2 && step % 2 === 0) {
        makeTone(context, {
          frequency: harmony,
          type: "sine",
          gain: 0.024 * sceneMusic.shimmer,
          attack: 0.018,
          release: Math.min(sceneMusic.release + 0.35, 1.9),
          duration: 0.04,
          detune: 4,
          destination: melodyFilter
        });
      }
      step += 1;
    };

    const playPulse = () => {
      const bass = (sceneMusic.chord && sceneMusic.chord[0]) || sceneMusic.notes[0] / 2;
      makeTone(context, {
        frequency: bass,
        type: "sine",
        gain: 0.055,
        attack: 0.008,
        release: 0.24,
        duration: 0.03,
        destination: musicGain
      });
    };

    const playCrackle = () => {
      if (!sceneAmbience.crackle || Math.random() < 0.45) return;
      const burst = trackNode(context.createBufferSource());
      const gain = trackNode(context.createGain());
      const filter = trackNode(context.createBiquadFilter());
      burst.buffer = makeNoiseBuffer(context, 0.55, 0.08);
      filter.type = "bandpass";
      filter.frequency.value = 1200 + Math.random() * 1200;
      filter.Q.value = 4.5;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.09);
      burst.connect(filter);
      filter.connect(gain);
      gain.connect(ambienceGain);
      burst.onended = () => {
        try {
          burst.disconnect();
          gain.disconnect();
          filter.disconnect();
        } catch {
          // Burst may already be disconnected during reset.
        }
        nodesRef.current = nodesRef.current.filter((node) => node !== burst && node !== gain && node !== filter);
      };
      burst.start();
      burst.stop(context.currentTime + 0.1);
    };

    playNote();
    timersRef.current = [window.setInterval(playNote, sceneMusic.tempo)];
    if (sceneMusic.pulse) timersRef.current.push(window.setInterval(playPulse, sceneMusic.tempo * 2));
    if (sceneAmbience.crackle) timersRef.current.push(window.setInterval(playCrackle, 420));

    setIsAudioOn(true);
    return true;
  };

  useEffect(() => {
    if (gainsRef.current.music) {
      gainsRef.current.music.gain.value = (safeNumber(sound.musicVolume, 72) / 100) * 0.82;
    }
    if (gainsRef.current.ambience) {
      const preset = ambiencePresets.find((item) => item.id === sound.ambienceType) || ambiencePresets[0];
      gainsRef.current.ambience.gain.value = (safeNumber(sound.ambienceVolume, 35) / 100) * preset.level;
    }
  }, [sound]);

  useEffect(() => () => stopAudio(), []);

  return { isAudioOn, startAudio, stopAudio };
}
