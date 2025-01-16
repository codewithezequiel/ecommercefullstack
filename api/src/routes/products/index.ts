import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import { createProductSchema } from "../../db/productsSchema";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", validateData(createProductSchema), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
