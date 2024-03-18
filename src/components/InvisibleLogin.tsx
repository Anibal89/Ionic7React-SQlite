import React, { useState, useEffect } from 'react';
import useSQLiteDB from '../composables/useSQLiteDB';
import useConfirmationAlert from '../composables/useConfirmationAlert'; // Asegúrate de que la ruta sea correcta

type Props = {
  onLoginSuccess: (userId: string) => void;
  onLoginError: () => void;
};

const InvisibleLogin: React.FC<Props> = ({ onLoginSuccess, onLoginError }) => {
  const [buffer, setBuffer] = useState<string>('');
  const [lastKeyTime, setLastKeyTime] = useState<Date>(new Date());
  const { checkUserExists, initialized } = useSQLiteDB();
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyTime = new Date();
      const diff = keyTime.getTime() - lastKeyTime.getTime();

      // Consideramos que una entrada es de un escáner si las teclas se presionan dentro de un intervalo de 550 ms
      if (diff < 550) {
        setBuffer(prev => prev + event.key);
      } else {
        // Si la entrada es lenta, reinicia el buffer
        setBuffer(event.key);
      }

      // Actualiza el tiempo de la última tecla presionada
      setLastKeyTime(keyTime);

      if (event.key === 'Enter' && buffer) {
        if (initialized) {
          const userId = parseInt(buffer, 10);
          if (!isNaN(userId)) {
            checkUserExists(userId).then(exists => {
              if (exists) {
                onLoginSuccess(buffer);
                // Muestra un mensaje de bienvenida si el usuario existe
                showConfirmationAlert(`Bienvenido al sistema, usuario ${buffer}.`, () => {});
              } else {
                onLoginError();
                // Muestra un mensaje de error si el usuario no existe
                showConfirmationAlert("Usuario no encontrado, intente nuevamente.", () => {});
              }
              setBuffer(''); // Reinicia el buffer después de un intento
            });
          } else {
            onLoginError();
            setBuffer('');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [buffer, lastKeyTime, initialized, onLoginSuccess, onLoginError, checkUserExists, showConfirmationAlert]);

  // El input y la alerta de confirmación se muestran en la interfaz de usuario
  return (
    <>
      <input
        type="text"
        value={buffer}
        readOnly
        style={{ backgroundColor: '#fff', border: "none", color: '#fff'}} // Ajusta el estilo según necesites
      />
      {ConfirmationAlert}
    </>
  );
};

export default InvisibleLogin;
