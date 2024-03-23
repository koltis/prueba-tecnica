import createMySqlConnection from "../../db/connection";

export async function findUserByName(nombre: string) {
  const db = await createMySqlConnection();
  const result = await db.query(`
  SELECT * FROM User WHERE Nombre = '${nombre}' LIMIT 1;
  `);
  await db.end();
  return result;
}

export async function findUserById(id: number) {
  const db = await createMySqlConnection();
  const result = await db.query(`
  SELECT * FROM User WHERE ID = '${id}' LIMIT 1;
  `);
  await db.end();
  return result;
}
