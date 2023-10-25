import React, { useState } from 'react';
import './MiComponente.css';

// Suponiendo que las imágenes están en la carpeta 'assets'
import ods6 from './assets/ods6.png';
import ods7 from './assets/ods7.png';
import ods16 from './assets/ods16.png';

function MiComponente() {
    const [texto, setTexto] = useState("");
    const [prediccion, setPrediccion] = useState("El texto ingresado pertenece al ODS 6.");

    const enviarTexto = () => {
        // Aquí puedes agregar la lógica para enviar el texto al modelo de machine learning
        // y establecer el resultado en setPrediccion.
    }

    return (
        <div className='contenedor-super-externo'>
            <div className="contenedor-externo">
                <div className="contenedor-interno">
                    <h1>Introduce un texto aquí ...</h1>
                    <p>El texto ingresado será transformado y luego procesado a través de un modelo de machine learning para predecir a qué ODS pertenece.</p>
                    <div className="imagenes">
                        <img src={ods6} alt="ODS 6" className="imagen-ods6" />
                        <img src={ods7} alt="ODS 7" className="imagen-ods7" />
                        <img src={ods16} alt="ODS 16" className="imagen-ods16" />
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
                    <div className="botones">
                        <button className="btn btn-gris">Subir .csv</button>
                        <button className="btn btn-verde" onClick={enviarTexto}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiComponente;
