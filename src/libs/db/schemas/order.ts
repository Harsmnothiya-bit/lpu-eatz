import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const status = pgEnum('status', ['pending', 'completed', 'cancelled']);

export const order = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  user: varchar('user').notNull(),
  itemId: integer('item').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  status: status('status').notNull().default('pending'),
});

export type Order = {
  id: string;
  user: string;
  itemId: number;
  created_at: Date;
  status: 'pending' | 'completed' | 'cancelled';
};
