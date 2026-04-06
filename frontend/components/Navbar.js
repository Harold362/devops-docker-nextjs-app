"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>Mi App</h2>

      <div>
        <button style={styles.btn} onClick={() => router.push("/")}>
          Home
        </button>
        <button style={styles.btn} onClick={() => router.push("/login")}>
          Login
        </button>
        <button style={styles.btn} onClick={() => router.push("/register")}>
          Register
        </button>
        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    width: "100%",
    height: "60px",
    background: "#222",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
  },
  logo: {
    margin: 0,
  },
  btn: {
    marginLeft: "10px",
    padding: "8px 12px",
    border: "none",
    background: "#555",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
  logout: {
    marginLeft: "10px",
    padding: "8px 12px",
    border: "none",
    background: "#dc3545",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
};