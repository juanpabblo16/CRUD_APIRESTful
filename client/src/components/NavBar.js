import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Asegúrate de importar los estilos aquí

const NavBar = ({ user, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">
                    Home
                </Link>
            </div>
            <div className="navbar-right">
                {user ? (
                    <>
                        <span className="navbar-user">Hello, {user.name}</span>
                        <Link to="/profile" className="navbar-link">Profile</Link>
                        <button className="navbar-button" onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-link">Login</Link>
                        <Link to="/register" className="navbar-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
