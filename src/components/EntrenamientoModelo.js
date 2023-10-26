import React from 'react';
import './EntrenamientoModelo.css';
import confusion from './assets/confus.png';
import miFondo from './assets/miFondo.png';


function EntrenamientoModelo() {
    return (
        <div className='contenedor-super-externo' >
            <div className='contenedor-externo'>
                <div className="columna-izquierda">
                    <img src={confusion} alt="confusion" className="imagen-confusion" /> 
                    <div className="display">
                    <span>F1 Score:</span> <span className="display-value">0.95</span>
                    </div>
                    <div className="display">
                    <span>Precision:</span> <span className="display-value">0.93</span>
                    </div>
                    <div className="display">
                    <span>Recall:</span> <span className="display-value">0.97</span>
                    </div>
                </div>
                <div className="columna-derecha">
                    <h1>Entrenamiento del Modelo</h1>
                    <p>Se optó por el algoritmo de ensemble conocido como RandomForest debido a sus múltiples ventajas: combina varios árboles de decisión para proporcionar predicciones más precisas, es robusto, tiene una excelente capacidad para manejar el overfitting y permite determinar la importancia de las características. Para su implementación, se utilizó el modelo RandomForestClassifier de la biblioteca sklearn.</p>
                    <p>Con el objetivo de maximizar la eficacia del modelo, se llevó a cabo una búsqueda en malla para optimizar hiperparámetros como el número de árboles, profundidad máxima y mínimas muestras para dividir, entre otros. El rendimiento del modelo se midió utilizando el F1 score. Una vez determinados los hiperparámetros ideales, se evaluó el rendimiento del modelo utilizando un conjunto de datos no etiquetados.</p>
                    <button className="boton">Reentrenar modelo</button>
                </div>
            </div>
        </div>
    );
}

export default EntrenamientoModelo;
