import path from "path";
import { existsSync, readdirSync, lstatSync, readFileSync } from "fs";

// Default secrets directory.
export const SECRET_DIR = "/run/secrets";

export interface Secrets {
  [key: string]: string;
}

export type GetSecretFn<S extends Secrets = Secrets> = (
  name: keyof S
) => S[keyof S];

export function getSecrets<T extends Secrets = Secrets>(secretDir?: string): T {
  const _secretDir = secretDir || SECRET_DIR;

  const secrets: Secrets = {};
  if (existsSync(_secretDir)) {
    readdirSync(_secretDir).forEach((file) => {
      const fullPath = path.join(_secretDir, file);

      if (lstatSync(fullPath).isDirectory()) {
        return;
      }

      secrets[file] = readFileSync(fullPath, "utf8").trim();
    });
  }

  return secrets as T;
}

export function getSecretFactory<S extends Secrets = Secrets>(
  secrets: S
): GetSecretFn<S> {
  return (name: keyof S) => secrets[name];
}

// Provide defaults.
export const secrets = getSecrets(SECRET_DIR);
export const getSecret: GetSecretFn = getSecretFactory(secrets);
