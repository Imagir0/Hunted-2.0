import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      // Stocker le pseudo dans localStorage ou state pour l'utiliser dans le lobby
      localStorage.setItem('username', username);
      navigate('/lobby');
    }
  };

  return (
    <div>
      <h1>Enter your username</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default Home;
