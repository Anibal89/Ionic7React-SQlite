
const DatosT = () => {

    const OrdenTrabajo = {
        Id: 1,
        Foto: "https://i.postimg.cc/632P30zs/Worker.png",
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
              Cantidad_Sacos: 1,
              Peso_Libras: 385.80,
            },
            {
              Id_Material: 2,
              Nombre_Material: "MASTER NEGRO LA INDIA BM-5006",
              Cantidad_Sacos: 1,
              Peso_Libras: 30.00,
            },
            {
              Id_Material: 3,
              Nombre_Material: "PELETIZADO ALTA NEGRO",
              Cantidad_Sacos: 1,
              Peso_Libras: 1050.00,
            },
            {
              Id_Material: 4,
              Nombre_Material: "EMPAQUE",
              Cantidad_Sacos: 1,
              Peso_Libras: 0.4,
            },
            {
              Id_Material: 5,
              Nombre_Material: "MEZCLADO ALTA",
              Cantidad_Sacos: 1,
              Peso_Libras: 204.00,
            },
          ],
          Total:1670.20 ,
          Total_Sacos: 4,
        },
      };

return {OrdenTrabajo}
};

export default DatosT;