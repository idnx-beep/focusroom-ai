import { Square, User, X } from "lucide-react";

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

export function EndFocusConfirmDialog({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="end-focus-title" aria-describedby="end-focus-desc">
      <div className="glass-panel w-full max-w-md rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-white/54">Focus session</p>
            <h2 id="end-focus-title" className="mt-1 text-2xl font-semibold text-white">结束这一轮学习？</h2>
          </div>
          <button onClick={onCancel} className="focus-button h-11 w-11 shrink-0 p-0" aria-label="取消结束学习"><X size={18} /></button>
        </div>
        <p id="end-focus-desc" className="mt-4 text-sm leading-6 text-white/62">确认后会停止计时和声音。已学习超过 1 分钟的内容会进入复盘，不会丢失当前统计。</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button onClick={onCancel} className="focus-button w-full" autoFocus>继续学习</button>
          <button onClick={onConfirm} className="focus-button primary-button w-full"><Square size={16} />结束并复盘</button>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message }) {
  if (!message) return null;
  return <div className="fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-5 py-3 text-sm font-semibold text-white shadow-glow backdrop-blur-xl" aria-live="polite">{message}</div>;
}
