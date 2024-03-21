import React, { useEffect, useState } from 'react';
import {
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonAlert, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonItem, IonInput
} from '@ionic/react';
import DetAsignacion from './DetAsignacion';
import './css/ExtruderStatus.css';
import InvisibleLogin from '../../components/InvisibleLogin';
import { useHistory } from 'react-router';


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
  userB?:string;
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
  { id: 'M10', status: MachineStatus.InUse , userB:"Usuario 1" },
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
  { id: 'M53', status: MachineStatus.ParoCalidad },
  { id: 'M54', status: MachineStatus.InUse }
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


const ExtruderStatusPage: React.FC=() => {
  
  const [showDetAsignacion, setShowDetAsignacion] = useState<boolean>(false);
  const [userName, setuserName] = useState<string>("");

  const [islogin, setlogin] = useState<boolean>(false);

  const [filterStatus, setFilterStatus] = useState<MachineStatus | null>(null);
  const [showParoOptions, setShowParoOptions] = useState<boolean>(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [countdown, setCountdown] = useState(3); // Comenzará desde 3 segundos
  const [showMachineDetails, setShowMachineDetails] = useState<boolean>(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
  

  

  const handleLoginSuccess = (userName: string) => {
    setUserLoggedIn(true);
    setuserName(userName);
    setCountdown(3); // Reinicia el contador a 3 segundos
    const interval = setInterval(() => setCountdown(prev => prev - 1), 1000);
    setShowDetAsignacion(false);
    setAlertMessage(`✔️ Bienvenido al sistema, usuario ${userName}.`); // Cambiado para mostrar el userName
    setShowAlert(true);
    setTimeout(() => {
      clearInterval(interval); // Detiene el intervalo del contador
      setShowAlert(false);
      setShowDetAsignacion(true);
    }, 3000);
};


const handleLoginError = () => {
    setCountdown(3); // Establece el contador a 2 segundos para el error
    const interval = setInterval(() => setCountdown(prev => prev - 1), 1000);
    setAlertMessage("❌ Usuario no encontrado, intente nuevamente.");
    setShowAlert(true);
    setTimeout(() => {
      clearInterval(interval); // Detiene el intervalo del contador
      setShowAlert(false);
    }, 3000);
};

const setIslogin =()=>{
  setlogin(!islogin);
}

const history = useHistory();

const kirin = ()=>{
 history.push("/home")
}

// const kirin2 = ()=>{
//   setShowDetAsignacion(true);
// }

const openMachineDetails = (machine: Machine) => {
  setSelectedMachine(machine); // Establece la máquina seleccionada
  setShowMachineDetails(true); // Muestra el modal con los detalles
};

console.log("Estado Inicial que pasa al modal "+showDetAsignacion);


  return (
    <IonContent>
       <IonButton onClick={kirin} color={'dark'}>Ir Usuarios</IonButton>
       {/* <IonButton onClick={kirin2} color={'dark'}>login</IonButton> */}
           <InvisibleLogin onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError}/>
           <IonAlert
           isOpen={showAlert}
           onDidDismiss={() => setShowAlert(false)}
           header={userLoggedIn ? 'Inicio de Sesión' : 'Error'}
           message={alertMessage + ` Cerrando en ${countdown} segundos...`} // Asegúrate de que este cambio se refleje en tus mensajes
          //  buttons={['OK']}
          
            />
      {showDetAsignacion && <DetAsignacion estado={showDetAsignacion} setIslogin={setIslogin}  islogin={islogin}  userName={userName}  />}
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
        <IonCard onClick={() => openMachineDetails(machine)} color={getCardColor(machine.status)}>
          <IonCardHeader className="card-header-custom">
            <div className="machine-icon">
              <img src={"https://i.ibb.co/ZggmBMR/extrusora.png"} alt="Extrusora" style={{ width: '70px', marginRight: '10px' }} />
            </div>
            <IonCardTitle>Extrusora {machine.id}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Estado: {machine.status}
            {/* Agrega más detalles si son necesarios */}
          </IonCardContent>
        </IonCard>
      </IonCol>
    ))}
  </IonRow>
</IonGrid>


<IonModal isOpen={showMachineDetails} onDidDismiss={() => setShowMachineDetails(false)}>
  <IonContent className="ion-padding">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Detalles de la Máquina</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => setShowMachineDetails(false)}>Cerrar</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    {selectedMachine && (
      <div style={{ textAlign: 'center' }}>
        <img src={'https://i.ibb.co/ZggmBMR/extrusora.png'} alt="Extrusora" style={{ width: '150px', margin: '20px auto' }} />
        <h2>Extrusora {selectedMachine.id}</h2>
        <p><strong>ID:</strong> {selectedMachine.id}</p>
        <p><strong>Estado:</strong> {selectedMachine.status}</p>
       
        {selectedMachine.id==="M10" ? <p><strong>Nombre:</strong>{userName}</p>: <></>}
       
        {/* Agrega más detalles según sea necesario */}
      </div>
    )}
  </IonContent>
</IonModal>

    </IonContent>
  );
};

export default ExtruderStatusPage;
