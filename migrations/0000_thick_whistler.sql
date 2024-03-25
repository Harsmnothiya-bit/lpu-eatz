DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('pending', 'completed', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" varchar NOT NULL,
	"item" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL
);
