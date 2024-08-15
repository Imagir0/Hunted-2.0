import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io();

function Lobby() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      // Informer le serveur que le joueur a rejoint
      socket.emit('join', username);
    }

    // Écouter les mises à jour de la liste des joueurs
    socket.on('updatePlayers', (players) => {
      setPlayers(players);
    });

    // Nettoyage à la déconnexion
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Players in the Lobby</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
