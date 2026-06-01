export function Background({ scene, lowPerformance = false }) {
  const imageStyle = { backgroundImage: "url(" + scene.image + ")" };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div key={scene.id} className={lowPerformance ? "absolute inset-0 bg-cover bg-center" : "absolute inset-0 animate-bgFade bg-cover bg-center"} style={imageStyle} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(125,211,252,0.18),transparent_34%),linear-gradient(90deg,rgba(2,6,23,0.82),rgba(2,6,23,0.42)_48%,rgba(2,6,23,0.72))]" />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
