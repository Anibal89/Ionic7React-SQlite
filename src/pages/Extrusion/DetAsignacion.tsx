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
import { Redirect, useHistory } from "react-router";

//Typado de Estado

interface estadoModal {
  estado: boolean;
  islogin: boolean;
  setIslogin: () => void;
  userName: string;
}

const DetAsignacion: React.FC<estadoModal> = ({
  estado,
  islogin,
  setIslogin,
  userName,
}) => {
  // Estado para validar si esta logueado

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  const history = useHistory();

  function dismiss() {
    setIslogin();
    modal.current?.dismiss();
    history.push("/");
  }

  function dismiss2() {
    modal.current?.dismiss();
    history.push("/");
  }

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  async function canDismiss(data?: any, role?: string) {
    return role !== "gesture";
  }

  //Consumo de datos

  const { OrdenTrabajo } = DatosT();

  const { Id, Maquina, Detalle_Material, Foto, Estado, Hora } = OrdenTrabajo;

  console.log("El estado logeado es es:" + islogin + " estado: " + estado);

  return (
    <>
      <IonModal
        isOpen={estado}
        ref={modal}
        onClick={canDismiss}
        presentingElement={presentingElement!}
        className="custom-modal"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Operacion Extrusion</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => dismiss2()}>
                <IonIcon icon={close} color="danger"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {islogin ? (
            <IonGrid
              className="ion-text-center"
              style={{
                // margin: "auto",
                marginTop: "50vh",
                transform: "translateY(-70%)",
                
              }}
            >
              <IonRow className="ion-justify-content-center boxRow" >
                <IonCol size="auto">
                  <IonButton onClick={dismiss} color={"light"} className="Box-Button">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <IonText>Devolver Material</IonText>
                      <img
                        src="https://i.postimg.cc/3RC6MRxV/pngwing-com-6.png"
                        alt="close"
                        style={{ width: "90px", marginTop: "5px" }}
                      />
                    </div>
                  </IonButton>
                </IonCol>

                <IonCol size="auto">
                  <IonButton onClick={dismiss} color={"medium"} className="Box-Button">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <IonText>Medidas Asignadas </IonText>
                      <img
                        src="https://i.postimg.cc/52yyrWjx/pngegg-1.png"
                        alt="close"
                        style={{ width: "90px", marginTop: "5px" }}
                      />
                    </div>
                  </IonButton>
                </IonCol>
                

                <IonCol size="auto">
              
                    <IonButton onClick={dismiss} color={"medium"} className="Box-Button">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <IonText>Registrar Bobina</IonText>
                        <img
                          src="https://i.postimg.cc/9XPVVmkW/pngwing-com-5.png"
                          alt="close"
                          style={{ width: "106px", marginTop: "5px" }}
                        />
                      </div>
                    </IonButton>
                    
                </IonCol>

                <IonCol size="auto">
                  <IonButton onClick={dismiss} color={"light"} className="Box-Button">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <IonText>Cerrar Jornada</IonText>
                      <img
                        src="https://i.postimg.cc/C5CwQY3x/pngwing-com-4.png"
                        alt="close"
                        style={{ width: "90px", marginTop: "5px" }}
                      />
                    </div>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
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
                          border:'3px solid black'
                          ,
                        }}
                      />
                      <IonCardHeader>
                        <IonCardTitle>{userName}</IonCardTitle>
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
                    onClick={() => dismiss()}
                    expand="full"
                    color={"success"}
                  >
                    Aceptar
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default DetAsignacion;
