import { Request, Response } from "express";
import express from "express";
import { productoSchema } from "../../../modules/products/schemas";
import upDateProduct from "../../../modules/products/updateProduct";
import { verifyToken } from "../../../modules/auth/verifyToken";
import { findUserById } from "../../../modules/products/findUser";
import { logger } from "../..";

const router = express.Router();

router.put("/:id", async function (req: Request, res: Response) {
  try {
    // @ts-ignore
    if (!req.body?.product) {
      const error = "there is no product on the body";
      logger.error(error);
      res.status(400).send(error);
    }

    if (!req.params?.id) {
      const error = "there is no param in the url";
      logger.error(error);
      res.status(400).send(error);
    }

    if (!+req.params.id) {
      const error = req.params.id + " is not a valid id";
      logger.error(error);
      return res.status(500).send(error);
    }
    const id = +req.params.id;
    const { titulo, estado, descripcion } = req.body.product;

    const parsedBody = productoSchema.safeParse({
      titulo,
      estado,
      descripcion,
    });
    if (!parsedBody.success) {
      return res.status(400).send(parsedBody.error.errors[0].message);
    }

    await upDateProduct({ titulo, descripcion, estado, id });

    return res.send("producto se ha actualizado con exito");
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
