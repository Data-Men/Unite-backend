"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.dbConfig = void 0;
const env = process.env;
exports.dbConfig = {
    db: {
        host: env.DB_HOST,
        port: Number(env.DB_PORT),
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        ssl: true
    },
    listPerPage: env.LIST_PER_PAGE,
};
exports.corsOptions = {
    origin: ["https://unite-nine.vercel.app", "localhost:3000"],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
};
