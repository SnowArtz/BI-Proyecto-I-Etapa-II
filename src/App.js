import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Routes en lugar de Switch
import './App.css';
import Inicio from './components/Inicio';
import MiComponente from './components/MiComponente';
import EntrenamientoModelo from './components/EntrenamientoModelo';
import Navbar from './components/Navbar';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes> {/* Utiliza Routes en lugar de Switch */}
          <Route path="/" element={<Inicio />} />
          <Route path="/predecir" element={<MiComponente />} />
          <Route path="/entrenar" element={<EntrenamientoModelo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
