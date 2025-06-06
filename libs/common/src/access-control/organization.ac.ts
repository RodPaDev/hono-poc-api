import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements as defaultOrganizationPermissions,
  defaultRoles as defaultOrganizationRoles,
} from "better-auth/plugins/organization/access";

/*
 * Defines the permissions structure and roles for organization-level access control.
 * Includes meteorite landing data permissions and user role configuration.
 */
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
