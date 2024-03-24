"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const findUser_1 = require("../products/findUser");
const verifyToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            const validated = (0, jsonwebtoken_1.verify)(bearerToken, process.env.JWT_SECRET);
            if (!validated || !validated.id)
                throw new Error("the token couldnt be validated");
            const [user] = await (0, findUser_1.findUserById)(validated.id);
            // @ts-ignore
            req.user = user;
            return next();
        }
        else {
            throw new Error("there is no authorizationToken");
        }
    }
    catch (e) {
        res.status(403).send(e.message);
    }
};
exports.verifyToken = verifyToken;
