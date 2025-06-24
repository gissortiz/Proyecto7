import { useEffect, useState } from "react";
import axiosClient from "../config/axios";


const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosClient.get("/services")
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((err) => {
        console.error("Error al obtener servicios:", err);
      });
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {services.map(service => (
        <div key={service._id} className="border p-4 rounded shadow">
          <h3 className="text-xl font-bold">{service.name}</h3>
          <p>{service.description}</p>
          <p><strong>Duración:</strong> {service.duration} minutos</p>
          <p><strong>Precio:</strong> ${service.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
