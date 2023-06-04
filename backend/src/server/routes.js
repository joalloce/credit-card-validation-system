import express from "express";

import { validate } from "./controller";

const router = express.Router();

router.post("/", validate);

export default router;
