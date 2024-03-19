import React, { useState, useEffect } from 'react';
import useSQLiteDB from '../composables/useSQLiteDB';

type Props = {
  onLoginSuccess: (userId: string) => void;
  onLoginError: () => void;
};

const InvisibleLogin: React.FC<Props> = ({ onLoginSuccess, onLoginError }) => {
  const [buffer, setBuffer] = useState<string>('');
  const [lastKeyTime, setLastKeyTime] = useState<Date>(new Date());
  const { checkUserExists, initialized } = useSQLiteDB();

  useEffect(() => {
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
            checkUserExists(userId).then(exists => {
              if (exists) {
                onLoginSuccess(buffer); // Deja que el componente padre maneje la alerta
              } else {
                onLoginError(); // Deja que el componente padre maneje la alerta
              }
              setBuffer('');
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
  }, [buffer, lastKeyTime, initialized, onLoginSuccess, onLoginError, checkUserExists]);

  return (
    <input
      type="text"
      value={buffer}
      readOnly
      style={{ backgroundColor: '#fff', border: "none", color: '#000'}} // Ajusta el estilo según necesites
    />
  );
};

export default InvisibleLogin;
