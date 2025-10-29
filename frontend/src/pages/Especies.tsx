import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonTitle, 
  IonIcon, 
  IonContent, 
  IonSearchbar, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonText, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardContent, 
  IonChip, 
  IonFooter, 
  IonTabBar, 
  IonTabButton 
} from '@ionic/react';
import { 
  notificationsOutline, 
  searchOutline, 
  optionsOutline, 
  homeOutline, 
  leaf, 
  calendarOutline, 
  flowerOutline, 
  mapOutline 
} from 'ionicons/icons';
import './Home.css'; // Asegúrate de mantener los estilos

const Especies: React.FC = () => {
  return (
    <IonPage>
      
      {/* 1. Encabezado */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/especies"></IonBackButton>
          </IonButtons>
          <IonTitle>Especies</IonTitle>
          <IonButtons slot="end">
            <IonIcon icon={notificationsOutline} size="large"></IonIcon>
            <IonIcon icon={searchOutline} size="large" className="ml-10"></IonIcon> 
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* 2. Contenido Principal */}
      <IonContent fullscreen>
        
        {/* Barra de Búsqueda y Filtro */}
        <div className="search-container">
          <IonSearchbar placeholder="Buscar especies, ej. tigre"></IonSearchbar>
          <IonIcon icon={optionsOutline} size="large" className="filter-icon"></IonIcon>
        </div>

        {/* Segmentos/Filtros */}
        <IonSegment scrollable={true} value="todos">
          <IonSegmentButton value="todos">
            <IonLabel>Todos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="mamiferos">
            <IonLabel>Mamíferos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="aves">
            <IonLabel>Aves</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="reptiles">
            <IonLabel>Reptiles</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Especies Destacadas */}
        <IonText>
          <h2 className="section-title">Especies destacadas</h2>
        </IonText>

        <IonGrid>
          <IonRow>
            {/* Tarjeta 1: Tigre de Bengala */}
            <IonCol size="6">
              <IonCard className="species-card">
                <img src="assets/img/tigre_bengala.jpg" alt="Tigre de Bengala" />
                <IonCardContent className="card-content-overlay">
                  <p className="species-name">Tigre de Bengala</p>
                  <IonChip className="category-chip mamifero-chip">
                    <IonLabel>Mamífero</IonLabel>
                  </IonChip>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Tarjeta 2: Elefante Africano */}
            <IonCol size="6">
              <IonCard className="species-card">
                <img src="assets/img/elefante_africano.jpg" alt="Elefante Africano" />
                <IonCardContent className="card-content-overlay">
                  <p className="species-name">Elefante Africano</p>
                  <IonChip className="category-chip mamifero-chip">
                    <IonLabel>Mamífero</IonLabel>
                  </IonChip>
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            {/* Tarjeta 3: Guacamayo Rojo */}
            <IonCol size="6">
              <IonCard className="species-card">
                <img src="assets/img/guacamayo_rojo.jpg" alt="Guacamayo Rojo" />
                <IonCardContent className="card-content-overlay">
                  <p className="species-name">Guacamayo Rojo</p>
                  <IonChip className="category-chip ave-chip">
                    <IonLabel>Ave</IonLabel>
                  </IonChip>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Tarjeta 4: Dragón de Komodo */}
            <IonCol size="6">
              <IonCard className="species-card">
                <img src="assets/img/dragon_komodo.jpg" alt="Dragón de Komodo" />
                <IonCardContent className="card-content-overlay">
                  <p className="species-name">Dragón de Komodo</p>
                  <IonChip className="category-chip reptil-chip">
                    <IonLabel>Reptil</IonLabel>
                  </IonChip>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <hr />

        {/* Más Especies */}
        <IonText>
          <h2 className="section-title">Más especies</h2>
        </IonText>

        <IonGrid>
          <IonRow>
            {/* Tarjeta 5: Pingüino */}
            <IonCol size="6">
              <IonCard className="species-card more-species-card">
                <img src="assets/img/pinguino.jpg" alt="Pingüino" />
                <IonCardContent className="card-content-overlay">
                  <p className="species-name">Pingüino</p>
                  <IonChip className="category-chip ave-chip">
                    <IonLabel>Ave</IonLabel>
                  </IonChip>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Tarjeta 6: Jirafa */}
            <IonCol size="6">
              <IonCard className="species-card more-species-card">
                <img src="assets/img/jirafa.jpg" alt="Jirafa" />
                <IonCardContent className="card-content-overlay">
                  <p className="species-name">Jirafa</p>
                  <IonChip className="category-chip mamifero-chip">
                    <IonLabel>Mamífero</IonLabel>
                  </IonChip>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>


    </IonPage>
  );
};

export default Especies;
