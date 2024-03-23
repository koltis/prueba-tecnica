import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { findUserById } from "../products/findUser";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const validated: any = verify(
        bearerToken,
        process.env.JWT_SECRET as string
      );
      if (!validated || !validated.id)
        throw new Error("the token couldnt be validated");

      const [user] = await findUserById(validated.id);
      // @ts-ignore
      req.user = user;
      return next();
    } else {
      throw new Error("there is no authorizationToken");
    }
  } catch (e: any) {
    res.status(403).send(e.message);
  }
};
