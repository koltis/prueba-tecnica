import { Request, Response } from "express";
import express from "express";

import bcrypt from "bcrypt";
import { findUserByName } from "../../../modules/products/findUser";
import { sign } from "jsonwebtoken";
import { userSchema } from "../../../modules/auth/schemas";
import { logger } from "../..";

const router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  try {
    if (!req.body?.login) {
      const error = "there is no product on the body";
      logger.error(error);
      return res.status(400).send(error);
    }

    const { nombre, contraseña } = req.body.login;

    const parsedBody = userSchema.safeParse({
      nombre,
      contraseña,
    });
    if (!parsedBody.success) {
      const error = parsedBody.error.errors[0].message;
      logger.error(error);
      return res.status(400).send(error);
    }

    const [user] = await findUserByName(nombre);
    const userInfo: any = user;
    const userPassword = userInfo[0]["Contraseña"];

    const samePassword = await bcrypt.compare(contraseña, userPassword);

    if (!samePassword) {
      const error = "the username or the password are wrong";
      logger.error(error);
      return res.status(401).send(error);
    }

    const token = sign(
      { id: userInfo[0]["ID"] },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "10d",
      }
    );

    return res.send({ token });
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
