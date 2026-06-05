import { BookOpen, LogIn } from "lucide-react";
import { scrollToControlRoom } from "../utils/time";

export function TopNav({ activePanel, setActivePanel, onHome, onOpenLogin }) {
  const links = [["scene", "场景"], ["music", "音乐"], ["plan", "计划"], ["member", "会员"]];

  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-2.5 py-3 sm:px-6 sm:py-4 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-white/15 bg-black/20 px-2.5 py-2.5 shadow-glass backdrop-blur-2xl sm:gap-3 sm:px-5 sm:py-3">
        <button onClick={onHome} className="flex min-w-0 shrink items-center gap-2 rounded-full px-1.5 text-left text-white transition hover:text-sky-100 sm:px-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-sky-200/30 bg-sky-200/15"><BookOpen size={18} /></span>
          <span className="hidden truncate text-sm font-semibold tracking-wide sm:inline sm:text-base">FocusRoom AI</span>
        </button>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => { setActivePanel(id); scrollToControlRoom(); }} className={
              "rounded-full px-5 py-2 text-sm transition " +
              (activePanel === id ? "bg-white text-slate-950" : "text-white/72 hover:bg-white/10 hover:text-white")
            }>
              {label}
            </button>
          ))}
        </div>
        <button onClick={onOpenLogin} className="focus-button shrink-0 px-3 py-2.5 sm:px-4" aria-label="登录 Demo">
          <LogIn size={16} /><span className="hidden sm:inline">登录</span><span className="rounded-full bg-white/12 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-white/62">Demo</span>
        </button>
      </nav>
    </header>
  );
}
