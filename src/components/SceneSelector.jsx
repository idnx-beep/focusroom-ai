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
          <button key={scene.id} onClick={() => setScene(scene)} aria-pressed={isActive} className={`group grid min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-[1.35rem] border p-2.5 text-left transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-white/[0.14] sm:grid-cols-[92px_minmax(0,1fr)] sm:gap-4 sm:rounded-3xl sm:p-3 ${isActive ? "border-sky-200/70 bg-sky-200/15 shadow-glow" : "border-white/12 bg-white/[0.07]"}`}>
            <img src={scene.image} alt={scene.title} className="h-[72px] w-[72px] rounded-2xl object-cover sm:h-24 sm:w-[92px]" />
            <span className="min-w-0 self-center">
              <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-white sm:text-base"><Icon size={17} className="shrink-0 text-sky-100" /><span className="truncate">{scene.title}</span></span>
              <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/62 sm:text-sm sm:leading-6">{scene.description}</span>
              <span className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">{scene.tags.map((tag) => <span key={tag} className="rounded-full border border-white/12 bg-white/10 px-2 py-0.5 text-[11px] text-white/70 sm:px-2.5 sm:py-1 sm:text-xs">{tag}</span>)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
