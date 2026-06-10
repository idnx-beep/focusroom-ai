import { CalendarDays, CheckCircle2, Copy, MapPin, Target, TimerReset, X } from "lucide-react";
import { formatTime } from "../utils/time";

function formatDate(dateText) {
  if (!dateText) return "今天";
  return dateText.replaceAll("-", ".");
}

export function createShareText(record) {
  if (!record) return "";
  return [
    "FocusRoom AI 学习复盘",
    "场景：" + record.sceneName,
    "目标：" + record.goal,
    "本轮专注：" + formatTime(record.durationSeconds),
    "完成内容：" + (record.completedWork || "已完成一轮专注"),
    "遇到的问题：" + (record.problems || "暂无记录"),
    "下一轮计划：" + (record.nextPlan || "继续保持节奏"),
    "日期：" + formatDate(record.date)
  ].join("\n");
}

export function ShareCard({ record, onCopy, onClose, compact = false }) {
  if (!record) return null;

  const statusLabel = record.isCompletedRound ? "完整专注" : "部分学习";
  const completedText = record.completedWork || "已完成一轮专注";
  const problemsText = record.problems || "暂无记录";
  const nextPlanText = record.nextPlan || "继续保持节奏";

  return (
    <section className={(compact ? "rounded-3xl border border-white/12 bg-black/20 p-4" : "max-h-[calc(100dvh-2.5rem)] overflow-y-auto rounded-[1.35rem] border border-white/15 bg-white/[0.09] p-3.5 shadow-glass backdrop-blur-2xl sm:max-h-none sm:rounded-[1.8rem] sm:p-5") + " min-w-0 max-w-full"} aria-label="学习复盘分享卡片">
      <div className="min-w-0 overflow-hidden rounded-[1.2rem] border border-white/12 bg-slate-950/82 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-[1.4rem] sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-sky-100/72">FocusRoom AI</p>
            <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">学习成果卡片</h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-5 text-white/50">
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />{formatDate(record.date)}</span>
              <span className="inline-flex min-w-0 items-center gap-1.5"><MapPin size={13} /> <span className="max-w-[14rem] truncate">{record.sceneName}</span></span>
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-sky-200/25 bg-sky-200/12 px-3 py-1 text-xs font-semibold text-sky-100">{statusLabel}</span>
        </div>

        <div className="mt-5 rounded-[1.15rem] border border-sky-200/18 bg-sky-200/[0.075] p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-sky-100/70"><TimerReset size={15} />本轮专注</p>
          <p className="mt-2 text-4xl font-semibold tabular-nums text-white sm:text-5xl">{formatTime(record.durationSeconds)}</p>
        </div>

        <div className="mt-3 rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-white/48"><Target size={15} className="text-sky-100/70" />今日目标</p>
          <p className="mt-2 line-clamp-3 break-words text-base font-semibold leading-7 text-white">{record.goal || "继续保持节奏"}</p>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="min-w-0 rounded-[1.15rem] border border-white/10 bg-black/24 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-white/48"><CheckCircle2 size={15} className="text-sky-100/70" />复盘摘要</p>
            <p className="mt-2 line-clamp-4 break-words text-sm leading-6 text-white/78">{completedText}</p>
            {record.problems && <p className="mt-3 line-clamp-2 break-words border-t border-white/10 pt-3 text-xs leading-5 text-white/48">卡点：{problemsText}</p>}
          </div>
          <div className="min-w-0 rounded-[1.15rem] border border-white/10 bg-black/24 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-white/48"><Target size={15} className="text-sky-100/70" />下一轮计划</p>
            <p className="mt-2 line-clamp-4 break-words text-sm leading-6 text-white/78">{nextPlanText}</p>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
          <button onClick={() => onCopy?.(record)} className="focus-button primary-button px-4 py-2.5"><Copy size={16} />复制分享文案</button>
          <button onClick={onClose} className="focus-button px-4 py-2.5"><X size={16} />关闭</button>
        </div>
      )}
    </section>
  );
}
