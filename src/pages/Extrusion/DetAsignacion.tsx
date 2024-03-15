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
import "./DetAsignaciom.css";
import DatosT from '../../components/extrusion/data/OrdenTrabajo'; 

const DetAsignacion: React.FC = () => {

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

 const {OrdenTrabajo} = DatosT();

 const {Id, Maquina, Detalle_Material, Foto, Estado, Hora} = OrdenTrabajo;

  return (
    // <IonPage ref={page}>
    //   <IonHeader>
    //     <IonToolbar>
    //       <IonTitle>Extrusión</IonTitle>
    //     </IonToolbar>
    //   </IonHeader>
    //   <IonContent ref={page}>
    <>
        <IonButton id="open-modal"  color={"dark"}>
          Modal Extrusion
        </IonButton>
        <IonModal
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

                  <IonButton expand="full" color={"success"}>
                    Aceptar
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
        </>
    //   </IonContent>
    // </IonPage>
  );
};

export default DetAsignacion;
