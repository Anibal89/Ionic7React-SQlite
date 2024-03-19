import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import ExtruderStatusPage from './pages/Extrusion/ExtruderStatusPage'; // Asegúrate de que esta línea esté descomentada y correcta

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
// import './theme/variables.css';
import DetAsignacion from './pages/Extrusion/DetAsignacion';

setupIonicReact();
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/welcome">
          <WelcomePage /> 
        </Route>
        <Route exact path="/ExtruderStatusPage">
          <ExtruderStatusPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/ExtruderStatusPage"/>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;