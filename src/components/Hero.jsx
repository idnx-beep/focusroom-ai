import { ChevronRight, Clock3, MapPin, Sparkles } from "lucide-react";

export function Hero({ currentScene, onStart }) {
  return (
    <section className="flex min-h-[590px] flex-col justify-center pt-24 sm:min-h-[650px] sm:pt-28 lg:min-h-screen lg:pt-24">
      <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <div className="animate-riseIn max-w-3xl">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-sky-200/25 bg-sky-200/10 px-3 py-2 text-xs font-semibold text-sky-100 backdrop-blur-xl sm:mb-6 sm:px-4 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />当前场景：<span className="truncate">{currentScene.title}</span>
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">进入一间只为学习亮着的自习室</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8">选择场景、写下今天的目标，再开启一轮番茄钟。FocusRoom AI 会把声音、倒计时和复盘都留在浏览器本地。</p>
          <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center">
            <button onClick={onStart} className="focus-button primary-button w-full px-7 sm:w-auto">开始专注<ChevronRight size={18} /></button>
            <a href="#control-room" className="focus-button w-full border-white/12 bg-black/[0.18] sm:w-auto">先配置自习室</a>
          </div>
        </div>
        <div className="glass-panel animate-riseIn hidden rounded-[1.6rem] p-4 lg:block">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.18em] text-sky-100/70">Room ready</p>
              <h2 className="mt-2 truncate text-2xl font-semibold text-white">{currentScene.title}</h2>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sky-200/25 bg-sky-200/[0.12] text-sky-100"><Sparkles size={18} /></span>
          </div>
          <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/20">
            <img src={currentScene.image} alt={currentScene.title} className="aspect-[16/10] w-full object-cover" />
          </div>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <p className="flex items-center gap-2"><MapPin size={15} className="text-sky-100/70" />{currentScene.music} · {currentScene.ambience}</p>
            <p className="flex items-center gap-2"><Clock3 size={15} className="text-sky-100/70" />下一步：写目标，然后进入自习室模式</p>
          </div>
        </div>
      </div>
      <div className="mt-9 grid gap-2 rounded-[1.35rem] border border-white/12 bg-black/[0.24] p-3 text-sm text-white/70 backdrop-blur-xl sm:mt-12 sm:grid-cols-3 sm:gap-3 sm:rounded-3xl sm:p-4 lg:mt-16">
        <div className="rounded-2xl bg-white/[0.045] p-3"><p className="font-semibold text-white">1. 选场景</p><p className="mt-1 text-white/56">从四种学习空间开始</p></div>
        <div className="rounded-2xl bg-white/[0.045] p-3"><p className="font-semibold text-white">2. 写目标</p><p className="mt-1 text-white/56">把任务压成一轮可做</p></div>
        <div className="rounded-2xl bg-white/[0.045] p-3"><p className="font-semibold text-white">3. 开始专注</p><p className="mt-1 text-white/56">计时、声音和复盘接上</p></div>
      </div>
    </section>
  );
}
