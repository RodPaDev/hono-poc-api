import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements as defaultUserPermissions,
  defaultRoles as defaultUserRoles,
} from "better-auth/plugins/admin/access";

/*
 * Defines the permissions structure and roles for user-level access control.
 * Includes platform-wide permissions and admin role configuration.
 */

export const USER_PERMISSIONS = {
  ...defaultUserPermissions, // Keep the default permissions and override as needed
  platform: ["read", "create", "update", "delete"],
} as const;
export type UserRolePermissions = {
  [K in keyof typeof USER_PERMISSIONS]?: Array<
    (typeof USER_PERMISSIONS)[K][number]
  >;
};

export const userAC = createAccessControl(USER_PERMISSIONS);

export const USER_ROLES = {
  ...defaultUserRoles, // Keep the default permissions and override as needed
  admin: userAC.newRole({
    // Inherit from default admin role AND add platform permissions
    ...defaultUserRoles.admin.statements,
    platform: ["read", "create", "update", "delete"],
  }),
} as const;
