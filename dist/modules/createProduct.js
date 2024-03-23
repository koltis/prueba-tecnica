"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seed_1 = __importDefault(require("../db/seed"));
async function createProduct() {
    const db = (0, seed_1.default)();
}
exports.default = createProduct;
