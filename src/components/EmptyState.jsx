export default function EmptyState({ text = "No data available" }) {
  return (
    <div style={styles.container}>
      <p style={styles.text}>{text}</p>
    </div>
  );
}

const styles = {
  container: {
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "16px",
    color: "#6b7280",
  },
};
