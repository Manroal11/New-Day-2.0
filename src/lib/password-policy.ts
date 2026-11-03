export function getPasswordValidationError(
  password: string,
  confirmation: string,
): string | null {
  if (password.length < 12) {
    return "Use at least 12 characters for your password.";
  }
  if (password.length > 128) {
    return "Use a password no longer than 128 characters.";
  }
  if (password !== confirmation) {
    return "The passwords do not match.";
  }
  return null;
}
