import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements as defaultUserPermissions,
  defaultRoles as defaultUserRoles,
} from "better-auth/plugins/admin/access";
import {
  defaultStatements as defaultOrganizationPermissions,
  defaultRoles as defaultOrganizationRoles,
} from "better-auth/plugins/organization/access";

/************************************************************************************
 * ======================= START: USER PERMISSIONS AND ROLES ========================
 * Defines the permissions structure and roles for user-level access control.
 * Includes platform-wide permissions and admin role configuration.
 ************************************************************************************/
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
/************************************************************************************
 * ====================== END: USER PERMISSIONS AND ROLES ===========================
 ************************************************************************************/

/************************************************************************************
 * ================= START: ORGANIZATION PERMISSIONS AND ROLES ======================
 * Defines the permissions structure and roles for organization-level access control.
 * Includes meteorite landing data permissions and user role configuration.
 ************************************************************************************/
export const ORGANIZATION_PERMISSIONS = {
  ...defaultOrganizationPermissions, // Keep the defaul permissions and override as needed
  "meteorite-landing": ["read", "create", "update", "delete"],
  "meteorite-landing:year": ["read", "create", "update", "delete"],
} as const;
export type OrganizationRolePermissions = {
  [K in keyof typeof ORGANIZATION_PERMISSIONS]?: Array<
    (typeof ORGANIZATION_PERMISSIONS)[K][number]
  >;
};
export const organizationAC = createAccessControl(ORGANIZATION_PERMISSIONS);
export const ORGANIZATION_ROLES = {
  ...defaultOrganizationRoles, // Keep the defaul roles and override as needed
  user: organizationAC.newRole({
    "meteorite-landing": ["read", "create", "update", "delete"],
  }),
} as const;
/************************************************************************************
 * ================ END: ORGANIZATION PERMISSIONS AND ROLES =========================
 ************************************************************************************/
