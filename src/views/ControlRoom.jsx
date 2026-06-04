import { scrollToControlRoom } from "../utils/time";
import { formatTime } from "../utils/time";
import { GoalPanel } from "../components/GoalPanel";
import { SceneSelector } from "../components/SceneSelector";
import { SoundPanel } from "../components/SoundPanel";
import { StudyHistoryPanel } from "../components/StudyHistoryPanel";
import { TimerPanel } from "../components/TimerPanel";

function StudyStats({ stats }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-white/12 bg-black/20 p-3"><p className="text-xs text-white/48">今日专注</p><p className="mt-1 text-2xl font-semibold text-white">{Math.round(stats.focusSeconds / 60)}m</p></div>
      <div className="rounded-2xl border border-white/12 bg-black/20 p-3"><p className="text-xs text-white/48">完成轮数</p><p className="mt-1 text-2xl font-semibold text-white">{stats.rounds}</p></div>
    </div>
  );
}

function GoalSummary({ goal }) {
  return (
    <div className="mt-4 rounded-3xl border border-white/12 bg-black/20 p-4">
      <p className="text-sm text-white/54">今日目标</p>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/76">{goal || "暂未设置，进入计划面板写下今天想完成的事。"}</p>
    </div>
  );
}

export function ControlRoom({ activePanel, setActivePanel, currentScene, setScene, sound, setSound, pomodoro, setPomodoro, timer, goal, setGoal, onStart, onEndStudy, isAudioOn, onPreviewAudio, onStopAudio, stats, historyRecords, onOpenShareCard, preferences, setPreferences }) {
  const panelTitle = { scene: "选择学习场景", music: "声音设置", plan: "番茄钟与今日目标", member: "会员计划" }[activePanel];
  const panelLinks = [["scene", "场景"], ["music", "音乐"], ["plan", "计划"], ["member", "会员"]];

  return (
    <section id="control-room" className="grid gap-5 pb-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-6 lg:pb-20">
      <div className="glass-panel rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-6">
        <div className="mb-5 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
          <div><p className="text-sm text-white/54">Control Console</p><h2 className="mt-1 text-2xl font-semibold text-white">{panelTitle}</h2></div>
          <div className="grid grid-cols-4 gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:hidden">
            {panelLinks.map(([id, label]) => (
              <button key={id} onClick={() => { setActivePanel(id); scrollToControlRoom(); }} className={"rounded-full px-2 py-1.5 text-xs transition " + (activePanel === id ? "bg-white text-slate-950" : "text-white/60 hover:bg-white/10 hover:text-white")}>{label}</button>
            ))}
          </div>
        </div>
        {activePanel === "scene" && <SceneSelector currentScene={currentScene} setScene={setScene} />}
        {activePanel === "music" && <SoundPanel scene={currentScene} sound={sound} setSound={setSound} isAudioOn={isAudioOn} onPreviewAudio={onPreviewAudio} onStopAudio={onStopAudio} />}
        {activePanel === "plan" && <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_0.8fr]"><TimerPanel pomodoro={pomodoro} setPomodoro={setPomodoro} secondsLeft={timer.secondsLeft} isRunning={timer.isRunning} onStart={onStart} onPause={timer.pause} onReset={timer.reset} onEnd={onEndStudy} /><GoalPanel goal={goal} setGoal={setGoal} /></div>}
        {activePanel === "member" && <div className="grid gap-4 sm:grid-cols-3">{["Free", "Plus", "Studio"].map((name, index) => <div key={name} className="rounded-3xl border border-white/12 bg-white/[0.07] p-5"><div className="flex items-center justify-between gap-2"><p className="text-lg font-semibold text-white">{name}</p>{index > 0 && <span className="rounded-full border border-amber-200/25 bg-amber-200/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-100">Coming soon</span>}</div><p className="mt-3 text-sm leading-6 text-white/60">{index === 0 && "本地目标、基础番茄钟和四个场景。"}{index === 1 && "Demo 展示：更多声音组合、专注统计和云端同步。"}{index === 2 && "Demo 展示：小组自习室、共享目标和学习复盘。"}</p></div>)}</div>}
      </div>
      <aside className="glass-panel rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-5">
        <div className="flex items-center justify-between"><div><p className="text-sm text-white/54">Now Loaded</p><h3 className="mt-1 text-2xl font-semibold text-white">{currentScene.title}</h3></div><span className="rounded-full border border-emerald-200/25 bg-emerald-200/10 px-3 py-1 text-xs text-emerald-100">Ready</span></div>
        <img src={currentScene.image} alt={currentScene.title} className="mt-5 aspect-[16/10] w-full rounded-3xl object-cover" />
        <StudyStats stats={stats} />
        <GoalSummary goal={goal} />
        <StudyHistoryPanel records={historyRecords} onOpenShare={onOpenShareCard} />
        <div className="mt-4 rounded-3xl border border-white/12 bg-black/20 p-4"><p className="text-sm text-white/54">下一轮时长</p><p className="mt-2 text-3xl font-semibold tabular-nums text-white sm:text-4xl">{formatTime((pomodoro.duration || 50) * 60)}</p><p className="mt-1 text-sm text-white/54">{pomodoro.duration} 分钟 · 从自习室模式开始计时</p></div>
        <label className="mt-4 flex cursor-pointer items-center justify-between rounded-2xl border border-white/12 bg-black/20 p-3 text-sm text-white/70"><span>低性能模式</span><input type="checkbox" checked={preferences.lowPerformance} onChange={(event) => setPreferences((prev) => ({ ...prev, lowPerformance: event.target.checked }))} /></label>
        <button onClick={onStart} className="focus-button primary-button mt-4 w-full">进入自习室模式</button>
      </aside>
    </section>
  );
}
