import { ChevronRight } from "lucide-react";

export function Hero({ currentScene, onStart }) {
  return (
    <section className="flex min-h-[520px] flex-col justify-center pt-28 sm:min-h-[600px] lg:min-h-screen lg:pt-24">
      <div className="animate-riseIn max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/25 bg-sky-200/10 px-4 py-2 text-sm text-sky-100 backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />当前场景：{currentScene.title}
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">开启你的沉浸式自习室</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">选择场景、调节声音、设定番茄钟，把一天最清醒的时间留给真正重要的学习。</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button onClick={onStart} className="focus-button primary-button px-7">开始学习<ChevronRight size={18} /></button>
          <a href="#control-room" className="focus-button">调整自习室</a>
        </div>
      </div>
      <div className="glass-panel mt-10 grid gap-3 rounded-3xl p-4 text-sm text-white/76 sm:mt-12 sm:grid-cols-3 lg:mt-16">
        <div><p className="text-white">场景记忆</p><p className="mt-1 text-white/58">自动恢复上一次选择的学习空间</p></div>
        <div><p className="text-white">声音控制</p><p className="mt-1 text-white/58">音乐与背景音分离调节</p></div>
        <div><p className="text-white">目标留存</p><p className="mt-1 text-white/58">今日目标刷新后仍会保留</p></div>
      </div>
    </section>
  );
}
