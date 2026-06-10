import { Pause, Play, RefreshCcw, X } from "lucide-react";
import { durations } from "../data/focusRoomData";
import { formatTime } from "../utils/time";

export function TimerPanel({ pomodoro, setPomodoro, secondsLeft, isRunning, onStart, onPause, onReset, onEnd, compact = false }) {
  const chooseDuration = (minutes) => {
    setPomodoro((prev) => ({ ...prev, duration: minutes }));
    onReset(minutes);
  };

  return (
    <div className={compact ? "text-center" : "min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 sm:p-5"}>
      {!compact && <div className="mb-4"><p className="text-sm font-semibold text-white/75">3. 选择专注时长</p><p className="mt-1 text-sm leading-6 text-white/50">开始后会进入沉浸式自习室。</p></div>}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-5 sm:flex sm:flex-wrap sm:justify-center">
        {durations.map((minutes) => (
          <button key={minutes} onClick={() => chooseDuration(minutes)} aria-pressed={pomodoro.duration === minutes} className={`min-h-11 rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5 active:translate-y-0 ${pomodoro.duration === minutes ? "border-sky-200 bg-sky-200 text-slate-950 shadow-[0_0_26px_rgba(125,211,252,0.18)]" : "border-white/12 bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white"}`}>{minutes} 分钟</button>
        ))}
      </div>
      <div className="mx-auto grid aspect-square w-44 place-items-center rounded-full border border-white/12 bg-black/[0.24] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_44px_rgba(125,211,252,0.16)] backdrop-blur-xl sm:w-64">
        <div><p className="text-center text-sm tracking-[0.34em] text-white/56">{isRunning ? "学习中" : "暂停中"}</p><p className="mt-3 text-center text-5xl font-semibold tabular-nums text-white sm:text-7xl">{formatTime(secondsLeft)}</p></div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
        <button onClick={onStart} className="focus-button primary-button"><Play size={17} />开始专注</button>
        <button onClick={onPause} className="focus-button border-white/12 bg-white/[0.045]"><Pause size={17} />暂停</button>
        <button onClick={() => onReset()} className="focus-button border-white/12 bg-white/[0.045]"><RefreshCcw size={17} />重置</button>
        {onEnd && <button onClick={onEnd} className="focus-button border-white/12 bg-white/[0.045]"><X size={17} />结束</button>}
      </div>
    </div>
  );
}
