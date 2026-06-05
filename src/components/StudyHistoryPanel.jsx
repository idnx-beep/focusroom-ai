import { Clock, Share2 } from "lucide-react";
import { formatTime } from "../utils/time";

export function StudyHistoryPanel({ records, onOpenShare }) {
  const list = Array.isArray(records) ? records.slice(0, 5) : [];

  return (
    <section className="mt-4 min-w-0 rounded-3xl border border-white/12 bg-black/20 p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm text-white/54">学习历史</p>
          <h3 className="mt-1 text-lg font-semibold text-white">最近 5 轮</h3>
        </div>
        <Clock size={18} className="text-sky-100/70" />
      </div>

      {list.length > 0 ? (
        <div className="mt-3 space-y-2">
          {list.map((record) => (
            <article key={record.id} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="line-clamp-2 break-words text-sm font-semibold leading-5 text-white">{record.goal || "未命名学习目标"}</p>
                  <p className="mt-1 break-words text-xs leading-5 text-white/48">{record.sceneName} · {formatTime(record.durationSeconds)} · {record.isCompletedRound ? "完整轮" : "部分学习"}</p>
                </div>
                <button onClick={() => onOpenShare?.(record)} className="focus-button h-11 w-11 shrink-0 p-0" aria-label="查看分享卡片"><Share2 size={15} /></button>
              </div>
              {(record.completedWork || record.nextPlan || record.problems) && <p className="mt-2 line-clamp-2 break-words text-xs leading-5 text-white/56">{record.completedWork || record.nextPlan || record.problems}</p>}
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-white/56">完成或结束一轮超过 60 秒的学习后，这里会出现历史记录。</p>
      )}
    </section>
  );
}
