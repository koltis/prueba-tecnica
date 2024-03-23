"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../../../modules/products/schemas");
const createProduct_1 = __importDefault(require("../../../modules/products/createProduct"));
const router = express_1.default.Router();
router.post("/", async function (req, res) {
    try {
        if (!req.body?.product) {
            res.status(400).send("there is no product on the body");
        }
        const { titulo, estado, descripcion } = req.body.product;
        const parsedBody = schemas_1.crearProductoSchema.safeParse({
            titulo,
            estado,
            descripcion,
        });
        if (!parsedBody.success) {
            return res.status(400).send(parsedBody.error.errors[0].message);
        }
        const dbResult = await (0, createProduct_1.default)({ titulo, descripcion, estado });
        console.log(dbResult);
        return res.send("producto creado con exito");
    }
    catch (e) {
        console.log({ e });
    }
});
exports.default = router;
