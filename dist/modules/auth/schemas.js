"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(2).max(255),
    contraseña: zod_1.z.string().min(4).max(500),
});
