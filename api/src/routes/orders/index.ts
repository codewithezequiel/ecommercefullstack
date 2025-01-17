import { Router } from "express";
import { createOrder } from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createOrderSchema,
  createOrderWithItemsSchema,
} from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(createOrderWithItemsSchema),
  createOrder
);

export default router;
