"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/tasks", {
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    const token = localStorage.getItem("token");

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Dashboard</h2>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          style={styles.logout}
        >
          Cerrar sesión
        </button>

        <input
          placeholder="Nueva tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <button onClick={createTask} style={styles.button}>
          Crear tarea
        </button>

        <ul style={{ marginTop: "20px" }}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.task}>
              {task.title}
              <button
                onClick={() => deleteTask(task._id)}
                style={styles.delete}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px",
    marginBottom: "15px",
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  delete: {
    background: "red",
    color: "white",
    border: "none",
  },
};