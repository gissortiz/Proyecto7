import { useState } from "react";
import axiosClient from "../config/axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/users/create", { username, email, password });
      setMessage("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
    } catch {
      setMessage("Error al registrar usuario");
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "2rem auto",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 16px #00336622",
      padding: 32,
      border: "1.5px solid #0072ce"
    }}>
      <h2 style={{color: '#003366', textAlign: 'center', marginBottom: 24}}>Registro</h2>
      <form onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <input type="text" placeholder="Nombre de usuario" value={username} onChange={e=>setUsername(e.target.value)} required style={{padding: 10, borderRadius: 8, border: '1px solid #0072ce', fontSize: 16}} />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{padding: 10, borderRadius: 8, border: '1px solid #0072ce', fontSize: 16}} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required style={{padding: 10, borderRadius: 8, border: '1px solid #0072ce', fontSize: 16}} />
        <button type="submit" style={{marginTop: 10}}>Registrarse</button>
      </form>
      {message && <p style={{color: message.includes('correctamente') ? '#0072ce' : 'red', textAlign: 'center', marginTop: 16}}>{message}</p>}
    </div>
  );
};

export default Signup;
