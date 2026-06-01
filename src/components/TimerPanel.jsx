import { Pause, Play, RefreshCcw, X } from "lucide-react";
import { durations } from "../data/focusRoomData";
import { formatTime } from "../utils/time";

export function TimerPanel({ pomodoro, setPomodoro, secondsLeft, isRunning, onStart, onPause, onReset, onEnd, compact = false }) {
  const chooseDuration = (minutes) => {
    setPomodoro((prev) => ({ ...prev, duration: minutes }));
    onReset(minutes);
  };

  return (
    <div className={compact ? "text-center" : "rounded-3xl border border-white/12 bg-white/[0.07] p-5"}>
      <div className="mb-4 flex flex-wrap justify-center gap-2 sm:mb-5">
        {durations.map((minutes) => (
          <button key={minutes} onClick={() => chooseDuration(minutes)} aria-pressed={pomodoro.duration === minutes} className={`rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5 ${pomodoro.duration === minutes ? "border-sky-200 bg-sky-200 text-slate-950" : "border-white/14 bg-white/[0.08] text-white/72 hover:bg-white/14 hover:text-white"}`}>{minutes} 分钟</button>
        ))}
      </div>
      <div className="mx-auto grid aspect-square w-48 place-items-center rounded-full border border-white/15 bg-black/20 shadow-glow backdrop-blur-xl sm:w-64">
        <div><p className="text-center text-sm tracking-[0.34em] text-white/56">{isRunning ? "学习中" : "暂停中"}</p><p className="mt-3 text-center text-5xl font-semibold tabular-nums text-white sm:text-7xl">{formatTime(secondsLeft)}</p></div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button onClick={onStart} className="focus-button primary-button"><Play size={17} />开始</button>
        <button onClick={onPause} className="focus-button"><Pause size={17} />暂停</button>
        <button onClick={() => onReset()} className="focus-button"><RefreshCcw size={17} />重置</button>
        {onEnd && <button onClick={onEnd} className="focus-button"><X size={17} />结束学习</button>}
      </div>
    </div>
  );
}
