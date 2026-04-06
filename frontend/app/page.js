//"use client";
export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Bienvenido</h1>
        <p>Esta es mi aplicación Fullstack con Docker</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};