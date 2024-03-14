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
      const isConn = (await sqlite.current.isConnection("Unisa2", false)).result;

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
        console.error('Error during cleanup:', error);
      }
    }
  };

  const initializeTables = async () => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const queryCreateUsersTable = `
        CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
        );  
      `;
      await db.execute(queryCreateUsersTable);
    });
  };

  const loadData = async (): Promise<UserItem[]> => {
    let users: UserItem[] = [];
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const result = await db.query("SELECT * FROM Users");
      if (result.values) {
        users = result.values.map(user => ({ id: user.id, name: user.name }));
      }
    });
    return users;
  };

  const checkUserExists = async (userId: number): Promise<boolean> => {
    let userExists = false;
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const result = await db.query(`SELECT * FROM Users WHERE id = ?`, [userId]);
      if (result.values && result.values.length > 0) {
        userExists = true;
      }
    });
    return userExists;
  };

  const addUser = async (userId: number, userName: string): Promise<void> => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const queryInsertUser = `INSERT INTO Users (id, name) VALUES (?, ?);`;
      const params: any[] = [userId, userName];
        await db.execute(`INSERT INTO Users (id, name) VALUES ('${userId}', '${userName}')`);
    });
  };

  const deleteUser = async (userId: number): Promise<void> => {
    await performSQLAction(async (db: SQLiteDBConnection) => {
      const queryDeleteUser = `DELETE FROM Users WHERE id=?;`;
      await db.run(queryDeleteUser, [userId]);
    });
  };

  const addUserIfNeeded = async (userId: number, userName: string): Promise<void> => {
    const userExists = await checkUserExists(userId);
    if (!userExists) {
      await addUser(userId, userName);
      console.log("User added to the database");
    } else {
      console.log("User already exists, not added to the database");
    }
  };

  return { performSQLAction, initialized, checkUserExists, addUserIfNeeded, addUser, deleteUser, loadData };
};

export default useSQLiteDB;
