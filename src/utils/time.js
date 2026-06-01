export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function scrollToControlRoom() {
  window.requestAnimationFrame(() => {
    document.getElementById("control-room")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
