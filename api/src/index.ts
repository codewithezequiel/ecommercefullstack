import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products/index";
import authRoutes from "./routes/auth/index";

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World 246");
});

app.use("/products", productsRouter);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
