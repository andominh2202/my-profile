export function Toast({ message }: { message: string }) {
  return (
    <div
      id="toast"
      className={`toast${message ? ' is-visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
