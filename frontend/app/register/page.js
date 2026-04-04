// "use client";
// import { useState } from "react";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const registerUser = async () => {
//     await fetch("http://localhost:3001/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, password }),
//     });

//     alert("Usuario registrado");
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Registro</h1>

//       <input
//         placeholder="Nombre"
//         onChange={(e) => setName(e.target.value)}
//       /><br/><br/>

//       <input
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       /><br/><br/>

//       <input
//         placeholder="Password"
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       /><br/><br/>

//       <button onClick={registerUser}>Registrar</button>
//     </div>
//   );
// }
"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    alert("Usuario registrado");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Registro</h1>

      <input
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={registerUser}>Registrar</button>
    </div>
  );
}