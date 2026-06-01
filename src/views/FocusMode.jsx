import { Pause, Play, Square } from "lucide-react";
import { FocusSoundControls } from "../components/FocusSoundControls";
import { formatTime } from "../utils/time";

export function FocusMode({ scene, sound, setSound, isAudioOn, goal, pomodoro, secondsLeft, isRunning, onToggleTimer, onEndStudy, stats, onPreviewAudio, onStopAudio }) {
  return (
    <main className="min-h-screen px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-7xl flex-col sm:min-h-[calc(100vh-40px)]">
        <div className="flex items-center justify-between gap-3">
          <div className="glass-chip rounded-full px-3 py-2 text-xs text-white/76 sm:px-4 sm:py-3 sm:text-sm">FocusRoom AI · {scene.title}</div>
          <div className="glass-chip rounded-full px-3 py-2 text-xs text-white/60 sm:px-4 sm:py-3 sm:text-sm">{pomodoro.duration} 分钟专注轮</div>
        </div>

        <div className="grid flex-1 place-items-center py-6 sm:py-10">
          <section className="text-center" aria-label="专注倒计时">
            <p className="text-sm tracking-[0.34em] text-white/56">{isRunning ? "学习中" : "暂停中"}</p>
            <p className="mt-4 text-7xl font-semibold tabular-nums text-white drop-shadow-2xl sm:text-8xl lg:text-9xl">{formatTime(secondsLeft)}</p>
            <p className="mx-auto mt-5 max-w-xl px-4 text-sm leading-6 text-white/62 sm:text-base">{goal || "写下今天想完成的事，然后把这一轮交给它。"}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button onClick={onToggleTimer} className="focus-button primary-button min-w-32">
                {isRunning ? <Pause size={17} /> : <Play size={17} />}{isRunning ? "暂停" : "继续"}
              </button>
              <button onClick={onEndStudy} className="focus-button min-w-32"><Square size={16} />结束</button>
            </div>
          </section>
        </div>

        <div className="glass-panel grid gap-2 rounded-[1.5rem] p-2 sm:grid-cols-2 sm:gap-3 sm:rounded-[2rem] sm:p-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_0.85fr] lg:items-center">
          <FocusSoundControls scene={scene} sound={sound} setSound={setSound} isAudioOn={isAudioOn} onPreviewAudio={onPreviewAudio} onStopAudio={onStopAudio} />
          <div className="rounded-2xl border border-white/12 bg-black/20 p-3 sm:rounded-3xl sm:p-4"><p className="text-xs text-white/48">今日目标</p><p className="mt-1 truncate font-semibold text-white">{goal || "写下今天想完成的事"}</p></div>
          <div className="rounded-2xl border border-white/12 bg-black/20 p-3 sm:rounded-3xl sm:p-4"><p className="text-xs text-white/48">今日记录</p><p className="mt-1 font-semibold text-white">{stats.rounds} 轮 · {Math.round(stats.focusSeconds / 60)}m</p><p className="mt-1 text-xs text-white/42">部分学习 {stats.partialSessions || 0} 次</p></div>
        </div>
      </div>
    </main>
  );
}
