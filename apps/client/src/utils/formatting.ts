export const formatInitials = (name: string) => {
  const names = name.split(" ");
  const firstInitial = names[0] ? names[0][0].toUpperCase() : "";
  const lastInitial = names[names.length - 1]
    ? names[names.length - 1][0].toUpperCase()
    : "";
  return `${firstInitial}${lastInitial}`;
};
