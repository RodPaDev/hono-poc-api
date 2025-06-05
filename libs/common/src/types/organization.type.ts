export const OrganizationStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type OrganizationMetadata = {
  status: (typeof OrganizationStatus)[keyof typeof OrganizationStatus];
};
