import React, { useState } from 'react';
import axios from 'axios';
import './MiComponente.css';

// Suponiendo que las imágenes están en la carpeta 'assets'
import ods6 from './assets/ods6.png';
import ods7 from './assets/ods7.png';
import ods16 from './assets/ods16.png';

function MiComponente() {
    

    const [texto, setTexto] = useState("");
    const [prediccion, setPrediccion] = useState("");
    const subirCsv = () => {
        // Simula un clic en el input para seleccionar un archivo
        document.getElementById('fileInput').click();
    }
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const readFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            // Parsea el contenido del CSV
            const lines = event.target.result.split('\n').map(line => line.trim()).filter(line => line);
            sendToAPI(lines);
        };
        reader.readAsText(file);
    };
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNombreArchivo(file.name);
            readFile(file);
        }
    };
    
    const sendToAPI = (texts) => {
        setIsProcessing(true);  // Inicia el procesamiento
    
        axios.post('http://127.0.0.1:8000/predict', {
            texts: texts
        }, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadPercentage(percentCompleted);
            }
        })
        .then(response => {
            downloadPredictions(response.data["predictions" ], texts);
        })
        .catch(error => {
            console.error("Error al enviar los datos a la API:", error);
        })
        .finally(() => {
            setIsProcessing(false);  // Finaliza el procesamiento
            setUploadPercentage(0);  // Resetea el porcentaje de subida
            setNombreArchivo("");    // Resetea el nombre del archivo
            document.getElementById('fileInput').value = null;  // Limpia el input file
        });
    };
    
    
    
    const enviarTexto = async () => {
        // Definir la URL de la API
        const apiUrl = "http://127.0.0.1:8000/predict";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Origin": "http://localhost:3000",
                },
                body: JSON.stringify({ texts: [texto] })
            });

            const data = await response.json();
            if (data.predictions[0]) {
                setPrediccion(`El texto ingresado pertenece al ODS ${data.predictions[0]}.`);
            } else {
                console.error("No se pudo obtener la predicción de la API");
            }
        } catch (error) {
            console.error("Hubo un error al enviar el texto a la API:", error);
        }
    }

    const [isProcessing, setIsProcessing] = useState(false);


    const downloadPredictions = (data, texts) => {
        if(data.length !== texts.length) {
            console.error("Los tamaños de las listas 'data' y 'texts' no coinciden.");
            return;
        }
    
        // Crear contenido CSV
        let csvContent = "data,texts\n"; // Esta es la cabecera del archivo
        for(let i = 0; i < data.length; i++) {
            // Asegurarse de que los datos no tengan comas ni comillas dobles
            // (esto es para simplificar y evitar problemas en un CSV básico)
            const cleanData = String(data[i]).replace(/,|"/g, ' ');
            const cleanText = String(texts[i]).replace(/,|"/g, ' ');
    
            csvContent += `"${cleanText}",${cleanData}\n`; // Agregar cada par data-text al contenido CSV
        }
    
        const blob = new Blob([csvContent], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'predictions.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    return (
        <div className='contenedor-super-externo'>
            <div className="contenedor-externo">
                <div className="contenedor-interno">
                    <h1>Introduce un texto aquí ...</h1>
                    <p>El texto ingresado será transformado y luego procesado a través de un modelo de machine learning para predecir a qué ODS pertenece.</p>
                    <div className="imagenes">
                        <img src={ods6} alt="ODS 6" className={`imagen-ods6 ${prediccion.includes("ODS 6") ? 'activo' : ''}`} />
                        <img src={ods7} alt="ODS 7" className={`imagen-ods7 ${prediccion.includes("ODS 7") ? 'activo' : ''}`} />
                        <img src={ods16} alt="ODS 16" className={`imagen-ods16 ${prediccion.includes("ODS 16") ? 'activo' : ''}`} />
                    </div>
                    <textarea 
                        placeholder="Ingresar texto"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />
                    <div className="resultado">
                        {prediccion}
                    </div>
                    <hr />
                    
                    {/* Aquí agregamos el input oculto para subir archivos */}
                    <input 
                        type="file" 
                        accept=".csv" 
                        id="fileInput" 
                        style={{display: 'none'}} 
                        onChange={handleFileChange}
                    />
    
                    <div className="botones">
                        <button className="btn btn-gris" onClick={subirCsv}>
                            {isProcessing ? (
                                <div className='holahola'>
                                    <p className='proccc'> Procesando </p><div className="loader"></div>
                                </div>
                            ) : "Subir .csv"}
                        </button>

                        <button className="btn btn-verde" onClick={enviarTexto}>Enviar</button>
                    </div>
                   


                </div>
            </div>
        </div>
    );
    
}

export default MiComponente;
