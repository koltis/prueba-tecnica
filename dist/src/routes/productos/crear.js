"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../../../modules/products/schemas");
const createProduct_1 = __importDefault(require("../../../modules/products/createProduct"));
const __1 = require("../..");
const router = express_1.default.Router();
router.post("/", async function (req, res) {
    try {
        if (!req.body?.product) {
            const error = "there is no product on the body";
            __1.logger.error(error);
            res.status(400).send(error);
        }
        const { titulo, estado, descripcion } = req.body.product;
        const parsedBody = schemas_1.productoSchema.safeParse({
            titulo,
            estado,
            descripcion,
        });
        if (!parsedBody.success) {
            const error = parsedBody.error.errors[0].message;
            __1.logger.error(error);
            return res.status(400).send(error);
        }
        await (0, createProduct_1.default)({ titulo, descripcion, estado });
        return res.send("producto creado con exito");
    }
    catch (e) {
        __1.logger.error(e);
        return res
            .status(500)
            .send(e.message ? e.message : "An unexpected error occurred on the server.");
    }
});
exports.default = router;
