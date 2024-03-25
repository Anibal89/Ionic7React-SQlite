export interface Despacho {
    Id: number;
    Maquina: string;
    Nombre: string;
    Detalle_Material: {
      Id_detalle: number;
      Material: {
        Id_Material: number;
        Nombre_Material: string;
        Cantidad_Sacos: number;
        Peso_Libras: number;
      }[];
      Total: number;
      Total_Sacos: number;
    };
  }