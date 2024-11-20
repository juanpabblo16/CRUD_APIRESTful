import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  // Importa BrowserRouter
import App from './App';  // Tu archivo App.js
import './index.css';  // Tus estilos si los tienes

// Envuelve el componente App con BrowserRouter
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
