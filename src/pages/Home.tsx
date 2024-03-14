import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonList } from "@ionic/react";
import "./Home.css";
import useSQLiteDB from "../composables/useSQLiteDB";
import useServerDataSender from "../composables/useServerDataSender";
import useConfirmationAlert from "../composables/useConfirmationAlert"; 


interface UserItem {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [items, setItems] = useState<UserItem[]>([]);
  const [userId, setUserId] = useState<number | ''>('');
  const [userName, setUserName] = useState('');
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
  }, [initialized]); // Se llama a fetchUsers cuando el componente se monta o se actualiza el estado initialized

  const handleSubmit = async () => {
    if (userId === '' || !userName) {
      console.error("Both ID and name are required");
      return;
    }
    try {
      await addUser(Number(userId), userName);
      setUserId('');
      setUserName('');
      await fetchUsers(); // Recarga los datos después de añadir un usuario
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  const handleDelete = (id: number) => {
    showConfirmationAlert(
      "Are you sure you want to delete this user?", // Mensaje de confirmación
      () => deleteUserConfirmed(id) // Acción a confirmar
    );
  };


  const deleteUserConfirmed = async (id: number) => {
    try {
      await deleteUser(id);
      await fetchUsers(); // Recarga los datos después de eliminar un usuario
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // useServerDataSender({ items }, 15000); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Unisa Producción</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonItem>
            <IonInput
              type="number"
              value={userId.toString()}
              onIonChange={(e) => setUserId(e.detail.value ? Number(e.detail.value) : '')}
              clearInput
              label="User ID:"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={userName}
              onIonChange={(e) => setUserName(e.detail.value!)}
              clearInput
              label="User Name:"
            ></IonInput>
          </IonItem>
          <IonButton expand="block" onClick={handleSubmit}>
            Add User
          </IonButton>
          <IonList>
            {items.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>
                  ID: {item.id}, Name: {item.name}
                </IonLabel>
                <IonButton onClick={() => handleDelete(item.id)} color="danger">
                  Delete
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </div>
        {ConfirmationAlert}
      </IonContent>
    </IonPage>
  );
};

export default Home;
