import { useEffect, useRef, useState } from "react";
import {
  SQLiteDBConnection,
  SQLiteConnection,
  CapacitorSQLite,
} from "@capacitor-community/sqlite";

const useSQLiteDB = () => {
  const db = useRef<SQLiteDBConnection>();
  const sqlite = useRef<SQLiteConnection>();
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
    };

    initializeDB().then(() => {
      initializeTables();
      setInitialized(true);
    });
  }, []);

  const performSQLAction = async (
    action: (db: SQLiteDBConnection | undefined) => Promise<void>,
    cleanup?: () => Promise<void>
  ) => {
    try {
      await db.current?.open();
      await action(db.current);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      try {
        (await db.current?.isDBOpen())?.result && (await db.current?.close());
        cleanup && (await cleanup());
      } catch {}
    }
  };

  /**
   * here is where you cna check and update table
   * structure
   */
  const initializeTables = async () => {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const queryCreateTable = `

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

      const respCT = await db?.execute(queryCreateTable);
      console.log(`res: ${JSON.stringify(respCT)}`);
    });
  };

  return { performSQLAction, initialized };
};

export default useSQLiteDB;
