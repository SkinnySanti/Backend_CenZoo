import React, { useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon, IonContent, 
  IonGrid, IonRow, IonCol, IonButton, IonText, IonItem, IonLabel, IonNote, IonChip, 
  IonTextarea, IonFooter, IonAlert // Importamos IonAlert
} from '@ionic/react';
import { notificationsOutline, helpCircleOutline } from 'ionicons/icons';
import './agendarvisita.css'; 

const AgendarVisita: React.FC = () => {
    // === ESTADOS PARA MANEJAR LA INTERACCIÓN ===
    const [selectedDateIndex, setSelectedDateIndex] = useState(7); // Día 8 por defecto
    const [selectedTime, setSelectedTime] = useState('10:30');
    const [visitors, setVisitors] = useState(4); // 4 visitantes por defecto
    const [entryType, setEntryType] = useState('General');
    const [preference, setPreference] = useState('Silla de ruedas');
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar el Alert

    // === DATOS SIMULADOS ===
    const entryPrice = 6000; // Precio simulado por entrada
    const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const availableTimes = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];
    
    // Crear el array de 28 días (4 semanas)
    const dates = Array.from({ length: 28 }, (_, i) => ({
        day: i + 1,
        month: 'Oct 2025',
        active: i >= 7, 
        selected: i === selectedDateIndex, 
    }));
    
    // Obtener la fecha seleccionada y calcular el total para el resumen
    const currentSelectedDate = dates.find((_, index) => index === selectedDateIndex);
    const dateDisplay = currentSelectedDate ? `${currentSelectedDate.day} ${currentSelectedDate.month}` : 'Selecciona una fecha';
    const totalEstimado = visitors * entryPrice;


    // === FUNCIONES MANEJADORAS ===

    // 1. Manejar el cambio de visitantes
    const handleVisitorChange = (delta: number) => {
        setVisitors(prev => {
            const newCount = prev + delta;
            // Limitar entre 1 y 20 visitantes
            if (newCount > 0 && newCount <= 20) { 
                return newCount;
            }
            return prev;
        });
    };

    // 2. Manejar la selección de fecha
    const handleDateSelect = (index: number, isActive: boolean) => {
        if (isActive) {
            setSelectedDateIndex(index);
        }
    };
    
    // 3. Manejar la selección de hora
    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    // 4. Manejar la confirmación de la reserva y mostrar el Alert
    const handleConfirmBooking = () => {
        // Aquí iría la lógica de envío de datos
        setShowAlert(true); 
    };


    return (
        <IonPage>
        
            {/* 1. Encabezado */}
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Agendar visita</IonTitle>
                    <IonButtons slot="end">
                        <IonIcon icon={notificationsOutline} size="large"></IonIcon>
                        <IonIcon icon={helpCircleOutline} size="large" className="ml-10"></IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            {/* 2. Contenido Principal */}
            <IonContent fullscreen>
                
                {/* Indicadores de Paso */}
                <div className="step-indicators">
                    <IonButton className="step-button active">1 Fecha</IonButton>
                    <IonButton className="step-button">2 Hora</IonButton>
                    <IonButton className="step-button">3 Datos</IonButton>
                </div>
                
                {/* --- Sección 1: Calendario --- */}
                <IonText>
                    <h3 className="section-title">Selecciona la fecha</h3>
                </IonText>
                
                <IonGrid className="calendar-grid">
                    {/* Días de la semana */}
                    <IonRow className="day-names">
                        {daysOfWeek.map(day => (
                            <IonCol key={day} className="day-name-col">
                                <IonLabel>{day}</IonLabel>
                            </IonCol>
                        ))}
                    </IonRow>

                    {/* Días del mes */}
                    {[0, 7, 14, 21].map((start) => (
                        <IonRow key={start} className="date-row">
                            {dates.slice(start, start + 7).map((date, index) => (
                                <IonCol key={index} className="date-col">
                                    <div 
                                        className={`date-circle ${date.selected ? 'selected' : ''} ${!date.active ? 'disabled' : ''}`}
                                        onClick={() => handleDateSelect(start + index, date.active)} 
                                    >
                                        {date.day}
                                    </div>
                                </IonCol>
                            ))}
                        </IonRow>
                    ))}
                </IonGrid>
                
                {/* --- Sección 2: Elige horario --- */}
                <IonText>
                    <h3 className="section-title">Elige horario</h3>
                </IonText>

                <div className="time-chips-container">
                    {availableTimes.map((time, index) => (
                        <IonChip 
                            key={index} 
                            className={`time-chip ${time === selectedTime ? 'selected' : ''}`} 
                            onClick={() => handleTimeSelect(time)}
                        >
                            <IonLabel>{time}</IonLabel>
                        </IonChip>
                    ))}
                </div>

                {/* --- Sección 3: Detalles de la visita (Inputs) --- */}
                <IonText>
                    <h3 className="section-title">Detalles de la visita</h3>
                </IonText>

                {/* Input: Visitantes (Contador) */}
                <IonItem lines="none" className="visitors-input-item">
                    <IonLabel>Visitantes</IonLabel>
                    <div className="counter-controls">
                        <IonButton size="small" className="counter-button minus" onClick={() => handleVisitorChange(-1)}>-</IonButton>
                        <span className="counter-value">{visitors}</span> 
                        <IonButton size="small" className="counter-button plus" onClick={() => handleVisitorChange(1)}>+</IonButton>
                    </div>
                </IonItem>
                
                {/* Chips de Entrada y Preferencias */}
                <div className="option-chips-container">
                    <IonChip 
                        className={`option-chip ${entryType === 'General' ? 'selected' : ''}`}
                        onClick={() => setEntryType('General')}
                    >
                        <IonLabel>Tipo de entrada: General</IonLabel>
                    </IonChip>
                    <IonChip 
                        className={`option-chip ${preference === 'Silla de ruedas' ? 'selected' : ''}`}
                        onClick={() => setPreference('Silla de ruedas')}
                    >
                        <IonLabel>Preferencias: Silla de ruedas</IonLabel>
                    </IonChip>
                </div>

                {/* Input: Comentario (Textarea) */}
                <IonItem lines="none" className="comment-textarea-item">
                    <IonLabel position="stacked">Comentario</IonLabel>
                    <IonTextarea rows={1} placeholder="Visita escolar de 4° grado" value="Visita escolar de 4° grado"></IonTextarea>
                </IonItem>


                {/* --- Sección 4: Resumen de la reserva --- */}
                <div className="summary-box">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="4"><IonLabel className="summary-label">Fecha</IonLabel></IonCol>
                            <IonCol size="8" className="ion-text-end"><IonNote>{dateDisplay}</IonNote></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4"><IonLabel className="summary-label">Hora</IonLabel></IonCol>
                            <IonCol size="8" className="ion-text-end"><IonNote>{selectedTime}</IonNote></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4"><IonLabel className="summary-label">Entradas</IonLabel></IonCol>
                            <IonCol size="8" className="ion-text-end"><IonNote>{visitors} x {entryType}</IonNote></IonCol>
                        </IonRow>
                        <IonRow className="total-row">
                            <IonCol size="6"><IonLabel className="summary-label total-label">Total estimado</IonLabel></IonCol>
                            <IonCol size="6" className="ion-text-end"><IonLabel className="total-value">${totalEstimado.toLocaleString('es-CL')}</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonText className="disclaimer-text">
                        <p>El total puede variar según descuentos aplicables.</p>
                    </IonText>
                </div>

            </IonContent>

            {/* 3. Botón de Confirmación (Footer) */}
            <IonFooter className="confirmation-footer">
                <IonButton 
                    expand="full" 
                    className="confirm-button"
                    // Llama a la función que muestra el Alert
                    onClick={handleConfirmBooking}
                >
                    Confirmar reserva
                </IonButton>
            </IonFooter>

            {/* 4. ALERTA DE CONFIRMACIÓN */}
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)} // Cierra el alert y reinicia el estado
                header={'¡Reserva Confirmada!'}
                subHeader={'Gracias por agendar tu visita.'}
                // Mensaje dinámico con los valores seleccionados
                message={`Tu reserva para el **${dateDisplay}** a las **${selectedTime}** con **${visitors}** entradas ha sido procesada con éxito.`}
                buttons={['Aceptar']}
            />

        </IonPage>
    );
};

export default AgendarVisita;