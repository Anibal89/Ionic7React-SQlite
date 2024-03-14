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
} from "@ionic/react";

import { close } from "ionicons/icons";
import "./DetAsignaciom.css";

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

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Extrusión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
      >
        <IonButton id="open-modal" expand="block" color={"dark"}>
          Iniciar sesion
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
              <IonTitle>Detalle</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>
                  <IonIcon icon={close} color="danger"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Contenido del Modal</p>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default DetAsignacion;
