import React, { useState, useEffect } from 'react';
import useSQLiteDB from '../composables/useSQLiteDB';

type Props = {
  onLoginSuccess: (userId: string) => void;
  onLoginError: () => void;
};

const InvisibleLogin: React.FC<Props> = ({ onLoginSuccess, onLoginError }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [buffer, setBuffer] = useState<string>('');
  const { checkUserExists, initialized } = useSQLiteDB();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buffer) {
        setInputValue(buffer);
        setBuffer('');
      }
    }, 500); // Ajusta este tiempo según sea necesario

    return () => clearTimeout(timer);
  }, [buffer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (initialized) {
          const userId = parseInt(inputValue, 10);
          if (!isNaN(userId)) {
            checkUserExists(userId).then(exists => {
              if (exists) {
                onLoginSuccess(inputValue);
              } else {
                onLoginError();
              }
              setInputValue('');
            });
          } else {
            onLoginError();
            setInputValue('');
          }
        }
      } else {
        setBuffer((prev) => prev + event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue, initialized, onLoginSuccess, onLoginError, checkUserExists]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      // style={{ color: 'white', backgroundColor: 'black', visibility: 'hidden' }} // Modifica la visibilidad según necesites
      autoFocus
    />
  );
};

export default InvisibleLogin;
