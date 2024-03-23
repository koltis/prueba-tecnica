import mysql from "mysql2/promise";

export default async function createMySqlConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test",
    port: 3306,
  });
}
