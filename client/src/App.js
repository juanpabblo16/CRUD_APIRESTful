// src/App.js

import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { apolloClient } from './graphql/queries';  // Asegúrate de que 'apolloClient' esté correctamente configurado en ./lib/graphql/queries
import NavBar from './components/NavBar';  // Importa correctamente tu componente NavBar
import HomePage from './pages/HomePage';  // Asegúrate de tener este componente en la carpeta 'pages'
import LoginPage from './pages/LoginPage';  // Asegúrate de tener este componente en la carpeta 'pages'
import RegisterPage from './pages/RegisterPage';  // Asegúrate de tener este componente en la carpeta 'pages'
import ProfilePage from './pages/ProfilePage';  // Asegúrate de tener este componente en la carpeta 'pages'
import getUser from './services/authService';  // Importa el valor por defecto

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(getUser);

    const handleLogin = (user) => {
        setUser(user);
        navigate('/');
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <ApolloProvider client={apolloClient}>
            <NavBar user={user} onLogout={handleLogout} />
            <main className="section">
                <Routes>
                    <Route index path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage user={user} />} />
                </Routes>
            </main>
        </ApolloProvider>
    );
}

export default App;
