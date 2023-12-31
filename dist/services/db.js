"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pools = void 0;
const pg_1 = require("pg");
const config_1 = require("./../config");
const pool = new pg_1.Pool(config_1.dbConfig.db);
/**
 * Query the database using the pool
 * @param {*} query
 * @param {*} params
 *
 */
function query(query, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows, fields } = yield pool.query(query, parameters);
        // await pool.release()
        return rows;
    });
}
const pools = () => { return pool; };
exports.pools = pools;
exports.default = query;
