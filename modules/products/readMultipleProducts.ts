import createMySqlConnection from "../../db/connection";

export default async function readMultipleProducts() {
  const db = await createMySqlConnection();
  const result = await db.query(`
  SELECT * FROM Productos;
  `);
  await db.end();
  return result;
}
