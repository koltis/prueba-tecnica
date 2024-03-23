"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
async function createMySqlConnection() {
    return await promise_1.default.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "test",
        port: 3306,
    });
}
exports.default = createMySqlConnection;
