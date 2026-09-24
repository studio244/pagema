const MAP_CITIES: { name: string; x: number; y: number }[] = [
  { name: "Tanger", x: 250, y: 10 },
  { name: "Nador", x: 311, y: 24 },
  { name: "Oujda", x: 333, y: 36 },
  { name: "Fès", x: 267, y: 52 },
  { name: "Meknès", x: 256, y: 55 },
  { name: "Rabat", x: 228, y: 53 },
  { name: "Casablanca", x: 212, y: 63 },
  { name: "El Jadida", x: 192, y: 71 },
  { name: "Béni Mellal", x: 239, y: 93 },
  { name: "Safi", x: 177, y: 94 },
  { name: "Marrakech", x: 203, y: 110 },
  { name: "Agadir", x: 169, y: 139 },
  { name: "Laâyoune", x: 92, y: 218 },
  { name: "Dakhla", x: 34, y: 302 },
];

const MAP_VIEW = { width: 372, height: 390 };
const LABEL_CHAR_WIDTH = 5.4;
const LABEL_HEIGHT = 8.5;

type LabelBox = { x1: number; y1: number; x2: number; y2: number };
type PlacedLabel = {
  name: string;
  x: number;
  y: number;
  anchor: "start" | "end" | "middle";
  cityX: number;
  cityY: number;
  leader: boolean;
};

// Candidate slots: eight directions around the dot, at growing distances.
const LABEL_CANDIDATES: { dx: number; dy: number; anchor: "start" | "end" | "middle" }[] = (() => {
  const slots: { dx: number; dy: number; anchor: "start" | "end" | "middle" }[] = [];
  for (const r of [6, 12, 20, 30, 42, 56]) {
    slots.push({ dx: r, dy: 3, anchor: "start" });
    slots.push({ dx: -r, dy: 3, anchor: "end" });
    slots.push({ dx: r * 0.8, dy: -r * 0.7 - 3, anchor: "start" });
    slots.push({ dx: -r * 0.8, dy: -r * 0.7 - 3, anchor: "end" });
    slots.push({ dx: r * 0.8, dy: r * 0.7 + 6, anchor: "start" });
    slots.push({ dx: -r * 0.8, dy: r * 0.7 + 6, anchor: "end" });
    slots.push({ dx: 0, dy: -r - 4, anchor: "middle" });
    slots.push({ dx: 0, dy: r + 9, anchor: "middle" });
  }
  return slots;
})();

function overlaps(a: LabelBox, b: LabelBox) {
  return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}

function segmentHitsBox(ax: number, ay: number, bx: number, by: number, box: LabelBox) {
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = ax + (bx - ax) * t;
    const y = ay + (by - ay) * t;
    if (x >= box.x1 && x <= box.x2 && y >= box.y1 && y <= box.y2) return true;
  }
  return false;
}

// Deterministic label layout: every city name takes the closest free slot around
// its dot. Names never overlap each other or a dot; link lines are avoided when
// possible, and a thin leader line ties a pushed-away name back to its dot.
function layoutMapLabels(): PlacedLabel[] {
  const dotBoxes: LabelBox[] = MAP_CITIES.map((c) => ({
    x1: c.x - 4,
    y1: c.y - 4,
    x2: c.x + 4,
    y2: c.y + 4,
  }));
  const cityByName = new Map(MAP_CITIES.map((c) => [c.name, c]));
  const linkSegments = MAP_LINKS.flatMap(([a, b]) => {
    const from = cityByName.get(a);
    const to = cityByName.get(b);
    return from && to ? [[from.x, from.y, to.x, to.y] as const] : [];
  });
  const placedBoxes: LabelBox[] = [];
  const placed: PlacedLabel[] = [];
  const order = [...MAP_CITIES].sort((a, b) => b.name.length - a.name.length);

  for (const city of order) {
    const width = city.name.length * LABEL_CHAR_WIDTH;

    const evaluate = (
      candidate: (typeof LABEL_CANDIDATES)[number],
      avoidLinks: boolean,
    ): PlacedLabel | null => {
      const x = city.x + candidate.dx;
      const y = city.y + candidate.dy;
      const x1 =
        candidate.anchor === "start" ? x : candidate.anchor === "end" ? x - width : x - width / 2;
      const box: LabelBox = {
        x1: x1 - 1,
        y1: y - LABEL_HEIGHT,
        x2: x1 + width + 1,
        y2: y + 2,
      };
      if (
        box.x1 < 2 ||
        box.x2 > MAP_VIEW.width - 2 ||
        box.y1 < 2 ||
        box.y2 > MAP_VIEW.height - 2
      )
        return null;
      if (placedBoxes.some((b) => overlaps(box, b))) return null;
      if (dotBoxes.some((b) => overlaps(box, b))) return null;
      if (avoidLinks && linkSegments.some(([ax, ay, bx, by]) => segmentHitsBox(ax, ay, bx, by, box)))
        return null;

      placedBoxes.push(box);
      return {
        name: city.name,
        x,
        y,
        anchor: candidate.anchor,
        cityX: city.x,
        cityY: city.y,
        leader: Math.abs(candidate.dx) > 10 || Math.abs(candidate.dy) > 12,
      };
    };

    let chosen: PlacedLabel | null = null;
    for (const candidate of LABEL_CANDIDATES) {
      chosen = evaluate(candidate, true);
      if (chosen) break;
    }
    if (!chosen) {
      for (const candidate of LABEL_CANDIDATES) {
        chosen = evaluate(candidate, false);
        if (chosen) break;
      }
    }
    if (chosen) placed.push(chosen);
  }

  return placed;
}

const MAP_LINKS: [string, string][] = [
  ["Tanger", "Nador"],
  ["Nador", "Oujda"],
  ["Oujda", "Fès"],
  ["Fès", "Meknès"],
  ["Meknès", "Rabat"],
  ["Tanger", "Rabat"],
  ["Rabat", "Casablanca"],
  ["Casablanca", "El Jadida"],
  ["Casablanca", "Béni Mellal"],
  ["Béni Mellal", "Marrakech"],
  ["El Jadida", "Safi"],
  ["Safi", "Marrakech"],
  ["Marrakech", "Agadir"],
  ["Agadir", "Laâyoune"],
  ["Laâyoune", "Dakhla"],
];

const MAP_LABELS = layoutMapLabels();

export function MoroccoNetwork() {
  const byName = new Map(MAP_CITIES.map((c) => [c.name, c]));
  return (
    <svg
      viewBox="0 0 372 390"
      className="absolute inset-0 h-full w-full p-4 transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
      role="img"
      aria-label="Carte du Maroc et réseau des principales villes couvertes, de Tanger à Dakhla"
    >
      <path
        d="M10.0 366.6 L11.9 345.2 L20.1 338.6 L27.0 326.1 L25.7 317.8 L33.1 300.8 L44.9 285.4 L52.2 281.4 L57.7 267.5 L58.3 254.6 L66.0 239.6 L80.2 230.8 L93.7 206.2 L104.8 196.6 L124.7 193.8 L141.5 177.4 L152.2 170.9 L169.8 150.9 L164.6 120.7 L175.6 87.2 L189.3 70.9 L226.5 49.9 L247.5 10.0 L263.2 10.1 L276.1 20.4 L296.3 18.7 L327.7 24.3 L335.7 39.8 L337.0 54.5 L344.4 79.9 L350.0 85.1 L346.1 94.5 L318.3 98.5 L308.5 107.5 L296.4 109.6 L295.3 127.5 L270.4 137.0 L262.2 149.1 L244.7 155.6 L223.4 159.3 L189.1 177.1 L188.7 248.7 L118.8 247.6 L119.3 309.2 L99.3 311.6 L94.2 323.9 L98.2 358.7 L14.8 358.5 L10.0 366.6 Z"
        className="fill-paper stroke-ink"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {MAP_LINKS.map(([a, b], i) => {
        const from = byName.get(a);
        const to = byName.get(b);
        if (!from || !to) return null;
        return (
          <line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className="net-line stroke-terra/55"
            strokeWidth={1.2}
            style={{ animationDelay: `${0.25 + i * 0.07}s` }}
          />
        );
      })}
      {MAP_CITIES.map((city, i) => (
        <g key={city.name}>
          <circle
            cx={city.x}
            cy={city.y}
            r={3}
            className="net-halo fill-terra"
            style={{ animationDelay: `${(i % 8) * 0.32}s` }}
          />
          <circle
            cx={city.x}
            cy={city.y}
            r={2.6}
            className="net-dot fill-terra stroke-ink"
            strokeWidth={1}
            style={{ animationDelay: `${(i % 8) * 0.32}s` }}
          />
        </g>
      ))}
      {MAP_LABELS.map((label, i) => (
        <g key={`label-${label.name}`}>
          {label.leader && (
            <line
              x1={label.cityX}
              y1={label.cityY}
              x2={label.anchor === "end" ? label.x + 1 : label.anchor === "start" ? label.x - 1 : label.x}
              y2={label.y - 2}
              className="net-label stroke-ink/45"
              strokeWidth={0.7}
              style={{ animationDelay: `${0.5 + i * 0.06}s` }}
            />
          )}
          <text
            x={label.x}
            y={label.y}
            textAnchor={label.anchor}
            className="net-label fill-ink font-mono text-[8px] font-bold uppercase"
            style={{ animationDelay: `${0.5 + i * 0.06}s` }}
          >
            {label.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

