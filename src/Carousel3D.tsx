// Adaptado por FlowCore Soluções LTDA · flowcoresolucoes.com.br/codigos
// Original: inspirado em Codrops (3D Carousel). Mantenha este crédito.

// 3D Carousel inspirado em Codrops/3DCarousel — adaptado pela FlowCore Soluções
// Itens 3D rotativos com perspective + auto-rotate, drag horizontal.
import { useEffect, useRef, useState } from "react";

type Item = { src: string; label?: string };
const DEFAULT_ITEMS: Item[] = [
  { src: "/brand/mockups/novo-01.webp", label: "FlowCore" },
  { src: "/brand/mockups/novo-13.webp", label: "Studio" },
  { src: "/brand/mockups/novo-05.webp", label: "Sistemas" },
  { src: "/brand/mockups/novo-09.webp", label: "IA" },
  { src: "/brand/mockups/novo-16.webp", label: "Segurança" },
  { src: "/brand/manual/manual-h1.webp", label: "Contato" },
];

const Carousel3D = ({ items = DEFAULT_ITEMS, radius = 280, autoRotate = true }: { items?: Item[]; radius?: number; autoRotate?: boolean }) => {
  const [angle, setAngle] = useState(0);
  const dragging = useRef<{ x: number; start: number } | null>(null);

  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => setAngle((a) => (dragging.current ? a : a + 0.3)), 30);
    return () => clearInterval(id);
  }, [autoRotate]);

  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1200, background: "radial-gradient(circle, #0A1A33 0%, #020617 100%)", borderRadius: 12, overflow: "hidden" }}
      onPointerDown={(e) => (dragging.current = { x: e.clientX, start: angle })}
      onPointerMove={(e) => dragging.current && setAngle(dragging.current.start + (e.clientX - dragging.current.x) * 0.5)}
      onPointerUp={() => (dragging.current = null)}
      onPointerLeave={() => (dragging.current = null)}
    >
      <div style={{ position: "relative", width: 200, height: 280, transformStyle: "preserve-3d", transform: `rotateY(${angle}deg)`, transition: dragging.current ? "none" : "transform 0.05s linear" }}>
        {items.map((it, i) => {
          const itemAngle = (360 / items.length) * i;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0,102,255,0.4)",
                border: "1px solid rgba(63,181,255,0.3)",
              }}
            >
              <img src={it.src} alt={it.label || ""} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {it.label && (
                <span style={{ position: "absolute", bottom: 12, left: 12, color: "#fff", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.15em", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                  {it.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel3D;
