import React, { useState } from "react";

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  checkmarkCircleOutline,
  close,
  documentTextOutline,
} from "ionicons/icons";
import "../css/Bodega.css";
import { Despacho } from "../interfaces/interfaces";

const ItemDespacho: React.FC<Despacho> = ({
  Id,
  Maquina,
  Nombre,
  Detalle_Material,
}) => {
  const { Material, Id_detalle,Total,Total_Sacos } = Detalle_Material;

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const verDetalle = () => {
    return setOpen(true);
  };

  const Entregar = () => {
    return setOpen2(true);
  };

  return (
    <>
      <IonGrid>
        <IonRow key={Id}>
          <IonCol>
            <IonText color={"dark"}>Numero Orden:</IonText> {Id}
          </IonCol>
          <IonCol>
            <IonText color={"dark"}>Maquina Extrusora: </IonText>
            {Maquina}
          </IonCol>
          <IonCol>
            <IonText color={"dark"}>Operador: </IonText> {Nombre}
          </IonCol>
          <IonButton onClick={verDetalle} color={"dark"}>
            <IonIcon icon={documentTextOutline}></IonIcon>
          </IonButton>
          <IonButton onClick={Entregar} color={"success"}>
            <IonIcon icon={checkmarkCircleOutline}></IonIcon>
          </IonButton>
        </IonRow>
      </IonGrid>

      {/* Ventana Modal*/}

      <IonModal className="Modal_Bodega" isOpen={open}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Detalle de Material</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setOpen(false)}>
                <IonIcon icon={close}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
            
                <p>Correlativo: #{Id_detalle}</p>
                <div style={{ backgroundColor: "#000", color: "#fff" }}>
                  <IonRow className="ion-text-center">
                    <IonCol>Nombre Material</IonCol>
                    <IonCol>Cantidad</IonCol>
                    <IonCol>Peso Lb</IonCol>
                  </IonRow>
                </div>

                <IonList>
                  {Material.map((item) => (
                    <IonItem key={item.Id_Material} className="ion-text-center">
                      <IonLabel>{item.Nombre_Material}</IonLabel>
                      <IonLabel>{item.Cantidad_Sacos}</IonLabel>
                      <IonLabel>{item.Peso_Libras}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
                <IonRow>
                  <IonCol offset="9">
                    <IonLabel>
                      Cantidad Sacos: {Total_Sacos}
                    </IonLabel> 
                    <br></br>
                    <br></br>
                    <IonLabel>
                      Peso Total: {Total + " Lb"}
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>

      {/* Ventana Modal para aceptar*/}

      <IonModal className="Modal_Bodega2" isOpen={open2}>
        <IonHeader>
          <IonToolbar>
            <IonTitle class="ion-text-center">Confirmacion</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setOpen2(false)}>
                <IonIcon icon={close}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" class="ion-text-center">
          <p>Esta Seguro de realizar esta operacion ?</p>

          <div className="contentb">
            <IonButton color={"danger"}>Cancelar</IonButton>

            <IonButton color={"success"}>aceptar</IonButton>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};
export default ItemDespacho;
