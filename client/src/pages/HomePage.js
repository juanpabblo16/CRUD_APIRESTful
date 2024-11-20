import React, { useState } from 'react';
import NavBar from '../components/NavBar'; // Asegúrate de importar correctamente el componente NavBar
import '../styles/HomePage.css';

const HomePage = () => {
    const [user, setUser] = useState(null); // Puedes manejar el estado del usuario aquí (null = no autenticado)

    const handleLogout = () => {
        setUser(null); // Aquí debes hacer la lógica para cerrar sesión
    };

    return (
        <div className="home-container">
            {/* Barra de navegación */}
            <NavBar user={user} onLogout={handleLogout} />

            <div className="content">
                <div className="header">Welcome to Our Website</div>
                <div className="description">
                    Explore our platform and discover amazing content.
                </div>
                <button className="action-button">Get Started</button>
                {/* Otros contenidos de la página */}
            </div>
        </div>
    );
};

export default HomePage;
