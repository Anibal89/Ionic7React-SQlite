import { useEffect, useRef, useState } from "react";
import {
  SQLiteDBConnection,
  SQLiteConnection,
  CapacitorSQLite,
} from "@capacitor-community/sqlite";

type UserItem = {
  id: number;
  name: string;
};

const useSQLiteDB = () => {
  const db = useRef<SQLiteDBConnection | null>(null);
  const sqlite = useRef<SQLiteConnection | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeDB = async () => {
      if (sqlite.current) return;

      sqlite.current = new SQLiteConnection(CapacitorSQLite);
      const ret = await sqlite.current.checkConnectionsConsistency();
      const isConn = (await sqlite.current.isConnection("Unisa2", false))
        .result;

      if (ret.result && isConn) {
        db.current = await sqlite.current.retrieveConnection("Unisa2", false);
      } else {
        db.current = await sqlite.current.createConnection(
          "Unisa2",
          false,
          "no-encryption",
          1,
          false
        );
      }
      await initializeTables();
    };

    initializeDB().then(() => {
      setInitialized(true);
    });
  }, []);

  const performSQLAction = async (
    action: (db: SQLiteDBConnection) => Promise<void>,
    cleanup?: () => Promise<void>
  ): Promise<void> => {
    try {
      if (db.current) {
        await db.current.open();
        await action(db.current);
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      try {
        if (db.current && (await db.current.isDBOpen()).result) {
          await db.current.close();
        }
        if (cleanup) {
          await cleanup();
        }
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    }
  };

  //**********CREACIÓN DE TABLAS SE INICIALIZAN***************/

  const initializeTables = async () => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
      await db.execute("PRAGMA foreign_keys = ON;");
      // Usuarios no depende de ninguna tabla
      try {
        const queryCreateUsersTable = `
          CREATE TABLE IF NOT EXISTS Users (
              id INTEGER PRIMARY KEY NOT NULL,
              name TEXT NOT NULL
          );
      `;
        await db.execute(queryCreateUsersTable);
        console.log("Tabla Users creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Users:", error);
      }

      //PUESTO no depende de ninguna tabla
      try {
        const queryCreatePuestoTable = `
        CREATE TABLE IF NOT EXISTS Puesto (
            id INTEGER PRIMARY KEY NOT NULL,
            descripcion TEXT NOT NULL
        );
    `;
        await db.execute(queryCreatePuestoTable);
        console.log("Tabla Puesto creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Puesto:", error);
      }

      //TIPO MAQUINA no depende de ninguna tabla
      try {
        const queryCreateTipoMaquinaTable = `
            CREATE TABLE IF NOT EXISTS Tipo_Maquina (
                id INTEGER PRIMARY KEY NOT NULL,
                descripcion TEXT NOT NULL
            );
        `;
        await db.execute(queryCreateTipoMaquinaTable);
        console.log("Tabla Tipo_Maquina creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Tipo_Maquina:", error);
      }

      // Materia Prima no depende de ninguna tabla
      try {
        const queryCreateMateriaPrimaTable = `
            CREATE TABLE IF NOT EXISTS Materia_Prima (
                Id_Material INTEGER PRIMARY KEY NOT NULL,
                Nombre_Material TEXT NOT NULL
            );
        `;
        await db.execute(queryCreateMateriaPrimaTable);
        console.log("Tabla Materia_Prima creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Materia_Prima:", error);
      }

      // Medida no depende de ninguna tabla
      try {
        const queryCreateMedidaTable = `
            CREATE TABLE IF NOT EXISTS Medida (
                id INTEGER PRIMARY KEY NOT NULL,
                descripcion TEXT NOT NULL
            );
        `;
        await db.execute(queryCreateMedidaTable);
        console.log("Tabla Medida creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Medida:", error);
      }

      // Bodega Temporal no depende de ninguna tabla
      try {
        const queryCreateBodegaTemporalTable = `
            CREATE TABLE IF NOT EXISTS Bodega_Temporal (
                id INTEGER PRIMARY KEY NOT NULL,
                nombreBodega TEXT,
                ubicacion TEXT
            );
        `;
        await db.execute(queryCreateBodegaTemporalTable);
        console.log("Tabla Bodega_Temporal creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Bodega_Temporal:", error);
      }

      // Bodega Materia Prima no depende de ninguna tabla
      try {
        const queryCreateBodegaMateriaPrimaTable = `
              CREATE TABLE IF NOT EXISTS Bodega_Materia_Prima (
                  id INTEGER PRIMARY KEY NOT NULL,
                  ubicacion TEXT NOT NULL
              );
          `;
        await db.execute(queryCreateBodegaMateriaPrimaTable);
        console.log("Tabla Bodega_Materia_Prima creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Bodega_Materia_Prima:", error);
      }

      // Maquina depende de la tabla Tipo_Maquina
      try {
        const queryCreateMaquinaTable = `
            CREATE TABLE IF NOT EXISTS Maquina (
                id INTEGER PRIMARY KEY NOT NULL,
                idTipoMaquina INTEGER,
                FOREIGN KEY (idTipoMaquina) REFERENCES Tipo_Maquina(id)
            );
        `;
        await db.execute(queryCreateMaquinaTable);
        console.log("Tabla Maquina creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Maquina:", error);
      }

      // Operadores depende de la tabla Puesto
      try {
        const queryCreateOperadoresTable = `
            CREATE TABLE IF NOT EXISTS Operadores (
                id INTEGER PRIMARY KEY NOT NULL,
                nombre TEXT NOT NULL,
                idPuesto INTEGER,
                FOREIGN KEY (idPuesto) REFERENCES Puesto(id)
            );
        `;
        await db.execute(queryCreateOperadoresTable);
        console.log("Tabla Operadores creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Operadores:", error);
      }

      // Bobina depende de las tablas Medida y Bodega_Temporal
      try {
        const queryCreateBobinaTable = `
            CREATE TABLE IF NOT EXISTS Bobina (
                id INTEGER PRIMARY KEY NOT NULL,
                idMedida INTEGER,
                idBodegaTemporal INTEGER,
                peso REAL,
                estado TEXT,
                FOREIGN KEY (idMedida) REFERENCES Medida(id),
                FOREIGN KEY (idBodegaTemporal) REFERENCES Bodega_Temporal(id)
            );
        `;
        await db.execute(queryCreateBobinaTable);
        console.log("Tabla Bobina creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Bobina:", error);
      }

      //Operación Extrusión depende de las tablas, Maquina, Materia_Prima, Asignacion_materia, Operadores, Alertas

      try {
        const queryCreateOperacionExtrusionTable = `
            CREATE TABLE IF NOT EXISTS Operacion_Extrusion (
                Id_Operacion_extrusion INTEGER PRIMARY KEY NOT NULL,
                idMaquina INTEGER,
        
            
                idOperador INTEGER,
                idAlertas INTEGER,
                Total_Sacos INTEGER,
                Total_Lb INTEGER,
                FOREIGN KEY (idMaquina) REFERENCES Maquina(id),
             
            
                FOREIGN KEY (idOperador) REFERENCES Operadores(id),
                FOREIGN KEY (idAlertas) REFERENCES Alertas(id)
            );
        `;
        await db.execute(queryCreateOperacionExtrusionTable);
        console.log("Tabla Operacion_Extrusion creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Operacion_Extrusion:", error);
      }

      // Asignacion Material depende de la tabla Materia_Prima, Operación Extrusión
      try {
        const queryCreateAsignacionMaterialTable = `
            CREATE TABLE IF NOT EXISTS Asignacion_materia (
                Id_Asignacion_materia INTEGER PRIMARY KEY NOT NULL,
                Id_Material INTEGER,
                Id_Operacion_extrusion INTEGER,
                cantidad_Sacos INTEGER,
                Peso_material INTEGER,
                FOREIGN KEY (Id_Material) REFERENCES Materia_Prima(Id_Material),
                FOREIGN KEY (Id_Operacion_extrusion) REFERENCES Operacion_Extrusion(Id_Operacion_extrusion)
            );
        `;
        await db.execute(queryCreateAsignacionMaterialTable);
        console.log("Tabla Asignacion_materia creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Asignacion_materia:", error);
      }

      // Alertas no depende de ninguna tabla
      try {
        const queryCreateAlertasTable = `
            CREATE TABLE IF NOT EXISTS Alertas (
                id INTEGER PRIMARY KEY NOT NULL,
                descripcion TEXT NOT NULL
            );
        `;
        await db.execute(queryCreateAlertasTable);
        console.log("Tabla Alertas creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Alertas:", error);
      }

      // Orden Trabajo depende de la tabla Operación_Extrusión
      try {
        const queryCreateOrdenTrabajoTable = `
            CREATE TABLE IF NOT EXISTS Orden_Trabajo (
                id INTEGER PRIMARY KEY NOT NULL,
                idOperacionExtrusion INTEGER,
                FOREIGN KEY (idOperacionExtrusion) REFERENCES Operacion_Extrusion(id)
            );
        `;
        await db.execute(queryCreateOrdenTrabajoTable);
        console.log("Tabla Orden_Trabajo creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Orden_Trabajo:", error);
      }

      // Fardos depende de las tablas Bobina y Bodega_Temporal
      try {
        const queryCreateFardosTable = `
            CREATE TABLE IF NOT EXISTS Fardos (
                Id_Fardo INTEGER PRIMARY KEY NOT NULL,
                Id_Bobina INTEGER,
                Id_Bodega_Temporal INTEGER,
                Peso REAL,
                Estado TEXT,
                FOREIGN KEY (Id_Bobina) REFERENCES Bobina(id),
                FOREIGN KEY (Id_Bodega_Temporal) REFERENCES Bodega_Temporal(id)
            );
        `;
        await db.execute(queryCreateFardosTable);
        console.log("Tabla Fardos creada con éxito");
      } catch (error) {
        console.error("Error al crear la tabla Fardos:", error);
      }
    });
  };

  //**********INSERCIÓN DE DATOS POR DEFECTO A LAS TABLAS********/

  const insertDefaultData = async () => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
      await db.execute("PRAGMA foreign_keys = ON;");

      // DATA Usuarios
      await db.execute("DELETE FROM Users");
      const insertUsersData = `
        INSERT OR IGNORE INTO Users (id, name) VALUES 
        (1, 'Alice Smith'),
        (2, 'Bob Johnson');
    `;
      await db.execute(insertUsersData);
      console.table(insertUsersData);

      //DATA PUESTO
      await db.execute("DELETE FROM Puesto");
      const insertPuestoData = `
        INSERT OR IGNORE INTO Puesto (id, descripcion) VALUES 
        (1, 'Jefe'),
        (2, 'Operador');
    `;
      await db.execute(insertPuestoData);
      console.table(insertPuestoData);

      // DATA TIPO MAQUINA
      await db.execute("DELETE FROM Tipo_Maquina");
      const insertTipoMaquinaData = `
      INSERT OR IGNORE INTO Tipo_Maquina (id, descripcion) VALUES 
      (1, 'Extrusora'),
      (2, 'Cortadora');
  `;
      await db.execute(insertTipoMaquinaData);
      console.table(insertTipoMaquinaData);

      // Materia_Prima
      await db.execute("DELETE FROM Materia_Prima");
      const insertMateriaPrimaData = `
      INSERT OR IGNORE INTO Materia_Prima (Id_Material, Nombre_Material) VALUES 
      (1, 'Polietileno'),
      (2, 'Polipropileno');
  `;
      await db.execute(insertMateriaPrimaData);
      console.table(insertMateriaPrimaData);

      // Medida
      await db.execute("DELETE FROM Medida");
      const insertMedidaData = `
      INSERT OR IGNORE INTO Medida (id, descripcion) VALUES 
      (1, '11*13.5 PREMIUM'),
      (2, '13*15.5 LISA');
  `;
      await db.execute(insertMedidaData);
      console.log(insertMedidaData);

      // Bodega_Temporal
      const insertBodegaTemporalData = `
    INSERT OR IGNORE INTO Bodega_Temporal (id, nombreBodega, ubicacion) VALUES 
    (1, 'Central', 'Ubicación 1'),
    (2, 'Secundaria', 'Ubicación 2'),
    (3, 'Terciaria', 'Ubicación 3');
    
  `;
      await db.execute(insertBodegaTemporalData);
      console.log(insertBodegaTemporalData);

      // Bodega_Materia_Prima
      const insertBodegaMateriaPrimaData = `
    INSERT OR IGNORE INTO Bodega_Materia_Prima (id, ubicacion) VALUES 
    (1, 'Almacén 1'),
    (2, 'Almacén 2');
`;
      await db.execute(insertBodegaMateriaPrimaData);
      console.log(insertBodegaMateriaPrimaData);

      //*****  LA ESTRUCTURA CAMBIA DEBIDO QUE SE TIENE QUE LLEVAR UN CONTROL DE LO QUE SE VA CREANDO Y LO QUE SE VA INSERTANDO, YA QUE ESTAS TABLAS DEPENDE DE OTRAS. SE UTILIZA UN ASYNC AWAIT Y UN TRY CATCH PARA SU CORRECTO MANEJO*****/

      //Maquina
      const insertMaquinaDataAsync = async (db: any) => {
        try {
          // Asegurarse de que las foreign keys estén habilitadas
          await db.execute("PRAGMA foreign_keys = ON;");

          // Insertar datos en la tabla Maquina
          const insertMaquinaData = `
                INSERT OR IGNORE INTO Maquina (id, idTipoMaquina) VALUES 
                (1, 1),
                (2, 2);
            `;
          await db.execute(insertMaquinaData);
          console.log("Datos de Maquina insertados con éxito");

          // Verificar que los datos se hayan insertado correctamente
          const selectQuery = "SELECT * FROM Maquina;";
          const queryResult = await db.query(selectQuery);
          console.log("Datos en la tabla Maquina:", queryResult.values);
        } catch (error) {
          console.error("Error al insertar datos en Maquina:", error);
        }
      };
      //operadores
      const insertOperadoresDataAsync = async (db: any) => {
        try {
          // Insertar datos en la tabla Operadores
          const insertOperadoresData = `
                INSERT INTO Operadores (id, nombre, idPuesto) VALUES 
                (1, 'Juan Perez', 1),
                (2, 'Ana Gomez', 2);
            `;
          await db.execute(insertOperadoresData);
          console.log("Datos de Operadores insertados con éxito");

          // Verificar que los datos se hayan insertado correctamente
          const selectQuery = "SELECT * FROM Operadores;";
          const queryResult = await db.query(selectQuery);
          console.log("Datos en la tabla Operadores:", queryResult.values);
        } catch (error) {
          console.error("Error al insertar datos en Operadores:", error);
        }
      };

      // Bobina
      const insertBobinaDataAsync = async (db: any) => {
        try {
          // Insertar datos en la tabla Bobina
          const insertBobinaData = `
          INSERT INTO Bobina (id, idMedida, idBodegaTemporal, peso, estado) VALUES 
          (1, 1, 1, 100, 'Disponible'),
          (2, 2, 2, 200, 'Usado');
      `;
          await db.execute(insertBobinaData);
          console.log("Datos de Bobina insertados con éxito");

          // Verificar que los datos se hayan insertado correctamente
          const selectQuery = "SELECT * FROM Bobina;";
          const queryResult = await db.query(selectQuery);
          console.log("Datos en la tabla Bobina:", queryResult.values);
        } catch (error) {
          console.error("Error al insertar datos en Bobina:", error);
        }
      };

      // Asignacion_materia
      const insertAsignacionMaterialDataAsync = async (db: any) => {
        try {
          // Insertar datos en la tabla Asignacion_materia
          const insertAsignacionMaterialData = `
          INSERT INTO Asignacion_materia (Id_Asignacion_materia, Id_Material, Id_Operacion_extrusion, cantidad_Sacos, Peso_material) VALUES 
          (1, 1, 1, 1, 50),
          (2, 2, 2, 2, 100);
      `;
          await db.execute(insertAsignacionMaterialData);
          console.log("Datos de Asignacion_materia insertados con éxito");

          // Verificar que los datos se hayan insertado correctamente
          const selectQuery = "SELECT * FROM Asignacion_materia;";
          const queryResult = await db.query(selectQuery);
          console.log(
            "Datos en la tabla Asignacion_materia:",
            queryResult.values
          );
        } catch (error) {
          console.error(
            "Error al insertar datos en Asignacion_materia:",
            error
          );
        }
      };

      // Alertas
      const insertAlertasDataAsync = async (db: any) => {
        try {
          // Insertar datos en la tabla Alertas
          const insertAlertasData = `
          INSERT INTO Alertas (id, descripcion) VALUES 
          (1, 'Sobrecalentamiento'),
          (2, 'Baja Presión');
      `;
          await db.execute(insertAlertasData);
          console.log("Datos de Alertas insertados con éxito");

          // Verificar que los datos se hayan insertado correctamente
          const selectQuery = "SELECT * FROM Alertas;";
          const queryResult = await db.query(selectQuery);
          console.log("Datos en la tabla Alertas:", queryResult.values);
        } catch (error) {
          console.error("Error al insertar datos en Alertas:", error);
        }
      };

      // Operacion_Extrusion
      const insertOperacionExtrusionDataAsync = async (db: any) => {
        try {
          // Insertar datos en la tabla Operacion_Extrusion
          const insertOperacionExtrusionData = `
          INSERT INTO Operacion_Extrusion (Id_Operacion_extrusion, idMaquina,  idOperador, idAlertas, Total_Sacos, Total_Lb) VALUES 
          (1, 1, 1, 1, 1, 50),
          (2, 2, 2, 2, 2, 100);
      `;
          await db.execute(insertOperacionExtrusionData);
          console.log("Datos de Operacion_Extrusion insertados con éxito");

          // Verificar que los datos se hayan insertado correctamente
          const selectQuery = "SELECT * FROM Operacion_Extrusion;";
          const queryResult = await db.query(selectQuery);
          console.log(
            "Datos en la tabla Operacion_Extrusion:",
            queryResult.values
          );
        } catch (error) {
          console.error(
            "Error al insertar datos en Operacion_Extrusion:",
            error
          );
        }
      };

      // Orden_Trabajo
      const insertOrdenTrabajoDataAsync = async (db: any) => {
        try {
          // Insertar datos en la tabla Orden_Trabajo
          const insertOrdenTrabajoData = `
          INSERT INTO Orden_Trabajo (id, idOperacionExtrusion) VALUES 
          (1, 1),
          (2, 2);
      `;
          await db.execute(insertOrdenTrabajoData);
          console.log("Datos de Orden_Trabajo insertados con éxito");

          // Verificar que los datos se hayan insertado correctamente
          const selectQuery = "SELECT * FROM Orden_Trabajo;";
          const queryResult = await db.query(selectQuery);
          console.log("Datos en la tabla Orden_Trabajo:", queryResult.values);
        } catch (error) {
          console.error("Error al insertar datos en Orden_Trabajo:", error);
        }
      };

      // Fardos
      const insertFardosDataAsync = async (db: any) => {
        try {
          // Insertar datos en la tabla Fardos
          const insertFardosData = `
          INSERT INTO Fardos (Id_Fardo, Id_Bobina, Id_Bodega_Temporal, Peso, Estado) VALUES 
          (1, 1, 1, 500, 'Disponible'),
          (2, 2, 2, 450, 'Usado');
      `;
          await db.execute(insertFardosData);
          console.log("Datos de Fardos insertados con éxito");

          // Verificar que los datos se hayan insertado correctamente
          const selectQuery = "SELECT * FROM Fardos;";
          const queryResult = await db.query(selectQuery);
          console.log("Datos en la tabla Fardos:", queryResult.values);
        } catch (error) {
          console.error("Error al insertar datos en Fardos:", error);
        }
      };

      //**** CON ESTA FUNCIÓN RESPETAMOS EL ORDEN CON ESTO EVITAMOS LOS ERRORES ****/
      const setupDatabase = async (db: any) => {
        // Insertar datos en las tablas respetando el orden de las dependencias
        await insertMaquinaDataAsync(db);
        await insertOperadoresDataAsync(db);
        await insertBobinaDataAsync(db);
        await insertAsignacionMaterialDataAsync(db);
        await insertAlertasDataAsync(db);
        await insertOperacionExtrusionDataAsync(db);
        await insertOrdenTrabajoDataAsync(db);
        await insertFardosDataAsync(db);
      };

      // Ejecutar la configuración de la base de datos
      setupDatabase(db);
    });
  };

  const setupDatabase = async () => {
    await initializeTables(); // Primero, se asegura de que todas las tablas están creadas.
    await insertDefaultData(); // Luego, una vez que las tablas existen se inserta los datos.
  };

  // Llama a setupDatabase para comenzar el proceso
  setupDatabase();

  const loadData = async (): Promise<UserItem[]> => {
    let users: UserItem[] = [];
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const result = await db.query("SELECT * FROM Users");
      if (result.values) {
        users = result.values.map((user) => ({ id: user.id, name: user.name }));
      }
    });
    return users;
  };

  const checkUserExists = async (
    userId: number
  ): Promise<{ exists: boolean; userName: string | null }> => {
    let userExists = false;
    let userName = null; // Variable para almacenar el nombre del usuario si existe

    await performSQLAction(async (db: SQLiteDBConnection) => {
      const result = await db.query(`SELECT * FROM Users WHERE id = ?`, [
        userId,
      ]);
      if (result.values && result.values.length > 0) {
        userExists = true;
        userName = result.values[0].name;
        console.log(`User exists: ${userExists}, UserName: ${userName}`); // Agregamos un log para verificar
      }
    });

    return { exists: userExists, userName: userName };
  };

  const addUser = async (userId: number, userName: string): Promise<void> => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const queryInsertUser = `INSERT INTO Users (id, name) VALUES (?, ?);`;
      const params: any[] = [userId, userName];
      await db.execute(
        `INSERT INTO Users (id, name) VALUES ('${userId}', '${userName}')`
      );
    });
  };

  const deleteUser = async (userId: number): Promise<void> => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const queryDeleteUser = `DELETE FROM Users WHERE id=?;`;
      await db.run(queryDeleteUser, [userId]);
    });
  };

  const addUserIfNeeded = async (
    userId: number,
    userName: string
  ): Promise<void> => {
    const userExists = await checkUserExists(userId);
    if (!userExists) {
      await addUser(userId, userName);
      console.log("User added to the database");
    } else {
      console.log("User already exists, not added to the database");
    }
  };

  return {
    performSQLAction,
    initialized,
    checkUserExists,
    addUserIfNeeded,
    addUser,
    deleteUser,
    loadData,
  };
};

export default useSQLiteDB;
