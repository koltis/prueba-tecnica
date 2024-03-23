import { Request, Response } from "express";
import express from "express";
import { productoSchema } from "../../../modules/products/schemas";
import createProduct from "../../../modules/products/createProduct";
import { logger } from "../..";

const router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  try {
    if (!req.body?.product) {
      const error = "there is no product on the body";
      logger.error(error);
      res.status(400).send(error);
    }

    const { titulo, estado, descripcion } = req.body.product;

    const parsedBody = productoSchema.safeParse({
      titulo,
      estado,
      descripcion,
    });
    if (!parsedBody.success) {
      const error = parsedBody.error.errors[0].message;
      logger.error(error);
      return res.status(400).send(error);
    }

    await createProduct({ titulo, descripcion, estado });

    return res.send("producto creado con exito");
  } catch (e: any) {
    logger.error(e);
    return res
      .status(500)
      .send(
        e.message ? e.message : "An unexpected error occurred on the server."
      );
  }
});

export default router;
