import React, { useEffect, useState } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import "./Home.css";

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../composables/useSQLiteDB";
import useConfirmationAlert from "../composables/useConfirmationAlert";

type SQLItem = {
  id: number;
  name: string;
};

type SQLItem2 = {
  Id_Usuario: number;
  Nombre_Usuario: string;
  Nombre_Rol: number;
};

const Home: React.FC = () => {
  const [editItem, setEditItem] = useState<any>();
  const [inputName, setInputName] = useState("");
  const [items, setItems] = useState<Array<SQLItem>>();
  const [items2, setItems2] = useState<Array<SQLItem2>>();

  // hook for sqlite db
  const { performSQLAction, initialized } = useSQLiteDB();

  // hook for confirmation dialog
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  useEffect(() => {
    loadData();
    loadData2 ();
  }, [initialized]);

  /**
   * do a select of the database
   */
  const loadData = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM Anime`);
        setItems(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItems([]);
    }
  };

  const loadData2 = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect2 = await db?.query(`SELECT u.Id_Usuario, u.Nombre_Usuario, r.Nombre_Rol FROM Usuario u INNER JOIN Rol r on u.Id_Rol = r.Id_Rol;`);
        setItems2(respSelect2?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItems2([]);
    }
  };

  const updateItem = async () => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`UPDATE Anime SET name=? WHERE id=?`, [
            inputName,
            editItem?.id,
          ]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM Anime;`);
          setItems(respSelect?.values);
        },
        async () => {
          setInputName("");
          setEditItem(undefined);
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const addItem = async () => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO Anime (id,name) values (?,?);`, [
            Date.now(),
            inputName,
          ]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM Anime;`);
          setItems(respSelect?.values);
        },
        async () => {
          setInputName("");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const confirmDelete = (itemId: number) => {
    showConfirmationAlert("Are You Sure You Want To Delete This Item?", () => {
      deleteItem(itemId);
    });
  };

  const deleteItem = async (itemId: number) => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`DELETE FROM Anime WHERE id=?;`, [itemId]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM Anime;`);
          setItems(respSelect?.values);
        },
        async () => {
          setInputName("");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const doEditItem = (item: SQLItem | undefined) => {
    if (item) {
      setEditItem(item);
      setInputName(item.name);
    } else {
      setEditItem(undefined);
      setInputName("");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="Ion-title">Unisa Produccion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>

        <div className="ion-text-center ion-padding ">
          <h3>Prueba Crud</h3>
        </div>

        {editItem ? (
          <IonItem>
            <IonInput
              type="text"
              value={inputName}
              onIonInput={(e) => setInputName(e.target.value as string)}
            ></IonInput>
            <IonButton onClick={() => doEditItem(undefined)}>
              Cancelar
            </IonButton>
            <IonButton onClick={updateItem}>UPDATE</IonButton>
          </IonItem>
        ) : (
          <IonItem>
            <IonInput
              type="text"
              value={inputName}
              onIonInput={(e) => setInputName(e.target.value as string)}
            ></IonInput>
            <IonButton
              size="default"
              color={"success"}
              slot="end"
              onClick={addItem}
              disabled={inputName.trim() === ""}
            >
              Agregar
            </IonButton>
          </IonItem>
        )}

        {items?.map((item) => (
          <IonItem key={item?.id}>
            <IonLabel className="ion-text-wrap">{item.name}</IonLabel>
            <IonButton
              size="default"
              color={"dark"}
              onClick={() => doEditItem(item)}
            >
              Editar
            </IonButton>
            <IonButton
              size="default"
              color={"danger"}
              onClick={() => confirmDelete(item.id)}
            >
              Eliminar
            </IonButton>
          </IonItem>
        ))}

        {items2?.map((item) => (
          <IonItem className="ion-text-center" key={item?.Id_Usuario}>
            <IonLabel className="ion-text-wrap">{item.Id_Usuario}</IonLabel>
            <IonLabel className="ion-text-wrap">{item.Nombre_Usuario}</IonLabel>
            <IonLabel className="ion-text-wrap">{item.Nombre_Rol}</IonLabel>
          </IonItem>
        ))}

        {ConfirmationAlert}
      </IonContent>
    </IonPage>
  );
};

export default Home;
