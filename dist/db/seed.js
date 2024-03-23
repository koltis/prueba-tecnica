"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("./connection"));
async function seed() {
    try {
        const db = await (0, connection_1.default)();
        //await db.query("DROP TABLE Productos;");
        //await db.query("DROP TABLE User;");
        const createProductsTable = await db.query(`
      CREATE TABLE Productos (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Titulo VARCHAR(255) UNIQUE,
        Descripcion TEXT,
        Estado ENUM('stock', 'no stock'),
        Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);
        const createUserTable = await db.query(`
      CREATE TABLE User (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(255) UNIQUE,
        Contraseña TEXT
    );
        `);
        const productos = await db.query(`
        INSERT INTO Productos (Titulo, Estado, Descripcion) VALUES 
        ('zapatos rapidos', 'stock', 'Zapatos de última generación para correr veloces.'),
        ('sarten grande', 'no stock', 'Sartén grande ideal para cocinar en familia.'),
        ('coche rapido', 'stock', 'Coche deportivo diseñado para alcanzar altas velocidades.');
    `);
        const hashedPassword = await bcrypt_1.default.hash("pepe", 10);
        const usuarioDefault = await db.query(`
        INSERT INTO User (Nombre, Contraseña) VALUES ('pepe', '${hashedPassword}');
        `);
        console.log({
            createProductsTable,
            createUserTable,
            productos,
            usuarioDefault,
        });
    }
    catch (err) {
        console.log(err);
    }
}
seed();
