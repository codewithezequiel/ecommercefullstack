import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { usersTable } from "./usersSchema";
import { productsTable } from "./productsSchema";

// One to Many Relationship (user to orders)
export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("New"),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

// Many to Many Relationship (orders to products)
export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),

  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

const rawCreateOrderSchema = createInsertSchema(ordersTable);

export const createOrderSchema = z
  .object({
    ...rawCreateOrderSchema.shape,
  })
  .omit({
    id: true,
    userId: true,
    status: true,
    createdAt: true,
  });

export const createOrderWithItemSchema = createInsertSchema(
  orderItemsTable
).omit({
  id: true,
  orderId: true,
});

export const createOrderWithItemsSchema = z.object({
  order: createOrderSchema,
  items: z.array(createOrderWithItemSchema),
});
