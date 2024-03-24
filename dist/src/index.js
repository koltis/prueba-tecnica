"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const productos_1 = __importDefault(require("./routes/productos"));
const auth_1 = __importDefault(require("./routes/auth"));
const body_parser_1 = __importDefault(require("body-parser"));
const winston_1 = __importDefault(require("winston"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const { combine, timestamp, json } = winston_1.default.format;
exports.logger = winston_1.default.createLogger({
    level: "http",
    format: combine(timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }), json()),
    transports: [new winston_1.default.transports.Console()],
});
const morganMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", {
    stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => exports.logger.http(message.trim()),
    },
});
app.use(morganMiddleware);
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.use("/productos", productos_1.default);
app.use("/auth", auth_1.default);
app.get("/", (req, res) => {
    res.send("TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
