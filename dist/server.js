"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//loading enviroment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//loading http server and socket.io server
const express_1 = __importDefault(require("express"));
// import path from 'path';
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const body_parser_1 = __importDefault(require("body-parser"));
//Creating and Connecting express server with httpServer
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
//Connecting httpserver and Websocket
const io = new socket_io_1.Server(httpServer);
//loading routes
const communityRouter_1 = __importDefault(require("./routers/communityRouter"));
const communityMemeberRouter_1 = __importDefault(require("./routers/communityMemeberRouter"));
const tagsRouter_1 = __importDefault(require("./routers/tagsRouter"));
//parsing request
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
//Routing
app.use('/community', communityRouter_1.default);
app.use('/community/members', communityMemeberRouter_1.default);
app.use('/tag', tagsRouter_1.default);
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
