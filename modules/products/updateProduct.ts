import createMySqlConnection from "../../db/connection";
import { productoSchema } from "./schemas";

export default async function upDateProduct({
  descripcion,
  titulo,
  estado,
  id,
}: { id: number } & productoSchema) {
  const db = await createMySqlConnection();
  const result = await db.query(`
  UPDATE Productos 
  SET Titulo = '${titulo}', Descripcion = '${descripcion}', Estado = '${estado}'
  WHERE ID = ${id};
 
  `);
  await db.end();
  return result;
}
