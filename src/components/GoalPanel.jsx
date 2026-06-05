import { generateGoalSteps } from "../utils/goalPlan";

export function GoalPanel({ goal, setGoal }) {
  const steps = generateGoalSteps(goal);

  return (
    <label className="block min-w-0 rounded-3xl border border-white/12 bg-white/[0.07] p-4">
      <span className="text-sm text-white/54">今日目标</span>
      <input value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="写下今天想完成的事" className="mt-3 w-full rounded-2xl border border-white/14 bg-black/20 px-4 py-4 text-white outline-none transition placeholder:text-white/36 focus:border-sky-200/70 focus:bg-black/30" />
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/80">AI Plan Draft</p>
        <ol className="mt-2 space-y-1 break-words text-sm leading-6 text-white/62">
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
    </label>
  );
}
