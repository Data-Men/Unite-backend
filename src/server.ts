//loading enviroment variables
import dotenv from 'dotenv';
dotenv.config();

//importing http server and socket.io server
import express,{json,urlencoded} from 'express';
import cors from 'cors';
import {corsOptions} from './config'
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
//Creating and Connecting express server with httpServer
const app = express();
const httpServer = createServer(app);

//Connecting httpserver and Websocket
const io = new Server(httpServer);

//Cors
app.use(cors(corsOptions));
//loading routes
import tagRouter from "./routers/tagsRouter"
import communityRouter from "./routers/communityRouter";
import communityMemberRouter from "./routers/communityMemeberRouter"
import communityPostRouter from "./routers/communityPostRouter"
//parsing request
app.use(json());
app.use(urlencoded({
    extended: true,
}));

//Loading Chat event handlers
import chat from './controllers/chatStart';

//Routing
app.use('/community', communityRouter);
app.use('/community/members', communityMemberRouter);
app.use('/tag', tagRouter);
app.use('/communities/posts', communityPostRouter);


//Event Listening
// const onConnection = (Socket: Socket) => {
//     console.log("Connect to the websocket");
//     chat(io, Socket);
//     Socket.on('disconnect', (reason) => {
//         console.log(reason)
//     });
// }

// io.on("connection", onConnection);

httpServer.listen(process.env.PORT, () => {
    console.log(`App is listning at port: ${process.env.PORT}`);
}); 
