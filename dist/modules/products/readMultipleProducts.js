"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../db/connection"));
async function readMultipleProducts() {
    const db = await (0, connection_1.default)();
    const result = await db.query(`
  SELECT * FROM Productos;
  `);
    await db.end();
    return result;
}
exports.default = readMultipleProducts;
