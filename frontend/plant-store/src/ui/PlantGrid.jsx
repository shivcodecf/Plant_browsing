import PlantCard from "./PlantCard.jsx";

export default function PlantGrid({ items }) {
  return (
    <div className="grid">
      {items.map((p) => (
        <PlantCard key={p._id} plant={p} />
      ))}
    </div>
  );
}
