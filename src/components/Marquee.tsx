const interests = ["Programming & Technology", "Artificial Intelligence", "Basketball", "Chess", "Rubik’s Cube"];
const doing = ["Wristarc", "Crescent Book", "SAT prep app", "Scouting", "Painting & design", "Video editing"];

function Row({ items }: { items: string[] }) {
  return (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-current opacity-60" />
        </li>
      ))}
    </ul>
  );
}

function Band({ items, className }: { items: string[]; className: string }) {
  return (
    <div className={`marquee -ml-[5%] w-[110%] overflow-hidden py-4 font-display text-2xl font-bold ${className}`}>
      <div className="marquee-track flex w-max">
        <Row items={items} />
        <Row items={items} />
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div aria-hidden className="relative overflow-hidden bg-crimson py-14">
      <Band items={interests} className="rotate-[1.5deg] bg-white text-crimson" />
      <Band items={doing} className="marquee-reverse -mt-6 -rotate-[1.5deg] bg-navy text-white" />
    </div>
  );
}
