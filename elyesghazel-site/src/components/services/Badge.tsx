type BadgeProps = {
  label: string
  primary: boolean
}

export default function Badge({ label, primary }: BadgeProps) {
const className = `flex flex-row p-[6px] px-[10px] items-center justify-center gap-3 rounded-[16px] ${
    primary ? "bg-[var(--primary-color)]" : "bg-[rgba(229,229,229,0.21)]"
  }`;

  return (
    <div className={className}>
        <h2 className="text-[12px] text-center font-medium">{label}</h2>
    </div>
  )
}