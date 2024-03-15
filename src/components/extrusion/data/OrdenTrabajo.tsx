
const DatosT = () => {

    const OrdenTrabajo = {
        Id: 1,
        Foto: "https://st.depositphotos.com/2249091/4614/i/450/depositphotos_46146603-stock-photo-production-workers-during-production-process.jpg",
        Maquina: "Extrusora 10",
        Nombre: "Israel de Leon",
        Turno: "Dia",
        Estado: "Asignado",
        Hora: "15:15 am",
        Puesto: "Extrusor",
        Detalle_Material: {
          Id: 1,
          Material: [
            {
              Id_Material: 1,
              Nombre_Material: "HDPE VIRGEN SELLADO",
              Cantidad_Sacos: 2,
              Peso_Libras: 1050,
            },
            {
              Id_Material: 2,
              Nombre_Material: "POLIPROPILENO P.P",
              Cantidad_Sacos: 2,
              Peso_Libras: 1050,
            },
            {
              Id_Material: 3,
              Nombre_Material: "POLIPROPILENO P.P",
              Cantidad_Sacos: 2,
              Peso_Libras: 1050,
            },
            {
              Id_Material: 4,
              Nombre_Material: "POLIPROPILENO P.P",
              Cantidad_Sacos: 2,
              Peso_Libras: 1050,
            },
            {
              Id_Material: 5,
              Nombre_Material: "POLIPROPILENO P.P",
              Cantidad_Sacos: 2,
              Peso_Libras: 1050,
            },
          ],
          Total: 10500,
          Total_Sacos: 10,
        },
      };

return {OrdenTrabajo}
};

export default DatosT;