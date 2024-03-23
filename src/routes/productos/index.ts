import express, { Request, Response } from "express";
import crear from "./crear";
import leer from "./leer";
import actualizar from "./actualizar";
import borrar from "./borrar";
import { verifyToken } from "../../../modules/auth/verifyToken";

const router = express.Router();

// Para utilizar cualquiera de estas rutas, agrega el token de portador (bearer token) en la petición.
// Puedes obtenerlo iniciando sesión en la ruta /login con el usuario predeterminado {nombre:"pepe", contraseña:"pepe"}.

router.use(verifyToken);

router.use("/crear", crear);
router.use("/leer", leer);
router.use("/actualizar", actualizar);
router.use("/borrar", borrar);

export default router;
