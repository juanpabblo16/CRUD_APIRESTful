import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import authService from '../../services/authService';

const Register = () => {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('regular');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authService.register(name, email, password, role);
            history.push('/login');
        } catch (err) {
            setError('Error registering user');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="regular">Regular</option>
                    <option value="superadmin">Superadmin</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
