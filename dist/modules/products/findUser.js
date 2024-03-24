"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByName = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
async function findUserByName(nombre) {
    const db = await (0, connection_1.default)();
    const result = await db.query(`
  SELECT * FROM User WHERE Nombre = '${nombre}' LIMIT 1;
  `);
    await db.end();
    return result;
}
exports.findUserByName = findUserByName;
async function findUserById(id) {
    const db = await (0, connection_1.default)();
    const result = await db.query(`
  SELECT * FROM User WHERE ID = '${id}' LIMIT 1;
  `);
    await db.end();
    return result;
}
exports.findUserById = findUserById;
