import createMySqlConnection from "../../db/connection";

export default async function readOneProduct(id: number) {
  const db = await createMySqlConnection();
  const result = await db.query(`
  SELECT * FROM Productos WHERE ID = ${id} LIMIT 1
  `);
  await db.end();
  return result;
}
