const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Task = require("./models/Task");
const User = require("./models/User");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));

// Middleware verificar token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Token requerido");
  }

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    req.userId = decoded.id;
    next();
  });
}

// Ruta prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

// REGISTER
app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();
  res.json({ message: "Usuario creado" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({ message: "Usuario no existe" });
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validPassword) {
    return res.json({ message: "Password incorrecto" });
  }

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});

// OBTENER tareas del usuario
app.get("/tasks", verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// CREAR tarea
app.post("/tasks", verifyToken, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    userId: req.userId,
  });

  await task.save();
  res.json(task);
});

// ELIMINAR tarea
app.delete("/tasks/:id", verifyToken, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Tarea eliminada");
});

// Servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});