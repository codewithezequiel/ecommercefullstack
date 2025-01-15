import express from "express";
import productsRouter from "./routes/products/index";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World 246");
});

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
