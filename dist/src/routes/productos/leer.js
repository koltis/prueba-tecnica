"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const readMultipleProducts_1 = __importDefault(require("../../../modules/products/readMultipleProducts"));
const readOneProduct_1 = __importDefault(require("../../../modules/products/readOneProduct"));
const __1 = require("../..");
const router = express_1.default.Router();
router.get("/:id", async function (req, res) {
    try {
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
        const [product] = await (0, readOneProduct_1.default)(id);
        return res.send(product);
    }
    catch (e) {
        __1.logger.error(e);
        return res
            .status(500)
            .send(e.message ? e.message : "An unexpected error occurred on the server.");
    }
});
router.get("/", async function (req, res) {
    try {
        const [products] = await (0, readMultipleProducts_1.default)();
        return res.send(products);
    }
    catch (e) {
        __1.logger.error(e);
        return res
            .status(500)
            .send(e.message ? e.message : "An unexpected error occurred on the server.");
    }
});
exports.default = router;
