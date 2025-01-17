import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products/index.js";
import ordersRoutes from "./routes/orders/index.js";
import authRoutes from "./routes/auth/index.js";
import serverless from "serverless-http";

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World 246");
});

app.use("/products", productsRouter);
app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
