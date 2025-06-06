export const formatInitials = (name: string) => {
  const names = name.trim().split(/\s+/);
  const firstInitial = names[0] ? names[0][0].toUpperCase() : "";
  const lastInitial =
    names.length > 1 && names[names.length - 1]
      ? names[names.length - 1][0].toUpperCase()
      : "";
  return `${firstInitial}${lastInitial}`;
};
