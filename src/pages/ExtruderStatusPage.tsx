import React, { useState } from 'react';
import {
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from '@ionic/react';
import './ExtruderStatus.css';

enum MachineStatus {
  Available = 'available',
  InUse = 'in use',
  ParoElectrico = 'paro electrico',
  ParoMecanico = 'paro mecanico',
  ParoCalidad = 'paro calidad',
  ParoInsumos = 'paro insumos'
}

type Machine = {
  id: string;
  status: MachineStatus;
}

const machines: Machine[] = [
  { id: 'M1', status: MachineStatus.Available },
  { id: 'M2', status: MachineStatus.InUse },
  { id: 'M3', status: MachineStatus.ParoElectrico },
  { id: 'M4', status: MachineStatus.Available },
  { id: 'M5', status: MachineStatus.ParoMecanico },
  { id: 'M6', status: MachineStatus.InUse },
  { id: 'M7', status: MachineStatus.Available },
  { id: 'M8', status: MachineStatus.ParoCalidad },
  { id: 'M9', status: MachineStatus.Available },
  { id: 'M10', status: MachineStatus.InUse },
  { id: 'M11', status: MachineStatus.ParoInsumos },
  { id: 'M12', status: MachineStatus.Available },
  { id: 'M13', status: MachineStatus.ParoElectrico },
  { id: 'M14', status: MachineStatus.InUse },
  { id: 'M15', status: MachineStatus.ParoMecanico },
  { id: 'M16', status: MachineStatus.Available },
  { id: 'M17', status: MachineStatus.InUse },
  { id: 'M18', status: MachineStatus.ParoCalidad },
  { id: 'M19', status: MachineStatus.Available },
  { id: 'M20', status: MachineStatus.InUse },
  { id: 'M21', status: MachineStatus.ParoInsumos },
  { id: 'M22', status: MachineStatus.Available },
  { id: 'M23', status: MachineStatus.ParoElectrico },
  { id: 'M24', status: MachineStatus.InUse },
  { id: 'M25', status: MachineStatus.Available },
  { id: 'M26', status: MachineStatus.ParoMecanico },
  { id: 'M27', status: MachineStatus.InUse },
  { id: 'M28', status: MachineStatus.Available },
  { id: 'M29', status: MachineStatus.ParoCalidad },
  { id: 'M30', status: MachineStatus.InUse },
  { id: 'M31', status: MachineStatus.Available },
  { id: 'M32', status: MachineStatus.ParoInsumos },
  { id: 'M33', status: MachineStatus.InUse },
  { id: 'M34', status: MachineStatus.Available },
  { id: 'M35', status: MachineStatus.ParoElectrico },
  { id: 'M36', status: MachineStatus.InUse },
  { id: 'M37', status: MachineStatus.Available },
  { id: 'M38', status: MachineStatus.ParoMecanico },
  { id: 'M39', status: MachineStatus.InUse },
  { id: 'M40', status: MachineStatus.Available },
  { id: 'M41', status: MachineStatus.ParoCalidad },
  { id: 'M42', status: MachineStatus.InUse },
  { id: 'M43', status: MachineStatus.Available },
  { id: 'M44', status: MachineStatus.ParoInsumos },
  { id: 'M45', status: MachineStatus.InUse },
  { id: 'M46', status: MachineStatus.Available },
  { id: 'M47', status: MachineStatus.ParoElectrico },
  { id: 'M48', status: MachineStatus.InUse },
  { id: 'M49', status: MachineStatus.Available },
  { id: 'M50', status: MachineStatus.ParoMecanico },
  { id: 'M51', status: MachineStatus.InUse },
  { id: 'M52', status: MachineStatus.Available },
  { id: 'M53', status: MachineStatus.ParoCalidad }
];


const getCardColor = (status: MachineStatus): string => {
  switch (status) {
    case MachineStatus.Available: return 'success';
    case MachineStatus.InUse: return 'danger';
    case MachineStatus.ParoElectrico: return 'dark';
    case MachineStatus.ParoMecanico: return 'tertiary';
    case MachineStatus.ParoCalidad: return 'secondary';
    case MachineStatus.ParoInsumos: return 'primary';
    default: return 'medium';
  }
};

const ExtruderStatusPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<MachineStatus | null>(null);
  const [showParoOptions, setShowParoOptions] = useState<boolean>(false);

  // Filtramos las máquinas basándonos en si se seleccionó un estado específico o si estamos viendo todos los paros.
  let filteredMachines: Machine[] = [];
  if (filterStatus) {
    filteredMachines = machines.filter(machine => machine.status === filterStatus);
  } else if (!showParoOptions) {
    // Mostrar todas las máquinas si no se ha seleccionado "Paro" o algún filtro de estado específico.
    filteredMachines = machines;
  } else {
    // Cuando se selecciona "Paro" pero no un tipo específico, mostramos todas las máquinas en cualquier estado de paro.
    filteredMachines = machines.filter(machine => 
      machine.status === MachineStatus.ParoElectrico || 
      machine.status === MachineStatus.ParoMecanico || 
      machine.status === MachineStatus.ParoCalidad || 
      machine.status === MachineStatus.ParoInsumos);
  }

  return (
    <IonContent>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <IonButton color="medium" className="filter-button" onClick={() => { setFilterStatus(null); setShowParoOptions(false); }}>Todos</IonButton>
        <IonButton color="success" className="filter-button" onClick={() => { setFilterStatus(MachineStatus.Available); setShowParoOptions(false); }}>Disponibles</IonButton>
        <IonButton color="danger" className="filter-button" onClick={() => { setFilterStatus(MachineStatus.InUse); setShowParoOptions(false); }}>En Uso</IonButton>
        <IonButton color="warning" className="filter-button" onClick={() => { setFilterStatus(null); setShowParoOptions(true); }}>Paro</IonButton>
      </div>

      {showParoOptions && (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <IonButton color="dark" className="filter-button" onClick={() => setFilterStatus(MachineStatus.ParoElectrico)}>Eléctrico</IonButton>
          <IonButton color="tertiary" className="filter-button" onClick={() => setFilterStatus(MachineStatus.ParoMecanico)}>Mecánico</IonButton>
          <IonButton color="secondary" className="filter-button" onClick={() => setFilterStatus(MachineStatus.ParoCalidad)}>Calidad</IonButton>
          <IonButton color="primary" className="filter-button" onClick={() => setFilterStatus(MachineStatus.ParoInsumos)}>Insumos</IonButton>
        </div>
      )}

      <IonGrid>
        <IonRow>
          {filteredMachines.map((machine, index) => (
            <IonCol key={index} size="6" size-md="3" size-lg="2">
              <IonCard color={getCardColor(machine.status)}>
                <IonCardHeader className="card-header-custom">
                  <div className="machine-icon">
                    <img src="https://i.ibb.co/ZggmBMR/extrusora.png" alt="Extrusora" style={{ width: '70px', marginRight: '10px' }} />
                  </div>
                  <IonCardTitle>Extrusora {machine.id}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {/* Detalles adicionales si son necesarios */}
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default ExtruderStatusPage;