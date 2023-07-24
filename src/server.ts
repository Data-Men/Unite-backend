//loading enviroment variables
import dotenv from 'dotenv';
dotenv.config();

//loading http server and socket.io server
import express from 'express';
// import path from 'path';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import bodyParser from 'body-parser';
//Creating and Connecting express server with httpServer
const app = express();
const httpServer = createServer(app);

//Connecting httpserver and Websocket
const io = new Server(httpServer);

//loading routes
import indexRouter from './routers/IndexRouter';
import userRouter from './routers/userRouter';
import communityRouter from "./routers/communityRouter";
//parsing request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

//Static file Sending
// app.set('view engine', "ejs");
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, "public")))

//Loading Chat event handlers
import chat from './controllers/chatStart';

//Routing
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/community', communityRouter);

//Event Listening
const onConnection = (Socket: Socket) => {
    console.log("Connect to the websocket");
    chat(io, Socket);
    Socket.on('disconnect', (reason) => {
        console.log(reason)
    });
}

io.on("connection", onConnection);

httpServer.listen(process.env.PORT, () => {
    console.log(`App is listning at port: ${process.env.PORT}`);
}); 
