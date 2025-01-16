import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: varchar({ length: 255 }).notNull(),
  address: text(),

  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),
});

const rawCreateUserSchema = createInsertSchema(usersTable);

export const createUserSchema = z
  .object({
    ...rawCreateUserSchema.shape,
  })
  .omit({ role: true });

export const loginUserchema = z
  .object({
    ...rawCreateUserSchema.shape,
  })
  .pick({ email: true, password: true });
