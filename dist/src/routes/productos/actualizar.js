"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../../../modules/products/schemas");
const updateProduct_1 = __importDefault(require("../../../modules/products/updateProduct"));
const __1 = require("../..");
const router = express_1.default.Router();
router.put("/:id", async function (req, res) {
    try {
        // @ts-ignore
        if (!req.body?.product) {
            const error = "there is no product on the body";
            __1.logger.error(error);
            res.status(400).send(error);
        }
        if (!req.params?.id) {
            const error = "there is no param in the url";
            __1.logger.error(error);
            res.status(400).send(error);
        }
        if (!+req.params.id) {
            const error = req.params.id + " is not a valid id";
            __1.logger.error(error);
            return res.status(500).send(error);
        }
        const id = +req.params.id;
        const { titulo, estado, descripcion } = req.body.product;
        const parsedBody = schemas_1.productoSchema.safeParse({
            titulo,
            estado,
            descripcion,
        });
        if (!parsedBody.success) {
            return res.status(400).send(parsedBody.error.errors[0].message);
        }
        await (0, updateProduct_1.default)({ titulo, descripcion, estado, id });
        return res.send("producto se ha actualizado con exito");
    }
    catch (e) {
        __1.logger.error(e);
        return res
            .status(500)
            .send(e.message ? e.message : "An unexpected error occurred on the server.");
    }
});
exports.default = router;
