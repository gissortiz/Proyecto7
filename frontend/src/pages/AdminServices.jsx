import React from "react";
import axiosClient from "../config/axios";
import { useAppContext } from "../AppContext";

export default function AdminServices() {
  const { state, dispatch } = useAppContext();
  const user = state.user || JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = React.useState({ name: "", description: "", price: "", duration: "" });
  const [editing, setEditing] = React.useState(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetchServices();
    // eslint-disable-next-line
  }, []);

  async function fetchServices() {
    try {
      const res = await axiosClient.get("/services");
      dispatch({ type: "SET_SERVICES", payload: res.data.services });
    } catch {
      setError("Error al cargar servicios");
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await axiosClient.put(`/services/${editing}`, form);
      } else {
        await axiosClient.post("/services", form);
      }
      setForm({ name: "", description: "", price: "", duration: "" });
      setEditing(null);
      fetchServices();
    } catch {
      setError("Error al guardar servicio");
    }
  };

  const handleEdit = s => {
    setForm({ name: s.name, description: s.description, price: s.price, duration: s.duration });
    setEditing(s._id);
  };

  const handleDelete = async id => {
    if (!window.confirm("¿Eliminar este servicio?")) return;
    try {
      await axiosClient.delete(`/services/${id}`);
      fetchServices();
    } catch {
      setError("Error al eliminar servicio");
    }
  };

  if (!user || user.role !== 'admin') {
    return <div style={{textAlign:'center',marginTop:40,color:'#c00'}}>Acceso restringido solo para administradores.</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px #00336622", padding: 32, border: "1.5px solid #0072ce" }}>
      <h2 style={{ color: "#003366", textAlign: "center", marginBottom: 24, fontWeight: 700, letterSpacing: 1 }}>Gestión de Servicios</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, justifyContent: 'center' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required style={{ flex: 1, minWidth: 120, padding: 8, borderRadius: 8, border: '1px solid #0072ce', fontSize: 15 }} />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required style={{ flex: 2, minWidth: 180, padding: 8, borderRadius: 8, border: '1px solid #0072ce', fontSize: 15 }} />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" type="number" required style={{ width: 110, padding: 8, borderRadius: 8, border: '1px solid #0072ce', fontSize: 15 }} />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duración (min)" type="number" required style={{ width: 130, padding: 8, borderRadius: 8, border: '1px solid #0072ce', fontSize: 15 }} />
        <button type="submit" style={{ background: "#0072ce", color: "#fff", border: 0, borderRadius: 8, padding: "8px 20px", fontWeight: 600, fontSize: 15, boxShadow: '0 2px 8px #00336622', transition: 'background 0.2s' }}>{editing ? "Actualizar" : "Agregar"}</button>
        {editing && <button type="button" onClick={()=>{setEditing(null);setForm({name:"",description:"",price:"",duration:""});}} style={{ background: "#ccc", border: 0, borderRadius: 8, padding: "8px 20px", fontWeight: 600, fontSize: 15, marginLeft: 4 }}>Cancelar</button>}
      </form>
      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
          <thead>
            <tr style={{ background: "#e6f0fa" }}>
              <th style={{ padding: '10px 8px', fontWeight: 700, color: '#003366' }}>Nombre</th>
              <th style={{ padding: '10px 8px', fontWeight: 700, color: '#003366' }}>Descripción</th>
              <th style={{ padding: '10px 8px', fontWeight: 700, color: '#003366' }}>Precio</th>
              <th style={{ padding: '10px 8px', fontWeight: 700, color: '#003366' }}>Duración</th>
              <th style={{ padding: '10px 8px', fontWeight: 700, color: '#003366' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.services.map(s => (
              <tr key={s._id} style={{ borderBottom: "1px solid #e0e0e0", background: editing === s._id ? '#e6f0fa' : '#fff' }}>
                <td style={{ padding: '10px 8px' }}>{s.name}</td>
                <td style={{ padding: '10px 8px' }}>{s.description}</td>
                <td style={{ padding: '10px 8px' }}>${Number(s.price).toLocaleString()}</td>
                <td style={{ padding: '10px 8px' }}>{s.duration} min</td>
                <td style={{ padding: '10px 8px', display: 'flex', gap: 8 }}>
                  <button onClick={() => handleEdit(s)} style={{ background: '#0072ce', color: '#fff', border: 0, borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px #00336622', transition: 'background 0.2s' }}>Editar</button>
                  <button onClick={() => handleDelete(s._id)} style={{ background: '#fff', color: '#c00', border: '1.5px solid #c00', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px #c00a', transition: 'background 0.2s' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
