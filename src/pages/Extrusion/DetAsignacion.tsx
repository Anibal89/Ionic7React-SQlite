import React, { useEffect, useState, useRef } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from "@ionic/react";

import { close } from "ionicons/icons";
import DatosT from "./components/data/OrdenTrabajo";
import "./css/DetAsignaciom.css";

import { optionsOutline, exitOutline } from "ionicons/icons";

//Typado de Estado

const DetAsignacion: React.FC = () => {
  //Estado de Renderizado

  const [estado, setEstado] = useState<boolean>(false);

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  async function canDismiss(data?: any, role?: string) {
    return role !== "gesture";
  }

  //Consumo de datos

  const { OrdenTrabajo } = DatosT();

  const { Id, Maquina, Detalle_Material, Foto, Estado, Hora } = OrdenTrabajo;

  console.log(estado);

  return (
    <>
      {/* <IonButton id="open-modal" color={"dark"}>
        Modal Extrusion
      </IonButton> */}
      {!estado ? (
        <IonModal
          isOpen={estado}
          ref={modal}
          trigger="open-modal"
          canDismiss={canDismiss}
          presentingElement={presentingElement!}
          className="custom-modal"
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalle Extrusion</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>
                  <IonIcon icon={close} color="danger"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {/* Contenido de la  Card Ionic*/}
            <IonGrid className="ion-padding">
              <IonRow style={{ columnGap: "2rem" }}>
                <IonCol>
                  <IonRow className="ion-justify-content-center">
                    <IonCard
                      className="ion-text-center IonCardDate"
                      color={"light"}
                    >
                      <img
                        src={Foto}
                        alt="operador"
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%",
                          width: "200px",
                          height: "200px",
                          marginTop: "2rem",
                        }}
                      />
                      <IonCardHeader>
                        <IonCardTitle>Israel de leon</IonCardTitle>
                        <IonCardSubtitle>Extrusion</IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent></IonCardContent>
                    </IonCard>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <IonCard className="IonCardDate" color={"light"}>
                      <IonCardContent>
                        <IonText color="dark">
                          <h2>
                            Estado:{" "}
                            <span style={{ color: "green" }}>{Estado}</span>
                          </h2>
                        </IonText>
                        <br />
                        <IonText color="dark">
                          <h2>Maquina: {Maquina}</h2>
                        </IonText>
                        <br />
                        <IonText color="dark">
                          <h2>Hora: {Hora}</h2>
                        </IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonRow>
                </IonCol>

                <IonCol>
                  <p className="ion-text-center">Detalle Material</p>
                  <div className="ion-margin-bottom ion-margin-top">
                    <p>Correlativo: #{Detalle_Material.Id}</p>
                  </div>

                  <div style={{ backgroundColor: "#000", color: "#fff" }}>
                    <IonRow className="ion-text-center">
                      <IonCol>Nombre Material</IonCol>
                      <IonCol>Cantidad</IonCol>
                      <IonCol>Peso Lb</IonCol>
                    </IonRow>
                  </div>

                  <IonList>
                    {Detalle_Material.Material.map((item) => (
                      <IonItem
                        key={item.Id_Material}
                        className="ion-text-center"
                      >
                        <IonLabel>{item.Nombre_Material}</IonLabel>
                        <IonLabel>{item.Cantidad_Sacos}</IonLabel>
                        <IonLabel>{item.Peso_Libras}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                  <IonRow>
                    <IonCol offset="8">
                      <IonLabel class="">
                        Cantidad Sacos: {Detalle_Material.Total_Sacos}
                      </IonLabel>
                      <br></br>
                      <br></br>
                      <IonLabel>
                        Peso Total: {Detalle_Material.Total + " Lb"}
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                  <br></br>

                  <IonButton
                    onClick={() => setEstado(true)}
                    expand="full"
                    color={"success"}
                  >
                    Aceptar
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      ) : (
        <IonModal
          isOpen={estado}
          ref={modal}
          trigger="open-modal"
          canDismiss={canDismiss}
          presentingElement={presentingElement!}
          className="custom-modal"
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalle Extrusion</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>
                  <IonIcon icon={close} color="danger"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid
              className="ion-text-center"
              style={{
                margin: "auto",
                marginTop: "50vh",
                transform: "translateY(-50%)",
              }}
            >
              <IonRow className="ion-justify-content-center">
              <IonCol size="auto">
                  <IonButton onClick={dismiss} color={"light"}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <IonText>Devolver Material</IonText>
                      <img
                        src="https://files.signuscorp.com/?business=1&file=MTY1Zjg4ODU3NDkyNDM="
                        alt="close"
                        style={{ width: "25px", marginRight: "10px"}}
                      />
                    </div>
                  </IonButton>
                </IonCol>

                <IonCol size="auto">
                  <IonButton onClick={dismiss} color={"medium"}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <IonText>Registrar Bobina</IonText>
                      <img
                        src="https://files.signuscorp.com/?business=1&file=MTY1Zjg4NjZhNzA5MDk="
                        alt="close"
                        style={{ width: "30px", marginRight: "10px"}}
                      />
                    </div>
                  </IonButton>
                </IonCol>

                <IonCol size="auto">
                  <IonButton onClick={dismiss} color={"light"}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <IonText>Salir</IonText>
                      <img
                        src="https://files.signuscorp.com/?business=1&file=MTY1Zjg4NDQxOGM4NDY="
                        alt="close"
                        style={{ width: "25px", marginRight: "10px" }}
                      />
                    </div>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      )}
    </>
    //   </IonContent>
    // </IonPage>
  );
};

export default DetAsignacion;
