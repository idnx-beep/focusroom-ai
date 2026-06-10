import { useState } from "react";
import { Clock3, MapPin, Save, Share2, Target, X } from "lucide-react";
import { ShareCard } from "./ShareCard";
import { formatTime } from "../utils/time";

const reviewFields = [
  {
    key: "completedWork",
    label: "本轮完成了什么",
    hint: "写下已经推进的具体内容",
    placeholder: "例如：整理完第一章笔记，完成 12 道函数练习"
  },
  {
    key: "problems",
    label: "遇到了什么问题",
    hint: "记录卡住的地方，下一轮更容易接上",
    placeholder: "例如：递归边界还不够熟，需要重新看例题"
  },
  {
    key: "nextPlan",
    label: "下一轮准备做什么",
    hint: "给下一次专注一个明确入口",
    placeholder: "例如：复习错题，再刷 10 道同类题"
  }
];

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
      <div className="glass-panel max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-[1.35rem] p-3.5 sm:max-h-[calc(100vh-3rem)] sm:rounded-[2rem] sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-sky-100/70">Study Review</p>
            <h2 id="review-title" className="mt-1 text-xl font-semibold text-white sm:text-2xl">这一轮复盘</h2>
            <p className="mt-1 max-w-xl break-words text-sm leading-6 text-white/56">先把这一轮收束好，再进入下一次专注。</p>
          </div>
          <button onClick={onClose} className="focus-button h-11 w-11 shrink-0 p-0" aria-label="关闭复盘弹窗"><X size={17} /></button>
        </div>

        {shareRecord ? (
          <div className="mt-4">
            <ShareCard record={shareRecord} onCopy={onCopyShare} onClose={onClose} />
          </div>
        ) : (
          <>
            <div className="mt-4 rounded-[1.35rem] border border-white/12 bg-slate-950/35 p-3 sm:rounded-[1.6rem] sm:p-4">
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                  <p className="flex items-center gap-2 text-xs text-white/48"><Clock3 size={14} className="text-sky-100/70" />本轮时长</p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-white">{formatTime(record.durationSeconds)}</p>
                  <p className="mt-1 text-xs text-white/42">{record.isCompletedRound ? "完整专注" : "部分学习"}</p>
                </div>
                <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                  <p className="flex items-center gap-2 text-xs text-white/48"><MapPin size={14} className="text-sky-100/70" />当前场景</p>
                  <p className="mt-2 line-clamp-2 break-words text-sm font-semibold leading-5 text-white">{record.sceneName}</p>
                </div>
                <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                  <p className="flex items-center gap-2 text-xs text-white/48"><Target size={14} className="text-sky-100/70" />今日目标</p>
                  <p className="mt-2 line-clamp-2 break-words text-sm font-semibold leading-5 text-white">{record.goal || "继续保持节奏"}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {reviewFields.map((field) => (
                <label key={field.key} className="block min-w-0 rounded-[1.2rem] border border-white/12 bg-black/20 p-3.5 sm:rounded-[1.35rem] sm:p-4">
                  <span className="block text-sm font-semibold text-white">{field.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-white/50">{field.hint}</span>
                  <textarea
                    value={review[field.key]}
                    onChange={(event) => setField(field.key, event.target.value)}
                    className="mt-3 h-32 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-sky-200/70 sm:h-36 lg:h-40"
                    placeholder={field.placeholder}
                  />
                </label>
              ))}
            </div>

            <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-white/50">复盘只保存在本机浏览器，不会上传。</p>
              <div className="grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
                <button onClick={skipReview} className="focus-button border-white/10 bg-transparent px-4 py-2.5 text-white/70 hover:bg-white/10"><Share2 size={16} />稍后再写</button>
                <button onClick={saveReview} className="focus-button primary-button px-4 py-2.5"><Save size={16} />保存复盘并生成卡片</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
