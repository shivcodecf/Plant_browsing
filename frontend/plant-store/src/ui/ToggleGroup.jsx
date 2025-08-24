export default function ToggleGroup({ label, value, onChange, options }) {
  return (
    <div className="row wrap gap-8">
      {label && <span className="muted">{label}:</span>}
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`chip ${value === opt.value ? "chip-active" : ""}`}
          onClick={() => onChange(opt.value)}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
