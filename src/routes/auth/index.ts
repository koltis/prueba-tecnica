import express, { Request, Response } from "express";
import login from "./login";

const router = express.Router();

router.use("/login", login);

export default router;
