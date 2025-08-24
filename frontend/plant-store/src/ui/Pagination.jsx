export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));

  return (
    <div className="row center gap-8">
      <button className="btn" onClick={prev} disabled={page <= 1}>Prev</button>
      <span className="muted">Page {page} of {totalPages}</span>
      <button className="btn" onClick={next} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
