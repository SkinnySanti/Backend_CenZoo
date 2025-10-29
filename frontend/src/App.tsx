import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  homeOutline,
  leaf,
  calendarOutline,
  flowerOutline,
  mapOutline
} from 'ionicons/icons';

/* --- 1. Importar las páginas --- */
import Home from './pages/Home';            // Página de bienvenida o inicio
import AgendarVisita from './pages/agendarvisita';  // Página de agendar visita
import Ambiente from './pages/Ambiente';    // Página de ambiente
import Mapa from './pages/Mapa';            // Página de mapa
import Especies from './pages/Especies';   // Página de especies

/* --- 2. Importar estilos Ionic --- */
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
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        {/* --- Rutas --- */}
        <IonRouterOutlet>

          {/* Página de Inicio (Home) */}
          <Route path="/home" exact>
            <Home />
          </Route>

          {/* Página Agendar */}
          <Route path="/agendar" exact>
            <AgendarVisita />
          </Route>

          {/* Página Ambiente */}
          <Route path="/ambiente" exact>
            <Ambiente />
          </Route>

          {/* Página Mapa */}
          <Route path="/mapa" exact>
            <Mapa />
          </Route>

          {/* Página Especies */}
          <Route path="/especies" exact>
            <Especies />
          </Route>

          {/* Redirección por defecto */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        {/* --- Barra inferior de pestañas --- */}
        <IonTabBar slot="bottom">

          {/* Botón para Inicio */}
          <IonTabButton tab="inicio" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>

          {/* Botón para Especies */}
          <IonTabButton tab="especies" href="/especies">
            <IonIcon icon={leaf} />
            <IonLabel>Especies</IonLabel>
          </IonTabButton>

          {/* Botón para Agendar */}
          <IonTabButton tab="agendar" href="/agendar">
            <IonIcon icon={calendarOutline} />
            <IonLabel>Agendar</IonLabel>
          </IonTabButton>

          {/* Botón para Ambiente */}
          <IonTabButton tab="ambiente" href="/ambiente">
            <IonIcon icon={flowerOutline} />
            <IonLabel>Ambiente</IonLabel>
          </IonTabButton>

          {/* Botón para Mapa */}
          <IonTabButton tab="mapa" href="/mapa">
            <IonIcon icon={mapOutline} />
            <IonLabel>Mapa</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;


