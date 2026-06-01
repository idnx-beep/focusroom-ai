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
    <div className="grid gap-3">
      {scenes.map((scene) => {
        const Icon = sceneIcons[scene.id] || Sparkles;
        const isActive = currentScene.id === scene.id;
        return (
          <button key={scene.id} onClick={() => setScene(scene)} aria-pressed={isActive} className={`group grid grid-cols-[78px_1fr] gap-3 rounded-3xl border p-3 text-left transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-white/[0.14] sm:grid-cols-[92px_1fr] sm:gap-4 ${isActive ? "border-sky-200/70 bg-sky-200/15 shadow-glow" : "border-white/12 bg-white/[0.07]"}`}>
            <img src={scene.image} alt={scene.title} className="h-20 w-[78px] rounded-2xl object-cover sm:h-24 sm:w-[92px]" />
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-base font-semibold text-white"><Icon size={18} className="text-sky-100" />{scene.title}</span>
              <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/62 sm:text-sm sm:leading-6">{scene.description}</span>
              <span className="mt-3 flex flex-wrap gap-2">{scene.tags.map((tag) => <span key={tag} className="rounded-full border border-white/12 bg-white/10 px-2.5 py-1 text-xs text-white/70">{tag}</span>)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
