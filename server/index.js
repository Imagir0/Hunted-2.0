const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

// Stockage des joueurs en mémoire
let players = [];

// Gérer les connexions Socket.IO
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join', (username) => {
        players.push({ id: socket.id, username });
        io.emit('updatePlayers', players); // Informer tous les clients de la nouvelle liste de joueurs
    });

    socket.on('disconnect', () => {
        players = players.filter(player => player.id !== socket.id);
        io.emit('updatePlayers', players);
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Servir les fichiers statiques du dossier build de React
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
