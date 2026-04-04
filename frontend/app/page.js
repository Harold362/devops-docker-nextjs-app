"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:3001";

  const loadTasks = async () => {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    if (!title) return;
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
    });
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-black-100">
      {/* Header */}
      <div className="bg-blue-600 text-black p-4 text-center text-2xl font-bold">
        DevOps Task Manager
      </div>

      <div className="max-w-2xl mx-auto mt-10 bg-black p-6 rounded-lg shadow">
        {/* Crear tarea */}
        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 flex-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nueva tarea..."
          />
          <button
            onClick={createTask}
            className="bg-blue-500 text-black px-4 py-2 rounded"
          >
            Crear
          </button>
        </div>

        {/* Contador */}
        <div className="mb-4 text-black-600">
          Total tareas: {tasks.length}
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-black px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}