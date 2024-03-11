import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonText,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import useSQLiteDB from "../composables/useSQLiteDB"; // Asegúrate de que la ruta sea correcta

const LoginPage: React.FC = () => {
  const [scannedCode, setScannedCode] = useState("");
  const { checkUserExists } = useSQLiteDB();
  const history = useHistory();

  const handleLogin = async () => {
    const userExists = await checkUserExists(scannedCode);
    if (userExists) {
      history.push('/welcome'); // Redirige al usuario si existe
    } else {
      alert('Usuario no encontrado o código incorrecto.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <IonIcon
            icon={personCircleOutline}
            style={{ fontSize: "120px", marginBottom: "20px" }}
          />
          <IonText>
            <h2 style={{ textAlign: "center" }}>Escanea tu código QR</h2>
            <p style={{ textAlign: "center" }}>Guatemala, City</p>
          </IonText>
          <IonItem
            lines="none"
            style={{ marginTop: "20px", width: "100%", maxWidth: "500px" }}
          >
            <IonInput
              value={scannedCode}
              placeholder="Ingresa el código aquí"
              onIonChange={(e) => setScannedCode(e.detail.value!)}
            />
          </IonItem>
          <IonButton
            expand="block"
            style={{ marginTop: "20px", maxWidth: "500px", width: "100%" }}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
