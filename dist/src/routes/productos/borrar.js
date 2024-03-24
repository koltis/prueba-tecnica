"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const removeOneProduct_1 = __importDefault(require("../../../modules/products/removeOneProduct"));
const __1 = require("../..");
const router = express_1.default.Router();
router.delete("/:id", async function (req, res) {
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
        await (0, removeOneProduct_1.default)(id);
        return res.send(`Product ${id} succesfully deleted`);
    }
    catch (e) {
        __1.logger.error(e);
        return res
            .status(500)
            .send(e.message ? e.message : "An unexpected error occurred on the server.");
    }
});
exports.default = router;
