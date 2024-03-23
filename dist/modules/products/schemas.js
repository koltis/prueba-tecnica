"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearProductoSchema = void 0;
const zod_1 = require("zod");
exports.crearProductoSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(4).max(255),
    estado: zod_1.z.enum(["stock", "no stock"]),
    descripcion: zod_1.z.string().min(6).max(500),
});
