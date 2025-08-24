export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error">
      <span>⚠️ {message}</span>
      {onRetry && <button className="btn" onClick={onRetry}>Retry</button>}
    </div>
  );
}
