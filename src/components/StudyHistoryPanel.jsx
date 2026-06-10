import { CheckCircle2, Clock, Share2, TimerReset } from "lucide-react";
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
          {list.map((record) => {
            const isCompleted = record.isCompletedRound;
            return (
              <article key={record.id} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-3 transition hover:border-white/20 hover:bg-white/[0.075]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold " + (isCompleted ? "border-sky-200/25 bg-sky-200/12 text-sky-100" : "border-white/12 bg-white/[0.07] text-white/62")}>
                        {isCompleted ? <CheckCircle2 size={13} /> : <TimerReset size={13} />}
                        {isCompleted ? "完整专注" : "部分学习"}
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-white">{formatTime(record.durationSeconds)}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 break-words text-sm font-semibold leading-5 text-white">{record.goal || "未命名学习目标"}</p>
                    <p className="mt-1 line-clamp-1 break-words text-xs leading-5 text-white/48">{record.sceneName}</p>
                  </div>
                  <button onClick={() => onOpenShare?.(record)} className="focus-button min-h-11 shrink-0 px-3 py-2.5 text-xs sm:px-4" aria-label="打开学习分享卡片"><Share2 size={15} />打开卡片</button>
                </div>
                {(record.completedWork || record.nextPlan || record.problems) && <p className="mt-3 line-clamp-2 break-words rounded-2xl border border-white/10 bg-black/[0.16] px-3 py-2 text-xs leading-5 text-white/56">{record.completedWork || record.nextPlan || record.problems}</p>}
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-white/56">完成或结束一轮超过 60 秒的学习后，这里会出现历史记录。</p>
      )}
    </section>
  );
}
