export default function PlantCard({ plant }) {
  return (
    <article className="card">
      <div className="card-header">
        <h3 className="title">{plant.name}</h3>
        <div className={`badge ${plant.stock ? "ok" : "bad"}`}>{plant.stock ? "In Stock" : "Out of Stock"}</div>
      </div>
      <div className="price">₹ {Number(plant.price).toLocaleString()}</div>
      <div className="categories">
        {Array.isArray(plant.categories) ? plant.categories.map((c) => <span key={c} className="pill">{c}</span>) : null}
      </div>
    </article>
  );
}
