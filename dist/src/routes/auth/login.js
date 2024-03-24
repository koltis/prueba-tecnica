"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const findUser_1 = require("../../../modules/products/findUser");
const jsonwebtoken_1 = require("jsonwebtoken");
const schemas_1 = require("../../../modules/auth/schemas");
const __1 = require("../..");
const router = express_1.default.Router();
router.post("/", async function (req, res) {
    try {
        if (!req.body?.login) {
            const error = "there is no product on the body";
            __1.logger.error(error);
            return res.status(400).send(error);
        }
        const { nombre, contraseña } = req.body.login;
        const parsedBody = schemas_1.userSchema.safeParse({
            nombre,
            contraseña,
        });
        if (!parsedBody.success) {
            const error = parsedBody.error.errors[0].message;
            __1.logger.error(error);
            return res.status(400).send(error);
        }
        const [user] = await (0, findUser_1.findUserByName)(nombre);
        const userInfo = user;
        const userPassword = userInfo[0]["Contraseña"];
        const samePassword = await bcrypt_1.default.compare(contraseña, userPassword);
        if (!samePassword) {
            const error = "the username or the password are wrong";
            __1.logger.error(error);
            return res.status(401).send(error);
        }
        const token = (0, jsonwebtoken_1.sign)({ id: userInfo[0]["ID"] }, process.env.JWT_SECRET, {
            expiresIn: "10d",
        });
        return res.send({ token });
    }
    catch (e) {
        __1.logger.error(e);
        return res
            .status(500)
            .send(e.message ? e.message : "An unexpected error occurred on the server.");
    }
});
exports.default = router;
