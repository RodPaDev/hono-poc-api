import { user } from "@/models/better-auth/auth.model";
import { type InvitationStatus } from "better-auth/plugins";

import {
  pgTable,
  text,
  timestamp,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

const DEFAULT_INVITATION_STATUS: InvitationStatus = "pending";

export const organization = pgTable("organization", {
  // DO NOT EDIT START (these fields are required by BetterAuth - Organization Plugin)
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  createdAt: timestamp("created_at").notNull(),
  metadata: text("metadata"),
  // DO NOT EDIT END
  parentId: text("parent_id").references((): AnyPgColumn => organization.id, {
    onDelete: "cascade",
  }),
  type: text("type").default("default").notNull(),
});

export const member = pgTable("member", {
  // DO NOT EDIT START (these fields are required by BetterAuth - Organization Plugin)
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: text("role").default("member").notNull(),
  createdAt: timestamp("created_at").notNull(),
  // DO NOT EDIT END
});

export const invitation = pgTable("invitation", {
  // DO NOT EDIT START (these fields are required by BetterAuth - Organization Plugin)
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role"),
  status: text("status").default(DEFAULT_INVITATION_STATUS).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  // DO NOT EDIT END
});
