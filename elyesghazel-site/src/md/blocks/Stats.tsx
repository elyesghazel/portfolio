import { rows } from "../parse";

/** ```stats \n 9× | smaller files \n 14 days | until a link expires``` */
export default function Stats({ source }: { source: string }) {
  const data = rows(source);
  return (
    <dl className="md-tool md-stats" style={{ gridTemplateColumns: `repeat(${Math.min(data.length, 4)}, minmax(0, 1fr))` }}>
      {data.map(([value, label]) => (
        <div key={value + label}>
          <dd>{value}</dd>
          <dt>{label}</dt>
        </div>
      ))}
    </dl>
  );
}
