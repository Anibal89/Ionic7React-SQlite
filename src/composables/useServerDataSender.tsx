import { useEffect } from "react";

// Definición de la interfaz UserItem aquí, dentro del mismo archivo
interface UserItem {
  id: string;
  name: string;
}

// Asumimos que data es un objeto que contiene un array de UserItem bajo la clave 'items'
const useServerDataSender = (
  data: { items: UserItem[] },
  interval: number
): void => {
  useEffect(() => {
    const sendData = async () => {
      if (data.items.length > 0) {
        try {
          const response = await fetch("http://localhost:3000/recibir-datos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }

          const responseData = await response.json();
          console.log("Datos enviados y respuesta recibida:", responseData);
        } catch (error) {
          console.error("Error al enviar datos:", error);
        }
      }
    };

    const intervalId = setInterval(sendData, interval);
    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [data, interval]); // Dependencias del efecto, se reactivará si 'data' o 'interval' cambian
};

export default useServerDataSender;
