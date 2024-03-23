"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crear_1 = __importDefault(require("./crear"));
const router = express_1.default.Router();
router.get("/", function (req, res) {
    return res.send("algo");
});
router.use("/crear", crear_1.default);
exports.default = router;
