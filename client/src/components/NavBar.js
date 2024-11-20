import { Link } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
    return (
        <nav>
            <div>{user ? `Hello, ${user.name}` : 'Welcome'}</div>
            {user ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={onLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
