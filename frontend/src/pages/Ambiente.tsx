import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonIcon,
  IonText
} from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import './Ambiente.css';

const Ambiente: React.FC = () => {
  const [periodo, setPeriodo] = useState<'hoy' | 'semana' | 'mes' | 'año'>('hoy');
  const [animar, setAnimar] = useState<boolean>(false);

  // Datos simulados
  const datosAmbiente = {
    hoy: {
      temperatura: '18°C',
      humedad: '42%',
      aqi: '25 AQI',
      emisiones: 30,
      problemas: [
        { titulo: 'Emisiones en aumento', detalle: 'Promedio diario +3%', chip: 'Alerta', color: 'warning' },
        { titulo: 'Reciclaje insuficiente', detalle: 'Tasa actual 38%', chip: 'Mejorar', color: 'success' },
        { titulo: 'Consumo de agua', detalle: 'Objetivo excedido por 8%', chip: 'Atención', color: 'tertiary' }
      ]
    },
    semana: {
      temperatura: '21°C',
      humedad: '46%',
      aqi: '32 AQI',
      emisiones: 60,
      problemas: [
        { titulo: 'Emisiones en aumento', detalle: 'Promedio semanal +12%', chip: 'Alerta', color: 'warning' },
        { titulo: 'Reciclaje insuficiente', detalle: 'Tasa actual 39%', chip: 'Mejorar', color: 'success' },
        { titulo: 'Consumo de agua', detalle: 'Objetivo excedido por 5%', chip: 'Atención', color: 'tertiary' }
      ]
    },
    mes: {
      temperatura: '24°C',
      humedad: '40%',
      aqi: '28 AQI',
      emisiones: 45,
      problemas: [
        { titulo: 'Emisiones moderadas', detalle: 'Promedio mensual +7%', chip: 'Estable', color: 'medium' },
        { titulo: 'Reciclaje insuficiente', detalle: 'Tasa actual 42%', chip: 'Mejorar', color: 'success' },
        { titulo: 'Consumo de agua', detalle: 'Objetivo cumplido', chip: 'OK', color: 'primary' }
      ]
    },
    año: {
      temperatura: '22°C',
      humedad: '44%',
      aqi: '30 AQI',
      emisiones: 50,
      problemas: [
        { titulo: 'Emisiones controladas', detalle: 'Promedio anual +9%', chip: 'Normal', color: 'primary' },
        { titulo: 'Reciclaje mejorado', detalle: 'Tasa actual 45%', chip: 'Progreso', color: 'success' },
        { titulo: 'Consumo de agua', detalle: 'Dentro del límite', chip: 'Estable', color: 'medium' }
      ]
    }
  };

  const actual = datosAmbiente[periodo];

  // Activa animación al cambiar segmento
  const cambiarPeriodo = (nuevo: any) => {
    setAnimar(true);
    setPeriodo(nuevo);
    setTimeout(() => setAnimar(false), 400);
  };

  return (
    <IonPage>
      {/* Encabezado */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Ambiente</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Contenido */}
      <IonContent fullscreen>
        {/* Barra de búsqueda */}
        <div className="search-container">
          <IonSearchbar placeholder="Buscar temas, ej. Reciclaje y emisiones" />
          <IonIcon icon={optionsOutline} size="large" className="filter-icon" />
        </div>

        {/* Segmento */}
        <IonSegment
          scrollable
          value={periodo}
          onIonChange={(e) => cambiarPeriodo(e.detail.value)}
        >
          <IonSegmentButton value="hoy">
            <IonLabel>Hoy</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="semana">
            <IonLabel>Semana</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="mes">
            <IonLabel>Mes</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="año">
            <IonLabel>Año</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Indicadores con animación */}
        <div className={`fade-section ${animar ? 'fade' : ''}`}>
          <IonGrid className="indicators">
            <IonRow>
              <IonCol size="4">
                <IonCard className="indicator-card">
                  <IonCardContent>
                    <p className="indicator-value">{actual.temperatura}</p>
                    <p className="indicator-label">Temperatura</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="4">
                <IonCard className="indicator-card">
                  <IonCardContent>
                    <p className="indicator-value">{actual.humedad}</p>
                    <p className="indicator-label">Humedad</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="4">
                <IonCard className="indicator-card">
                  <IonCardContent>
                    <p className="indicator-value">{actual.aqi}</p>
                    <p className="indicator-label">Calidad del aire</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Emisiones CO₂ */}
          <IonText>
            <h2 className="section-title">Emisiones CO₂</h2>
          </IonText>
          <div className="emission-bar">
            <div
              className="emission-level animate-bar"
              style={{ width: `${actual.emisiones}%` }}
            ></div>
          </div>

          {/* Problemas ambientales */}
          <IonText>
            <h2 className="section-title">Problemas ambientales</h2>
          </IonText>
          {actual.problemas.map((p, index) => (
            <IonCard key={index} className="problem-card fade-card">
              <IonCardContent>
                <p className="problem-title">{p.titulo}</p>
                <p className="problem-subtitle">{p.detalle}</p>
                <IonChip color={p.color}>{p.chip}</IonChip>
              </IonCardContent>
            </IonCard>
          ))}

          {/* Mapa */}
          <IonText>
            <h2 className="section-title">Mapa de calidad del aire</h2>
          </IonText>
          <div className="map-container">
            <img src="assets/img/mapa_calidad_aire.png" alt="Mapa calidad del aire" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Ambiente;

