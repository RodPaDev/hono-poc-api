ALTER TABLE "organization" DROP CONSTRAINT "organization_parent_id_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "parent_id";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "type";