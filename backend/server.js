const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.log(err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando desde Docker Compose');
});


// =======================
// USUARIOS - REGISTER
// =======================
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();
  res.json({ message: "Usuario creado" });
});


// =======================
// USUARIOS - LOGIN
// =======================
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("Usuario no existe");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(400).send("Password incorrecto");

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});


// =======================
// TAREAS
// =======================

// Obtener tareas
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Crear tarea
app.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title
  });

  await task.save();
  res.json(task);
});

// Eliminar tarea
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Tarea eliminada");
});


// Servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});