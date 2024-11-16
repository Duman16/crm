import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('auth/token/', { username, password });
            const { access, refresh } = response.data; // Предполагается, что вы получаете оба токена
            localStorage.setItem('token', access);
            localStorage.setItem('refresh_token', refresh);
            setAuthToken(access);
            navigate('/profile');
        } catch (error) {
            alert('Ошибка входа! Неправильное имя пользователя или пароль');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Вход</h2>
            <div>
                <label>Имя пользователя:</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Пароль:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Войти</button>
        </form>
    );
};

export default Login;
