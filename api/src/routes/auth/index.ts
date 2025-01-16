import { Router } from "express";
import { createUserSchema, usersTable } from "../../db/usersSchema";
import { validateData } from "../../middlewares/validationMiddleware";
import bcrypt from "bcryptjs";
import { db } from "../../db/index";

const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({ ...data, password: hashedPassword })
      .returning();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

router.post("/login", (req, res) => {
  res.send("login");
});

export default router;
