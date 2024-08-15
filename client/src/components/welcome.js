import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');  // Redirige vers la page de login
    };
    return (
        <div>
            <h1>Welcome to Hunted 2.0 !</h1>
            <p>Please log in to continue.</p>
            <button onClick={handleLoginClick}>Go to Login</button>
        </div>
    );
}

export default Welcome;
