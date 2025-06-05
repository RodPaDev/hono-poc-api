import { type OrganizationMetadata } from "../types/organization.type";

export const parseOrganizationMetadata = (
  metadata: string | null,
): OrganizationMetadata | null => {
  if (!metadata) return null;

  try {
    const parsed = JSON.parse(metadata);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as OrganizationMetadata;
    }
    return null;
  } catch {
    return null;
  }
};
