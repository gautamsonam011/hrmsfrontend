export default function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div style={styles.container}>
      <p style={styles.message}>{message}</p>

      {onRetry && (
        <button style={styles.button} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: "#dc2626",
    marginBottom: "12px",
    fontSize: "15px",
  },
  button: {
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
