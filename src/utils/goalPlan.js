export function generateGoalSteps(goal) {
  const normalized = goal.trim();

  if (!normalized) {
    return ["先写下今天要完成的一件具体任务", "把任务拆成 25-50 分钟能完成的小块", "结束后记录完成情况和下一步"];
  }

  return [
    "先快速整理「" + normalized + "」需要的资料和入口",
    "用一轮番茄钟完成「" + normalized + "」中最关键的一小步",
    "结束前用 3 分钟复盘「" + normalized + "」的进展和阻塞"
  ];
}
