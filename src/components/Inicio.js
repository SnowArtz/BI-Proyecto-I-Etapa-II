import React from 'react';
import './Inicio.css';
import DALEE1 from './assets/DALEE1.png';
import ods6 from './assets/OD6-IN.png';
import ods7 from './assets/OD7-IN.png';
import ods16 from './assets/OD17-IN.png';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación

const Inicio = () => {


  const navigate = useNavigate();

  const redirectToPredecir = () => {
    navigate('/predecir');
  };

  return (
    <div className="inicio-container">
      <h1 className="title">Clasificador de textos según su ODS</h1>
      <div className="content-container">
        <div className="top-image-container">
          <img src={DALEE1} alt="Imagen principal" className="top-image"/>
        </div>
        <p className="description">
        En la era contemporánea, la sostenibilidad y el desarrollo son esenciales para las organizaciones a nivel mundial. La Agenda 2030 de las Naciones Unidas proporciona una guía crucial con sus 17 Objetivos de Desarrollo Sostenible (ODS) para abordar retos como la pobreza, salud, educación y medio ambiente. No obstante, más allá de fijar metas, es imperativo monitorear y evaluar de manera constante el avance hacia estas metas. En esta línea, se ha emprendido un proyecto en conjunto con la Universidad de los Andes, centrado en la creación de un clasificador de textos basado en aprendizaje automático, que permite analizar y categorizar la información según los ODS. Esta iniciativa, respaldada por el Fondo de Población de las Naciones Unidas (UNFPA), tiene como finalidad optimizar la clasificación de datos y ofrecer perspectivas que puedan influenciar las decisiones en políticas públicas y acciones vinculadas al desarrollo sostenible.
        </p>
      </div>

      <div className="bottom-images-container">
        <div className="image-item">
          <img src={ods6} alt="ODS 6" />
          <div className='snow'>
          <p>Asegurar la disponibilidad y gestión sostenible del agua y
el saneamiento para todos</p>
</div>
        </div>
        <div className="image-item">
          <img src={ods7} alt="ODS 7" />
          <div className='snow'>
          <p>Garantizar el acceso a una energía asequible,
segura, sostenible y moderna para todos</p>
</div>

        </div>
        <div className="image-item">
          <img src={ods16} alt="ODS 16" />
          <div className='snow'>
          <p>Promover sociedades pacíficas e inclusivas para
el desarrollo sostenible.</p>
      </div>
      
        </div>
        
      </div>
      <div className="botones-prada">
      <button className="btn2 btn-azul" onClick={redirectToPredecir}>Predecir</button>
                    </div>
    </div>
  );
}

export default Inicio;
