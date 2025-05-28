ALTER TABLE "meteorite_landing" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "meteorite_landing" ALTER COLUMN "nametype" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "meteorite_landing" ALTER COLUMN "recclass" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "meteorite_landing" ALTER COLUMN "mass" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "meteorite_landing" ALTER COLUMN "fall" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "meteorite_landing" ALTER COLUMN "year" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "meteorite_landing" ALTER COLUMN "reclat" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "meteorite_landing" ALTER COLUMN "reclong" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "meteorite_landing" ALTER COLUMN "geolocation" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "impersonated_by" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "banned" boolean;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ban_reason" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ban_expires" timestamp;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "parent_id" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "type" text DEFAULT 'default' NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_parent_id_organization_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;