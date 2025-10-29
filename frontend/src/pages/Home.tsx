import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonButton,
  IonText,
  IonIcon
} from '@ionic/react';
import { homeOutline, leaf, calendarOutline, mapOutline, flowerOutline } from 'ionicons/icons';
import './Home.css'; // Asegúrate de tener tu archivo CSS para estilo

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/home">
              <IonIcon icon={homeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Bienvenido a CENZOO</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Contenido principal */}
        <div className="intro-container">
          <IonText>
            <h2>Bienvenido a CENZOO</h2>
            <p>Explora el maravilloso mundo de las especies, descubre su hábitat, agendar visitas, y mucho más.</p>
          </IonText>

          {/* Imagen o ilustración */}
          <img src="assets/img/welcome_image.png" alt="Bienvenida" className="welcome-image" />

          {/* Botones de navegación */}
          <div className="buttons-container">
            <IonButton routerLink="/especies" expand="full" color="primary">
              Ver Especies
            </IonButton>
            <IonButton routerLink="/agendar" expand="full" color="secondary">
              Agendar Visita
            </IonButton>
            <IonButton routerLink="/mapa" expand="full" color="tertiary">
              Ver Mapa
            </IonButton>
            <IonButton routerLink="/ambiente" expand="full" color="success">
              Explorar el Ambiente
            </IonButton>
          </div>

          {/* Sección breve sobre la app */}
          <IonText>
            <h3>¿Qué es CENZOO?</h3>
            <p>CENZOO es una plataforma interactiva para explorar la biodiversidad animal y ambiental. Te invitamos a conocer especies, sus hábitats y disfrutar de nuestras visitas guiadas.</p>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
