import React, { useState, useEffect } from 'react';
import useSQLiteDB from '../composables/useSQLiteDB';

type Props = {
  onLoginSuccess: (userName: string) => void;
  onLoginError: () => void;
  isUserLoggedIn: boolean; // Agrega esta línea para recibir el nuevo prop
};

const InvisibleLogin: React.FC<Props> = ({ onLoginSuccess, onLoginError, isUserLoggedIn }) => {
  const [buffer, setBuffer] = useState<string>('');
  const [lastKeyTime, setLastKeyTime] = useState<Date>(new Date());
  const { checkUserExists, initialized } = useSQLiteDB();

  useEffect(() => {
    if (isUserLoggedIn) return; // No ejecutar si el usuario ya está logueado

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyTime = new Date();
      const diff = keyTime.getTime() - lastKeyTime.getTime();

      if (diff < 550) {
        setBuffer(prev => prev + event.key);
      } else {
        setBuffer(event.key);
      }

      setLastKeyTime(keyTime);

      if (event.key === 'Enter' && buffer) {
        if (initialized) {
          const userId = parseInt(buffer, 10);
          if (!isNaN(userId)) {
            checkUserExists(userId).then(({ exists, userName }) => {
              if (exists && userName) {
                onLoginSuccess(userName); // Pasa el nombre de usuario
              } else {
                onLoginError(); // Maneja el error
              }
              setBuffer(''); // Limpia el buffer
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
  }, [buffer, lastKeyTime, initialized, onLoginSuccess, onLoginError, checkUserExists, isUserLoggedIn]); // Añade isUserLoggedIn a las dependencias del useEffect

  return (
    <input
      type="text"
      value={buffer}
      readOnly
      style={{ backgroundColor: '#fff', border: "none", color: '#fff'}} // Ajusta el estilo según necesites
    />
  );
};

export default InvisibleLogin;
