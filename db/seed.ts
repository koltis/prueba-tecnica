import bcrypt from "bcrypt";
import createMySqlConnection from "./connection";

//La función "seed" se ejecuta con el comando "npm run seed", crea las tablas,
//el usuario predeterminado para la autenticación de la aplicación y 3 productos.
async function seed() {
  try {
    const db = await createMySqlConnection();

    const createProductsTable = await db.query(
      `
      CREATE TABLE Productos (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Titulo VARCHAR(255) UNIQUE,
        Descripcion TEXT,
        Estado ENUM('stock', 'no stock'),
        Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    );
    const createUserTable = await db.query(
      `
      CREATE TABLE User (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(255) UNIQUE,
        Contraseña TEXT
    );
        `
    );
    const productos = await db.query(
      `
        INSERT INTO Productos (Titulo, Estado, Descripcion) VALUES 
        ('zapatos rapidos', 'stock', 'Zapatos de última generación para correr veloces.'),
        ('sarten grande', 'no stock', 'Sartén grande ideal para cocinar en familia.'),
        ('coche rapido', 'stock', 'Coche deportivo diseñado para alcanzar altas velocidades.');
    `
    );
    const hashedPassword = await bcrypt.hash("pepe", 10);

    const usuarioDefault = await db.query(
      `
        INSERT INTO User (Nombre, Contraseña) VALUES ('pepe', '${hashedPassword}');
        `
    );
    console.log({
      createProductsTable,
      createUserTable,
      productos,
      usuarioDefault,
    });
  } catch (err) {
    console.log(err);
  }
}

seed();
