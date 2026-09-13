// Costa Rica numbering plan (same ranges Fufills validates against):
// fixed 2[0-24-7] / 4x, mobile 5[07], 6[0-4], 7[0-3], 8[3-9] — always 8 digits.
export const CR_PHONE_REGEX = /^(?:\+?506)?(?:2[0-24-7]|4\d|5[07]|6[0-4]|7[0-3]|8[3-9])\d{6}$/;

export const CR_PHONE_ERROR = "Número inválido. Ingresá un teléfono de Costa Rica (8 dígitos).";

export function normalizeCrPhone(value: string): string {
  const digits = value.replace(/\D/g, "").replace(/^506/, "").replace(/^0+/, "");
  return `+506${digits}`;
}

export function validateCrPhone(value: string): boolean {
  return CR_PHONE_REGEX.test(value.replace(/[\s-]/g, ""));
}
