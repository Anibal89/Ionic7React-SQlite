import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Home.css";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../composables/useSQLiteDB";
import useServerDataSender from "../composables/useServerDataSender";

// Define la interfaz aquí, al principio de tu archivo Home.tsx
interface UserItem {
  id: string; // Asumiendo que el id es un string, ajusta según tu base de datos
  name: string;
}

const Home: React.FC = () => {
  const [items, setItems] = useState<UserItem[]>([]);
  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    if (initialized) {
      loadData();
    }
  }, [initialized]);

  const loadData = async () => {
    try {
      await performSQLAction(async (db: SQLiteDBConnection) => {
        const respSelect = await db.query(`SELECT * FROM users`);
        if (respSelect.values) {
          const loadedItems: UserItem[] = respSelect.values.map(
            (item: any) => ({
              id: item.id.toString(), // Convertimos el ID a string por seguridad
              name: item.name,
            })
          );
          setItems(loadedItems);
        }
      });
    } catch (error) {
      console.error("Error loading data:", error);
      setItems([]);
    }
  };

  // Usamos el hook aquí para enviar datos cada 30 segundos
  useServerDataSender({ items }, 30000);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Unisa Producción</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center ion-padding">
          <h3>Prueba Crud</h3>
          {items.map((item) => (
            <IonItem key={item.id}>
              <IonLabel>
                ID: {item.id}, Nombre: {item.name}
              </IonLabel>
            </IonItem>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
