import React, { useState, useEffect } from 'react';
import './EntrenamientoModelo.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



function EntrenamientoModelo() {
    const [metrics, setMetrics] = useState({
        f1_score: 0,
        precision: 0,
        recall: 0
    });
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/metrics");
                const data = await response.json();
                setMetrics(data);
            } catch (error) {
                console.error("Error al obtener los datos de la API:", error);
            }
        };
        fetchData();
    }, []);

    const [alertOpen, setAlertOpen] = useState(false);

    const [confusionUrl, setConfusionUrl] = useState("http://127.0.0.1:8000/confusion_matrix?timestamp=" + Date.now());


    
    const handleFileChangeAndUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setIsProcessing(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/retrain', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.message) {
                setAlertOpen(true);
            }

            // Opcional: puedes refrescar las métricas y la matriz de confusión aquí si lo consideras necesario.

        } catch (error) {
            console.error('Error al enviar el archivo:', error);
        }

        setIsProcessing(false);
    // Refrescar la imagen de la matriz de confusión
        setConfusionUrl("http://127.0.0.1:8000/confusion_matrix?timestamp=" + Date.now());
        const response = await fetch("http://127.0.0.1:8000/metrics");
        const data = await response.json();
        setMetrics(data); // Actualizar el estado con los datos obtenidos
    };


    
    return (
        <div className='contenedor-super-externo'>
            <div className='contenedor-externo'>
                <div className="columna-izquierda">
                    <img src={confusionUrl} alt="confusion" className="imagen-confusion" />

                    <div className="display">
                        <span>F1 Score:</span> <span className="display-value">{Math.round(metrics["f1-score"]*1000)/1000}</span>
                    </div>
                    <div className="display">
                        <span>Precision:</span> <span className="display-value">{Math.round(metrics["precision"]*1000)/1000}</span>
                    </div>
                    <div className="display">
                        <span>Recall:</span> <span className="display-value">{Math.round(metrics["recall"]*1000)/1000}</span>
                    </div>
                </div>
                <div className="columna-derecha">
                    <h1>Entrenamiento del Modelo</h1>
                    <p>Se optó por el algoritmo de regularización conocido como Ridge Classifier debido a sus múltiples ventajas: es eficiente para tratar con multicolinealidad en los datos, minimiza el impacto de características menos importantes y penaliza grandes coeficientes para prevenir el sobreajuste. Para su implementación, se utilizó el modelo RidgeClassifier de la biblioteca sklearn junto con el método TFIDF para transformar los datos textuales en características numéricas.</p>
                    <p>Con el objetivo de maximizar la eficacia del modelo, se llevó a cabo una búsqueda en malla para optimizar hiperparámetros como el parámetro de regularización alpha. El rendimiento del modelo se midió utilizando el F1 score. Una vez determinados los hiperparámetros ideales, se evaluó el rendimiento del modelo utilizando un conjunto de datos no etiquetados.</p>
                    <input 
                        type="file" 
                        accept=".xlsx" 
                        id="fileInput" 
                        style={{display: 'none'}} 
                        onChange={handleFileChangeAndUpload}
                    />
                    <button className={`boton ${isProcessing?'gris':'boton-hover'}`} onClick={() => document.getElementById('fileInput').click()}>
                            {isProcessing ? (
                                <div className='holahola'>
                                    <p className='proccc'> Procesando </p><div className="loader"></div>
                                </div>
                            ) : "Subir .xlsx"}
                        </button>
                </div>
            </div>
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                <Alert onClose={() => setAlertOpen(false)} severity="info" variant="filled">
                    Model retrained!
                </Alert>
            </Snackbar>
        </div>
        
    );

}

export default EntrenamientoModelo;
