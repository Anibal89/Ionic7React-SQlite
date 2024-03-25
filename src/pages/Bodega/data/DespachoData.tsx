
const DespachoData = () => {

    const Despacho = [
      {
        Id: 1,
        Maquina: "1",
        Nombre: "Jose Sipak",
        Turno: "Dia",
        Estado: "Asignado",
        Hora: "15:15 am",
        Puesto: "Extrusor",
        Detalle_Material: {
          Id_detalle: 1,
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
              Id_Material: 4,
              Nombre_Material: "EMPAQUE",
              Cantidad_Sacos: 1,
              Peso_Libras: 0.4,
            },
          ],
          Total:1670.20 ,
          Total_Sacos: 4,
        },
      },
    
      {
        Id: 2,
        Maquina: "2",
        Nombre: "Carlos Perez",
        Turno: "Dia",
        Estado: "Asignado",
        Hora: "15:15 am",
        Puesto: "Extrusor",
        Detalle_Material: {
          Id_detalle: 2,
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
      },

      {
        Id: 3,
        Maquina: "3",
        Nombre: "Roberto Dias",
        Turno: "Dia",
        Estado: "Asignado",
        Hora: "15:15 am",
        Puesto: "Extrusor",
        Detalle_Material: {
          Id_detalle: 1,
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
      },
      {
        Id: 4,
        Maquina: "4",
        Nombre: "Alejandro caleb",
        Turno: "Dia",
        Estado: "Asignado",
        Hora: "15:15 am",
        Puesto: "Extrusor",
        Detalle_Material: {
          Id_detalle: 1,
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
      },
      {
        Id: 5,
        Maquina: "5",
        Nombre: "Luis Zapeta",
        Turno: "Dia",
        Estado: "Asignado",
        Hora: "15:15 am",
        Puesto: "Extrusor",
        Detalle_Material: {
          Id_detalle: 1,
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
      },

      {
        Id: 7,
        Maquina: "7",
        Nombre: "Jordy Paredes",
        Turno: "Dia",
        Estado: "Asignado",
        Hora: "15:15 am",
        Puesto: "Extrusor",
        Detalle_Material: {
          Id_detalle: 1,
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
      },
      {
        Id: 6,
        Maquina: "6",
        Nombre: "israel de leon",
        Turno: "Dia",
        Estado: "Asignado",
        Hora: "15:15 am",
        Puesto: "Extrusor",
        Detalle_Material: {
          Id_detalle: 1,
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
      }
    ];

return {Despacho}
};

export default DespachoData;