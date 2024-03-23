import createMySqlConnection from "../../db/connection";
import { productoSchema } from "./schemas";

export default async function createProduct({
  descripcion,
  titulo,
  estado,
}: productoSchema) {
  const db = await createMySqlConnection();
  const result = await db.query(`
    INSERT INTO Productos (Titulo, Descripcion, Estado) VALUES ('${titulo}', '${descripcion}', '${estado}');
  `);
  await db.end();
  return result;
}
