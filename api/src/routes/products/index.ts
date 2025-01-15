import { Router } from "express";

// Products Endpoints
const router = Router();
// Endpoint 1: Getting all products
router.get("/", (req, res) => {
  res.send("Welcome to the products page!");
});

// Endpoint 2: Getting a single product by id
router.get("/:id", (req, res) => {
  console.log(req.params);
  res.send("productById");
});

// Endpoint 3: Adding a product
router.post("/", (req, res) => {
  console.log(req.params);
  res.send("creatingAProduct");
});

// Endpoint 4: Modifying a product
router.put("/:id", (req, res) => {
  res.send("updatingProduct");
});

// Endpoint 5: Deleting a product
router.delete("/:id", (req, res) => {
  res.send("deletingProduct");
});

export default router;
