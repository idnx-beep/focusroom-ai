import { useState } from "react";
import { Coffee, Play, Save, User, X } from "lucide-react";

export function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="glass-panel w-full max-w-md rounded-[2rem] p-6">
        <div className="flex items-center justify-between gap-4"><div><div className="flex items-center gap-2"><p className="text-sm text-white/54">Prototype Account</p><span className="rounded-full border border-amber-200/25 bg-amber-200/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100">Demo</span></div><h2 id="login-title" className="mt-1 text-2xl font-semibold text-white">登录 FocusRoom AI</h2></div><button onClick={onClose} className="focus-button h-11 w-11 p-0" aria-label="关闭登录弹窗"><X size={18} /></button></div>
        <div className="mt-6 space-y-3"><label className="block"><span className="text-sm text-white/58">邮箱</span><input className="mt-2 w-full rounded-2xl border border-white/14 bg-black/25 px-4 py-3 text-white outline-none focus:border-sky-200/70" placeholder="you@example.com" /></label><label className="block"><span className="text-sm text-white/58">密码</span><input type="password" className="mt-2 w-full rounded-2xl border border-white/14 bg-black/25 px-4 py-3 text-white outline-none focus:border-sky-200/70" placeholder="••••••••" /></label></div>
        <button onClick={onClose} className="focus-button primary-button mt-5 w-full"><User size={17} />进入原型</button>
        <p className="mt-4 text-center text-sm text-white/48">Demo 功能：当前不会提交账号信息，也不会创建真实账号。</p>
      </div>
    </div>
  );
}

export function CompletionDialog({ onRestart, onRest, onClose, onSaveReview, stats }) {
  const [reflection, setReflection] = useState({ completed: "", blocker: "", next: "" });
  const setField = (key, value) => setReflection((current) => ({ ...current, [key]: value }));
  const finishWith = (action) => {
    onSaveReview?.(reflection);
    action();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/55 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="complete-title">
      <div className="glass-panel w-full max-w-2xl rounded-[2rem] p-5 sm:p-6">
        <div className="text-center">
          <p className="text-sm tracking-[0.28em] text-sky-100">SESSION COMPLETE</p>
          <h2 id="complete-title" className="mt-3 text-3xl font-semibold text-white">这一轮完成了</h2>
          <p className="mt-3 text-sm leading-6 text-white/62">今日已完成 {stats.rounds} 轮，累计专注 {Math.round(stats.focusSeconds / 60)} 分钟。</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="block rounded-3xl border border-white/12 bg-black/20 p-3">
            <span className="text-xs font-semibold text-white/58">这一轮完成了什么？</span>
            <textarea value={reflection.completed} onChange={(event) => setField("completed", event.target.value)} className="mt-2 h-24 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2 text-sm leading-5 text-white outline-none placeholder:text-white/30 focus:border-sky-200/70" placeholder="例如：整理完第一章笔记" />
          </label>
          <label className="block rounded-3xl border border-white/12 bg-black/20 p-3">
            <span className="text-xs font-semibold text-white/58">遇到了什么问题？</span>
            <textarea value={reflection.blocker} onChange={(event) => setField("blocker", event.target.value)} className="mt-2 h-24 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2 text-sm leading-5 text-white outline-none placeholder:text-white/30 focus:border-sky-200/70" placeholder="例如：概念还没完全理解" />
          </label>
          <label className="block rounded-3xl border border-white/12 bg-black/20 p-3">
            <span className="text-xs font-semibold text-white/58">下一轮准备做什么？</span>
            <textarea value={reflection.next} onChange={(event) => setField("next", event.target.value)} className="mt-2 h-24 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2 text-sm leading-5 text-white outline-none placeholder:text-white/30 focus:border-sky-200/70" placeholder="例如：刷 10 道对应练习题" />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => finishWith(onRestart)} className="focus-button primary-button"><Play size={17} />保存并再来一轮</button>
          <button onClick={() => finishWith(onRest)} className="focus-button"><Coffee size={17} />保存并休息</button>
          <button onClick={() => finishWith(onClose)} className="focus-button"><Save size={17} />保存并结束</button>
          <button onClick={onClose} className="focus-button"><X size={17} />跳过复盘</button>
        </div>
      </div>
    </div>
  );
}

export function RestDialog({ secondsLeft, onSkip }) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="rest-title">
      <div className="glass-panel w-full max-w-sm rounded-[2rem] p-6 text-center">
        <p className="text-sm tracking-[0.28em] text-emerald-100">REST MODE</p>
        <h2 id="rest-title" className="mt-3 text-2xl font-semibold text-white">休息一下</h2>
        <p className="mt-4 text-6xl font-semibold tabular-nums text-white">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
        <button onClick={onSkip} className="focus-button mt-6"><X size={17} />结束休息</button>
      </div>
    </div>
  );
}

export function Toast({ message }) {
  if (!message) return null;
  return <div className="fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-5 py-3 text-sm font-semibold text-white shadow-glow backdrop-blur-xl" aria-live="polite">{message}</div>;
}
