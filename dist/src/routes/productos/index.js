"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crear_1 = __importDefault(require("./crear"));
const leer_1 = __importDefault(require("./leer"));
const actualizar_1 = __importDefault(require("./actualizar"));
const borrar_1 = __importDefault(require("./borrar"));
const verifyToken_1 = require("../../../modules/auth/verifyToken");
const router = express_1.default.Router();
// Para utilizar cualquiera de estas rutas, agrega el token de portador (bearer token) en la petición.
// Puedes obtenerlo iniciando sesión en la ruta /login con el usuario predeterminado {nombre:"pepe", contraseña:"pepe"}.
router.use(verifyToken_1.verifyToken);
router.use("/crear", crear_1.default);
router.use("/leer", leer_1.default);
router.use("/actualizar", actualizar_1.default);
router.use("/borrar", borrar_1.default);
exports.default = router;
