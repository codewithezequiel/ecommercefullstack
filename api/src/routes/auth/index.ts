import { Router } from "express";
import {
  createUserSchema,
  loginUserchema,
  usersTable,
} from "../../db/usersSchema";
import { validateData } from "../../middlewares/validationMiddleware";
import bcrypt from "bcryptjs";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({ ...data, password: hashedPassword })
      .returning();

    // @ts-ignore
    delete user.password;

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

router.post("/login", validateData(loginUserchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    // we need to query to database to make sure user exists (fetching user logic)
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.status(401).json({ error: "Authentication something went wrong" });
      return;
    }

    // create a jwt token and give it to the user (authentication successfull)
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SIGNATURE!,
      { expiresIn: "30d" }
    );

    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send("SoMething went wrong");
  }
});

export default router;
