import { generateGoalSteps } from "../utils/goalPlan";

export function GoalPanel({ goal, setGoal }) {
  const steps = generateGoalSteps(goal);

  return (
    <label className="block min-w-0 rounded-[1.5rem] border border-sky-200/[0.18] bg-sky-200/[0.075] p-4 sm:p-5">
      <span className="text-sm font-semibold text-sky-100/80">2. 写下今日目标</span>
      <span className="mt-1 block text-sm leading-6 text-white/54">越具体，进入自习室后越不容易分心。</span>
      <input value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="例如：完成高数错题整理" className="mt-4 w-full rounded-2xl border border-white/[0.14] bg-slate-950/45 px-4 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-sky-200/70 focus:bg-slate-950/60" />
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/[0.18] p-3">
        <p className="text-xs font-semibold tracking-[0.16em] text-sky-100/80">Plan draft</p>
        <ol className="mt-2 space-y-1 break-words text-sm leading-6 text-white/62">
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
    </label>
  );
}
