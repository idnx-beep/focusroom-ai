import { Copy, X } from "lucide-react";
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

  return (
    <section className={(compact ? "rounded-3xl border border-white/12 bg-black/20 p-4" : "max-h-[calc(100dvh-2.5rem)] overflow-y-auto rounded-[1.35rem] border border-white/15 bg-white/[0.09] p-3.5 shadow-glass backdrop-blur-2xl sm:max-h-none sm:rounded-[1.8rem] sm:p-5") + " min-w-0 max-w-full"} aria-label="学习复盘分享卡片">
      <div className="min-w-0 rounded-[1.2rem] border border-white/12 bg-gradient-to-br from-slate-950/82 via-slate-900/58 to-sky-950/32 p-3.5 sm:rounded-[1.4rem] sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-sky-100/72">FocusRoom AI</p>
            <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">学习复盘卡片</h3>
          </div>
          <span className="shrink-0 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs text-white/60">{formatDate(record.date)}</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-3"><p className="text-xs text-white/42">当前场景</p><p className="mt-1 break-words font-semibold text-white">{record.sceneName}</p></div>
          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-3"><p className="text-xs text-white/42">本轮专注</p><p className="mt-1 font-semibold tabular-nums text-white">{formatTime(record.durationSeconds)}</p></div>
          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-3 sm:col-span-2"><p className="text-xs text-white/42">今日目标</p><p className="mt-1 break-words font-semibold leading-6 text-white">{record.goal || "继续保持节奏"}</p></div>
          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-3"><p className="text-xs text-white/42">完成内容</p><p className="mt-1 line-clamp-3 break-words text-sm leading-6 text-white/78">{record.completedWork || "已完成一轮专注"}</p></div>
          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/24 p-3"><p className="text-xs text-white/42">下一轮计划</p><p className="mt-1 line-clamp-3 break-words text-sm leading-6 text-white/78">{record.nextPlan || "继续保持节奏"}</p></div>
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
