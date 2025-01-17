import { Router } from "express";
import {
  createOrder,
  listOrders,
  getOrder,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  createOrderSchema,
  createOrderWithItemsSchema,
  updateOrderSchema,
} from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, listOrders);

router.post(
  "/",
  verifyToken,
  validateData(createOrderWithItemsSchema),
  createOrder
);

router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
