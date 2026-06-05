import { useState } from "react";
import { Save, Share2, X } from "lucide-react";
import { ShareCard } from "./ShareCard";

export function ReviewDialog({ record, onSave, onSkip, onClose, onCopyShare }) {
  const [review, setReview] = useState({ completedWork: "", problems: "", nextPlan: "" });
  const [shareRecord, setShareRecord] = useState(null);
  const setField = (key, value) => setReview((current) => ({ ...current, [key]: value }));

  if (!record) return null;

  const saveReview = () => {
    const updated = onSave(review);
    setShareRecord(updated || { ...record, ...review, reviewDone: true });
  };

  const skipReview = () => {
    const updated = onSkip?.();
    setShareRecord(updated || record);
  };

  return (
    <div className="fixed inset-0 z-50 grid items-start justify-items-center overflow-y-auto bg-black/58 px-3 py-4 backdrop-blur-sm sm:items-center sm:py-6" role="dialog" aria-modal="true" aria-labelledby="review-title">
      <div className="glass-panel max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[1.35rem] p-3.5 sm:max-h-[calc(100vh-3rem)] sm:rounded-[2rem] sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-sky-100/70">Study Review</p>
            <h2 id="review-title" className="mt-1 text-xl font-semibold text-white sm:text-2xl">这一轮复盘</h2>
            <p className="mt-1 break-words text-sm leading-5 text-white/52">{record.sceneName} · {Math.round(record.durationSeconds / 60)} 分钟 · {record.isCompletedRound ? "完整轮" : "部分学习"}</p>
          </div>
          <button onClick={onClose} className="focus-button h-11 w-11 shrink-0 p-0" aria-label="关闭复盘弹窗"><X size={17} /></button>
        </div>

        {shareRecord ? (
          <div className="mt-4">
            <ShareCard record={shareRecord} onCopy={onCopyShare} onClose={onClose} />
          </div>
        ) : (
          <>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <label className="block rounded-3xl border border-white/12 bg-black/20 p-3">
                <span className="text-xs font-semibold text-white/58">本轮完成了什么</span>
                <textarea value={review.completedWork} onChange={(event) => setField("completedWork", event.target.value)} className="mt-2 h-28 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2.5 text-sm leading-5 text-white outline-none placeholder:text-white/30 focus:border-sky-200/70 md:h-24" placeholder="例如：整理完第一章笔记" />
              </label>
              <label className="block rounded-3xl border border-white/12 bg-black/20 p-3">
                <span className="text-xs font-semibold text-white/58">遇到了什么问题</span>
                <textarea value={review.problems} onChange={(event) => setField("problems", event.target.value)} className="mt-2 h-28 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2.5 text-sm leading-5 text-white outline-none placeholder:text-white/30 focus:border-sky-200/70 md:h-24" placeholder="例如：概念还没完全理解" />
              </label>
              <label className="block rounded-3xl border border-white/12 bg-black/20 p-3">
                <span className="text-xs font-semibold text-white/58">下一轮准备做什么</span>
                <textarea value={review.nextPlan} onChange={(event) => setField("nextPlan", event.target.value)} className="mt-2 h-28 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2.5 text-sm leading-5 text-white outline-none placeholder:text-white/30 focus:border-sky-200/70 md:h-24" placeholder="例如：刷 10 道对应练习题" />
              </label>
            </div>

            <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <button onClick={skipReview} className="focus-button px-4 py-2.5"><Share2 size={16} />跳过并看卡片</button>
              <button onClick={saveReview} className="focus-button primary-button px-4 py-2.5"><Save size={16} />保存复盘</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
