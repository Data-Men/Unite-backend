"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//loading enviroment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//importing http server and socket.io server
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
//Creating and Connecting express server with httpServer
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
//Connecting httpserver and Websocket
const io = new socket_io_1.Server(httpServer);
//Cors
app.use((0, cors_1.default)(config_1.corsOptions));
//loading routes
const tagsRouter_1 = __importDefault(require("./routers/tagsRouter"));
const communityRouter_1 = __importDefault(require("./routers/communityRouter"));
const communityMemeberRouter_1 = __importDefault(require("./routers/communityMemeberRouter"));
const communityPostRouter_1 = __importDefault(require("./routers/communityPostRouter"));
//parsing request
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({
    extended: true,
}));
//Routing
app.use('/community', communityRouter_1.default);
app.use('/community/members', communityMemeberRouter_1.default);
app.use('/tag', tagsRouter_1.default);
app.use('/communities/posts', communityPostRouter_1.default);
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
