/**
 * Utility to enforce the presence of required environment variables.
 * Throws an error if the variable is missing or empty.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(
      `[Veritas.O] Missing required environment variable: "${name}". ` +
      `Set it locally (export ${name}=...) or in your runtime (Docker/CI).`
    );
  }
  return value.trim();
}
