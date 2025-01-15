import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.send("Welcome to the products page!");
}

export function createProduct(req: Request, res: Response) {
  console.log(req.body);
  res.send(" creating a product");
}

export function getProductById(req: Request, res: Response) {
  res.send("productById");
}

export function updateProduct(req: Request, res: Response) {
  res.send("updating Product");
}

export function deleteProduct(req: Request, res: Response) {
  res.send("Deleting product");
}
