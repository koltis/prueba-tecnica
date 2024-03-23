"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const productos_1 = __importDefault(require("./routes/productos"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.use("/productos", productos_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.post("/", (req, res) => { });
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
