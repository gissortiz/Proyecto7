import { useState } from "react";
import axiosClient from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/users/login", { email, password });
      localStorage.setItem("token", res.data);
      // Obtener datos completos del usuario (incluido el rol)
      const userRes = await axiosClient.get("/users/verify-user", {
        headers: { Authorization: `Bearer ${res.data}` }
      });
      localStorage.setItem("user", JSON.stringify(userRes.data.user));
      localStorage.setItem("userId", userRes.data.user._id);
      setMessage("Login exitoso. Redirigiendo...");
      window.location.href = "/profile";
    } catch {
      setMessage("Usuario o contraseña incorrectos");
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
      <h2 style={{color: '#003366', textAlign: 'center', marginBottom: 24}}>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{padding: 10, borderRadius: 8, border: '1px solid #0072ce', fontSize: 16}} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required style={{padding: 10, borderRadius: 8, border: '1px solid #0072ce', fontSize: 16}} />
        <button type="submit" style={{marginTop: 10}}>Entrar</button>
      </form>
      {message && <p style={{color: message === 'Login exitoso' ? '#0072ce' : 'red', textAlign: 'center', marginTop: 16}}>{message}</p>}
    </div>
  );
};

export default Login;
