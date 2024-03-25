import React from 'react';
import { IonButton } from '@ionic/react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPrevPageClick: () => void;
  onNextPageClick: () => void;
  onPageClick: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPrevPageClick,
  onNextPageClick,
  onPageClick,
}) => {
  const renderPageOptions = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <IonButton key={i} color={currentPage === i ? 'light' : 'medium'} onClick={() => onPageClick(i)}>
          {i}
        </IonButton>
      );
    }

    return pages;
  };

  return (
    <div className="Paginado">
      <IonButton onClick={onPrevPageClick} disabled={currentPage === 1}>
        Anterior
      </IonButton>
      {renderPageOptions()}
      <IonButton onClick={onNextPageClick} disabled={currentPage === totalPages}>
        Siguiente
      </IonButton>
    </div>
  );
};

export default Pagination;