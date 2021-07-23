import { Server, Socket } from 'socket.io';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on('connect', (socket: Socket) => {
	console.log(`connect ${socket.id}`);

	socket.on('ping', (cb) => {
		console.log('ping');
		cb();
	});

	socket.on('disconnect', () => {
		console.log(`disconnect ${socket.id}`);
	});
});

server.listen(8080, () => {
	console.log('Server listening!');
});
