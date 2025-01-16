import {
  doublePrecision,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

const rawCreateProductSchema = createInsertSchema(productsTable);

export const createProductSchema = z.object({
  ...rawCreateProductSchema.shape,
});

export const updateProductSchema = z
  .object({
    ...rawCreateProductSchema.shape,
  })
  .partial();
