export const MX_PHONE_REGEX = /^(\+52\s?)?\d{10}$/;

export function validateMxPhone(value: string): boolean {
  return MX_PHONE_REGEX.test(value.trim());
}

export function normalizeMxPhone(value: string): string {
  return value.trim().replace(/\s+/g, "");
}
