import { Request, Response } from "express";
import express from "express";
import readMultipleProducts from "../../../modules/products/readMultipleProducts";
import readOneProduct from "../../../modules/products/readOneProduct";
import { logger } from "../..";

const router = express.Router();
router.get("/:id", async function (req: Request, res: Response) {
  try {
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

    const [product] = await readOneProduct(id);

    return res.send(product);
  } catch (e: any) {
    logger.error(e);
    return res
      .status(500)
      .send(
        e.message ? e.message : "An unexpected error occurred on the server."
      );
  }
});

router.get("/", async function (req: Request, res: Response) {
  try {
    const [products] = await readMultipleProducts();

    return res.send(products);
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
