import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { key, personCircle } from "ionicons/icons";
import "./Home.css";
import useSQLiteDB from "../composables/useSQLiteDB";
import useServerDataSender from "../composables/useServerDataSender";
import useConfirmationAlert from "../composables/useConfirmationAlert";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

interface UserItem {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [items, setItems] = useState<UserItem[]>([]);
  const [userId, setUserId] = useState<number | "">("");
  const [userName, setUserName] = useState("");
  const { initialized, addUser, deleteUser, loadData } = useSQLiteDB();
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  const fetchUsers = async () => {
    if (initialized) {
      const loadedItems = await loadData();
      setItems(loadedItems);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [initialized]);

  const handleSubmit = async () => {
    if (userId === "" || !userName) {
      console.error("Both ID and name are required");
      return;
    }
    try {
      await addUser(Number(userId), userName);
      setUserId("");
      setUserName("");
      await fetchUsers();
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  const handleDelete = (id: number) => {
    showConfirmationAlert(
      "Are you sure you want to delete this user?",
      () => deleteUserConfirmed(id)
    );
  };

  const deleteUserConfirmed = async (id: number) => {
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Unisa Producción Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
      <a
          style={{
            padding: "4px 25px",
            background: "black",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none",
            border: "1px solid black",
          }}
          href="/ExtruderStatusPage"
        >
          Regresar
        </a>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              {/* Formulario de inicio de sesión */}
              <IonTitle className="ion-text-center">Agregar Usuario</IonTitle>
              <IonItem>
                <IonIcon slot="start" icon={key} />
                <IonLabel position="floating">ID Usuario:</IonLabel>
                <IonInput
                  type="number"
                  value={userId.toString()}
                  onIonChange={(e) => setUserId(e.detail.value ? Number(e.detail.value) : "")}
                  clearInput
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonIcon slot="start" icon={personCircle} />
                <IonLabel position="floating">Nombre Usuario:</IonLabel>
                <IonInput
                  value={userName}
                  onIonChange={(e) => setUserName(e.detail.value!)}
                  clearInput
                ></IonInput>
              </IonItem>

              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
               <IonButton size="small" onClick={handleSubmit}>Añadir Usuario</IonButton>
              </div>

            </IonCol>

            <IonCol size="6">
              {/* Listado de usuarios */}
              <IonTitle className="ion-text-center">Lista De Usuarios</IonTitle>
              <IonList>
                {items.map((item) => (
                  <IonItem key={item.id}>
                    <IonLabel>
                      <strong>ID:</strong> {item.id}, <strong>Nombre:</strong> {item.name}
                    </IonLabel>
                    <IonButton onClick={() => handleDelete(item.id)} color="danger">
                      Eliminar
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
        {ConfirmationAlert}
      </IonContent>
    </IonPage>
  );
};

export default Home;
