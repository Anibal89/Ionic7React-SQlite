import { useEffect, useRef, useState } from "react";
import {
  SQLiteDBConnection,
  SQLiteConnection,
  CapacitorSQLite,
} from "@capacitor-community/sqlite";

const useSQLiteDB = () => {
  const db = useRef<SQLiteDBConnection | null>(null);
  const sqlite = useRef<SQLiteConnection | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeDB = async () => {
      if (sqlite.current) return;

      sqlite.current = new SQLiteConnection(CapacitorSQLite);
      const ret = await sqlite.current.checkConnectionsConsistency();
      const isConn = (await sqlite.current.isConnection("Unisa", false)).result;

      if (ret.result && isConn) {
        db.current = await sqlite.current.retrieveConnection("Unisa", false);
      } else {
        db.current = await sqlite.current.createConnection(
          "Unisa",
          false,
          "no-encryption",
          1,
          false
        );
      }
      await initializeTables();
      await addDefaultUser(); // Add default user after initializing tables
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
        console.error('Error during cleanup:', error);
      }
    }
  };

  const initializeTables = async () => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const queryCreateUsersTable = `
        CREATE TABLE IF NOT EXISTS Users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Anime (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
         );
          
        CREATE TABLE IF NOT EXISTS Rol (
          Id_Rol INTEGER PRIMARY KEY NOT NULL,
          Nombre_Rol TEXT NOT NULL
        );
  
        INSERT or IGNORE INTO Rol (Id_Rol,Nombre_Rol) VALUES 
        (1,'Dev'),
        (2,'Web Master');
  
        CREATE TABLE IF NOT EXISTS Usuario (
          Id_Usuario INTEGER PRIMARY KEY NOT NULL,
          Nombre_Usuario TEXT NOT NULL,
          Id_Rol INTEGER NOT NULL,
          CONSTRAINT fk_Id_Rol FOREIGN KEY (Id_Rol) REFERENCES Rol(Id_Rol)
        );
  
        INSERT or IGNORE INTO Usuario (Id_Usuario,Nombre_Usuario,Id_Rol) VALUES
        (1,'Luis Zapeta',1);
  

      `;
      const respCT = await db?.execute(queryCreateUsersTable);
      console.log(`res: ${JSON.stringify(respCT)}`);
    });
  };

  const checkUserExists = async (userId: string): Promise<boolean> => {
    let userExists = false;
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const result = await db.query(`SELECT * FROM Users WHERE id = ?`, [userId]);
      if (result.values && result.values.length > 0) {
        userExists = true;
      }
    });
    return userExists;
  };

  const addUser = async (userId: string, userName: string): Promise<void> => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
        const queryInsertUser = `
            INSERT INTO Users (id, name) VALUES (?, ?);
        `;
        // Cambia la tipificación a any para depuración
        const params: any[] = [userId, userName];
        await db.execute(`INSERT INTO Users (id, name) VALUES ('${userId}', '${userName}')`);
    });
};

  // modificar código ya que permite inyecciones SQL
  const addDefaultUser = async () => {
    const userExists = await checkUserExists("192531066157");
    if (!userExists) {
      await addUser("192531066157", "Default User");
      await addUser("X0041G1VYT", "Secondary User");
      console.log("Default user added to the database");
    }
  };

  return { performSQLAction, initialized, checkUserExists, addUser };
};

export default useSQLiteDB;