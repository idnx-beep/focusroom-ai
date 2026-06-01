import { Headphones, Pause, Play, Volume2 } from "lucide-react";
import { ambiencePresets, getAmbiencePreset, getMusicPreset, musicPresets } from "../data/focusRoomData";

export function SoundPanel({ scene, sound, setSound, isAudioOn, onPreviewAudio, onStopAudio }) {
  const currentMusic = getMusicPreset(sound, scene);
  const currentAmbience = getAmbiencePreset(sound, scene);
  const setVolume = (key, value) => setSound((prev) => ({ ...prev, [key]: Number(value) }));
  const setType = (key, value) => setSound((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/12 bg-white/[0.07] p-4">
        <div className="flex items-center justify-between gap-4"><div><p className="text-sm text-white/54">当前音乐</p><p className="mt-1 text-xl font-semibold text-white">{currentMusic.label}</p></div><Headphones className="text-sky-100" /></div>
        <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3">
          {musicPresets.map((preset) => (
            <button key={preset.id} onClick={() => setType("musicType", preset.id)} aria-pressed={currentMusic.id === preset.id} className={`rounded-2xl border px-2.5 py-2 text-xs transition hover:-translate-y-0.5 sm:px-3 sm:text-sm ${currentMusic.id === preset.id ? "border-sky-200 bg-sky-200 text-slate-950" : "border-white/12 bg-white/[0.08] text-white/72 hover:bg-white/14 hover:text-white"}`}>{preset.label}</button>
          ))}
        </div>
        <label className="mt-5 block"><span className="mb-2 flex items-center justify-between text-sm text-white/70">音乐音量 <strong className="text-white">{sound.musicVolume}%</strong></span><input aria-label="音乐音量" className="w-full" type="range" min="0" max="100" value={sound.musicVolume} onChange={(event) => setVolume("musicVolume", event.target.value)} /></label>
      </div>

      <div className="rounded-3xl border border-white/12 bg-white/[0.07] p-4">
        <div className="flex items-center justify-between gap-4"><div><p className="text-sm text-white/54">当前背景音</p><p className="mt-1 text-xl font-semibold text-white">{currentAmbience.label}</p></div><Volume2 className="text-sky-100" /></div>
        <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3">
          {ambiencePresets.map((preset) => (
            <button key={preset.id} onClick={() => setType("ambienceType", preset.id)} aria-pressed={currentAmbience.id === preset.id} className={`rounded-2xl border px-2.5 py-2 text-xs transition hover:-translate-y-0.5 sm:px-3 sm:text-sm ${currentAmbience.id === preset.id ? "border-sky-200 bg-sky-200 text-slate-950" : "border-white/12 bg-white/[0.08] text-white/72 hover:bg-white/14 hover:text-white"}`}>{preset.label}</button>
          ))}
        </div>
        <label className="mt-5 block"><span className="mb-2 flex items-center justify-between text-sm text-white/70">背景音量 <strong className="text-white">{sound.ambienceVolume}%</strong></span><input aria-label="背景音量" className="w-full" type="range" min="0" max="100" value={sound.ambienceVolume} onChange={(event) => setVolume("ambienceVolume", event.target.value)} /></label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/12 bg-black/20 p-3 sm:p-4">
        <div><p className="text-sm text-white/54">声音状态</p><p className="mt-1 font-semibold text-white">{isAudioOn ? "正在播放本地音乐和背景声" : "尚未启动，点击试听或开始学习"}</p></div>
        <div className="flex flex-wrap gap-2"><button onClick={onPreviewAudio} className="focus-button primary-button px-4 py-2.5"><Play size={16} />试听声音</button><button onClick={onStopAudio} className="focus-button px-4 py-2.5"><Pause size={16} />停止</button></div>
      </div>
    </div>
  );
}
