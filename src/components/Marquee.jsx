const items = [
  "UTRGV · B.S. Computer Science",
  "IBM · Python for Data Science, AI & Development",
  "Automations",
  "Rio Grande Valley",
  "cantuconstruction.com",
  "GQWebworks",
];

export default function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item}
            <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}
