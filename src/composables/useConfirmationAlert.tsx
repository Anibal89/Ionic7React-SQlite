import React, { useState } from "react";
import { IonAlert } from "@ionic/react";

const useConfirmationAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // Mantén confirmAction como una función opcional que no retorna nada.
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const showConfirmationAlert = (message: string, onConfirm: () => void) => {
    setAlertMessage(message);
    // Asigna directamente la función onConfirm a confirmAction.
    setConfirmAction(() => onConfirm);
    setShowAlert(true);
  };

  const handleConfirm = () => {
    // Ejecuta la acción de confirmación si existe.
    if (confirmAction) {
      confirmAction();
    }
    setShowAlert(false);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  return {
    showConfirmationAlert,
    ConfirmationAlert: (
      <IonAlert
        isOpen={showAlert}
        message={alertMessage}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: handleCancel,
          },
          {
            text: "Confirm",
            handler: handleConfirm,
          },
        ]}
      />
    ),
  };
};

export default useConfirmationAlert;
