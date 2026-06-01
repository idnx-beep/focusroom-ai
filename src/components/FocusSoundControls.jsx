import { Pause, Play } from "lucide-react";
import { ambiencePresets, getAmbiencePreset, getMusicPreset, musicPresets } from "../data/focusRoomData";

export function FocusSoundControls({ scene, sound, setSound, isAudioOn, onPreviewAudio, onStopAudio }) {
  const currentMusic = getMusicPreset(sound, scene);
  const currentAmbience = getAmbiencePreset(sound, scene);
  const setVolume = (key, value) => setSound((prev) => ({ ...prev, [key]: Number(value) }));
  const setType = (key, value) => setSound((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:contents">
      <section className="rounded-2xl border border-white/12 bg-black/20 p-3 sm:rounded-3xl sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-white/48">音乐</p>
            <p className="mt-1 truncate font-semibold text-white">{currentMusic.label}</p>
          </div>
          <button onClick={isAudioOn ? onStopAudio : onPreviewAudio} className="focus-button h-9 w-9 shrink-0 p-0" aria-label={isAudioOn ? "停止声音" : "播放声音"}>
            {isAudioOn ? <Pause size={15} /> : <Play size={15} />}
          </button>
        </div>
        <select value={currentMusic.id} onChange={(event) => setType("musicType", event.target.value)} aria-label="切换音乐类型" className="mt-3 w-full rounded-2xl border border-white/12 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none focus:border-sky-200/70">
          {musicPresets.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
        </select>
        <label className="mt-3 block">
          <span className="mb-1 flex items-center justify-between text-xs text-white/58">音量 <strong className="text-white">{sound.musicVolume}%</strong></span>
          <input aria-label="专注模式音乐音量" className="w-full" type="range" min="0" max="100" value={sound.musicVolume} onChange={(event) => setVolume("musicVolume", event.target.value)} />
        </label>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/20 p-3 sm:rounded-3xl sm:p-4">
        <div className="min-w-0">
          <p className="text-xs text-white/48">背景音</p>
          <p className="mt-1 truncate font-semibold text-white">{currentAmbience.label}</p>
        </div>
        <select value={currentAmbience.id} onChange={(event) => setType("ambienceType", event.target.value)} aria-label="切换背景音类型" className="mt-3 w-full rounded-2xl border border-white/12 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none focus:border-sky-200/70">
          {ambiencePresets.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
        </select>
        <label className="mt-3 block">
          <span className="mb-1 flex items-center justify-between text-xs text-white/58">音量 <strong className="text-white">{sound.ambienceVolume}%</strong></span>
          <input aria-label="专注模式背景音量" className="w-full" type="range" min="0" max="100" value={sound.ambienceVolume} onChange={(event) => setVolume("ambienceVolume", event.target.value)} />
        </label>
      </section>
    </div>
  );
}
