import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonSearchbar,
  IonIcon,
  IonChip,
  IonCard,
  IonCardContent,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/react';
import {
  optionsOutline,
  locateOutline,
  leafOutline,
  navigateOutline,
  walkOutline,
  trailSignOutline,
  recycleOutline
} from 'ionicons/icons';
import './Mapa.css';

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Solución para los problemas con los íconos en Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

// Función para mover el mapa al centro de la ubicación actual
const SetViewToCurrent = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 15); // Ajusta el zoom si es necesario
    }
  }, [coords, map]);
  return null;
};

const Mapa: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null); // Estado para la ubicación del destino

  // Obtener ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        () => {
          // Si no se puede obtener la ubicación, usa una por defecto (Santiago, Chile)
          setPosition([-33.4489, -70.6693]);
        }
      );
    }
  }, []);

  // Función para marcar el destino
  const handleMarkDestination = () => {
    // Aquí puedes agregar una lógica para cambiar la ubicación del destino
    setDestination([position![0] + 0.01, position![1] + 0.01]); // Para el ejemplo, muevo el destino un poco
    alert('Destino marcado en el mapa');
  };

  // Función para iniciar la ruta
  const handleStartRoute = () => {
    if (destination) {
      alert(`Iniciando la ruta hacia ${destination[0]}, ${destination[1]}`);
    } else {
      alert('Primero marca un destino');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Buscador */}
        <div className="search-container">
          <IonSearchbar placeholder="Buscar punto de interés" />
          <IonButton fill="clear" size="small" className="nearby-btn">
            Cerca
          </IonButton>
          <IonIcon icon={optionsOutline} size="large" className="filter-icon" />
        </div>

        {/* Chips de filtro */}
        <div className="chip-container">
          <IonChip color="success">AQI bueno</IonChip>
          <IonChip color="medium">Zona común</IonChip>
          <IonChip color="primary">
            <IonIcon icon={locateOutline} /> Mi ubicación
          </IonChip>
        </div>

        {/* Mapa */}
        <div className="mapa-wrapper">
          {position ? (
            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: '220px', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <SetViewToCurrent coords={position} />
              <Marker position={position}>
                <Popup>Estás aquí 📍</Popup>
              </Marker>

              {/* Si hay un destino marcado, añade un marcador */}
              {destination && (
                <Marker position={destination}>
                  <Popup>Destino marcado 📍</Popup>
                </Marker>
              )}
            </MapContainer>
          ) : (
            <p className="loading-text">Cargando mapa...</p>
          )}
        </div>

        {/* Indicadores */}
        <IonGrid className="indicator-grid">
          <IonRow>
            <IonCol size="6">
              <IonCard className="indicator-card">
                <IonCardContent>
                  <p className="indicator-value">AQI 24</p>
                  <p className="indicator-label">Calidad del aire</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="indicator-card">
                <IonCardContent>
                  <p className="indicator-value">18°C</p>
                  <p className="indicator-label">Temp. actual</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Puntos de interés */}
        <IonText>
          <h2 className="section-title">Puntos de interés</h2>
        </IonText>

        {/* Ejemplo de punto de interés */}
        <IonCard className="poi-card">
          <IonCardContent>
            <IonIcon icon={leafOutline} className="poi-icon" />
            <div className="poi-info">
              <p className="poi-title">Bosque Andino</p>
              <p className="poi-sub">Zona sombreada • AQI 22</p>
            </div>
            <IonChip color="success">Cerca</IonChip>
          </IonCardContent>
        </IonCard>

        {/* Agrega más puntos de interés aquí como el ejemplo anterior */}

        {/* Botones inferiores */}
        <div className="bottom-actions">
          <IonButton fill="outline" color="medium" onClick={handleMarkDestination}>
            Marcar destino
          </IonButton>
          <IonButton color="success" onClick={handleStartRoute}>
            <IonIcon slot="start" icon={navigateOutline} />
            Iniciar ruta
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Mapa;


