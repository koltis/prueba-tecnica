import createMySqlConnection from "../../db/connection";

export default async function removeOneProduct(id: number) {
  const db = await createMySqlConnection();
  const result = await db.query(`
  DELETE FROM Productos WHERE ID = ${id} LIMIT 1;
  `);
  await db.end();
  return result;
}
