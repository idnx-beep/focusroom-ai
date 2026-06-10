import { Coffee, Library, Sparkles, Waves } from "lucide-react";
import { scenes } from "../data/focusRoomData";

const sceneIcons = {
  "morning-window": Sparkles,
  "rainy-cafe": Coffee,
  "midnight-library": Library,
  "seaside-study": Waves
};

export function SceneSelector({ currentScene, setScene }) {
  return (
    <div className="grid min-w-0 gap-3">
      {scenes.map((scene) => {
        const Icon = sceneIcons[scene.id] || Sparkles;
        const isActive = currentScene.id === scene.id;
        return (
          <button key={scene.id} onClick={() => setScene(scene)} aria-pressed={isActive} className={`group grid min-w-0 grid-cols-[78px_minmax(0,1fr)] gap-3 rounded-[1.25rem] border p-2.5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-sky-100/30 hover:bg-white/[0.095] active:translate-y-0 sm:grid-cols-[104px_minmax(0,1fr)] sm:gap-4 sm:rounded-[1.5rem] sm:p-3.5 ${isActive ? "border-sky-200/55 bg-sky-200/[0.115] shadow-[0_0_0_1px_rgba(125,211,252,0.16),0_18px_46px_rgba(8,47,73,0.22)]" : "border-white/10 bg-white/[0.052]"}`}>
            <span className="relative block overflow-hidden rounded-[1.05rem] sm:rounded-[1.25rem]">
              <img src={scene.image} alt={scene.title} className="h-[78px] w-[78px] object-cover transition duration-500 group-hover:scale-105 sm:h-24 sm:w-[104px]" />
              {isActive && <span className="absolute inset-x-2 bottom-2 rounded-full border border-sky-100/25 bg-sky-950/55 px-2 py-0.5 text-center text-[10px] font-semibold text-sky-100 backdrop-blur-md">已选择</span>}
            </span>
            <span className="min-w-0 self-center">
              <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-white sm:text-base"><Icon size={17} className="shrink-0 text-sky-100" /><span className="truncate">{scene.title}</span></span>
              <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">{scene.description}</span>
              <span className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">{scene.tags.map((tag) => <span key={tag} className={"rounded-full border px-2 py-0.5 text-[11px] sm:px-2.5 sm:py-1 sm:text-xs " + (isActive ? "border-sky-100/25 bg-sky-100/10 text-sky-50" : "border-white/10 bg-white/[0.07] text-white/65")}>{tag}</span>)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
