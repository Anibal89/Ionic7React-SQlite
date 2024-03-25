import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ItemDespacho from './components/ItemDespacho';
import { personCircleOutline } from 'ionicons/icons';
import DespachoData from './data/DespachoData';
import Pagination from '../../components/Pagination'; 

const Bodega: React.FC = () => {
  const { Despacho } = DespachoData();


  // Paginado

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Despacho.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = Despacho.slice(startIndex, endIndex);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="usuario_bodega">
            <IonTitle>Bodega Extrusion 1</IonTitle>
            <IonText>Jhon Doe</IonText>
            <IonIcon style={{ fontSize: '40px' }} icon={personCircleOutline}></IonIcon>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonSearchbar placeholder="Buscar maquina"></IonSearchbar>

        {currentPageItems.map((item) => (
          <IonCard key={item.Id}>
            <IonCardContent>
              {/* contenido */}
              <ItemDespacho {...item} />
            </IonCardContent>
          </IonCard>
        ))}

        {/* Componente de paginación */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPrevPageClick={prevPage}
          onNextPageClick={nextPage}
          onPageClick={goToPage}
        />
      </IonContent>
    </IonPage>
  );
};

export default Bodega;