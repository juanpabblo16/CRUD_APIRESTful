// src/pages/LoginPage.js
const LoginPage = ({ onLogin }) => {
    const handleLogin = () => {
        const user = { name: 'John Doe' }; // Aquí puedes reemplazarlo por lógica real
        onLogin(user);
    };

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};
export default LoginPage;
