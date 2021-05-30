import fs from "fs";
import path from "path";

export interface Secrets {
  [key: string]: string;
}

export type GetSecretFn<S extends Secrets = Secrets> = (name: keyof S) => S[keyof S];

export function getSecrets<T extends Secrets = Secrets>(secretDir: string): T {
  const secrets: Secrets = {};
  if (fs.existsSync(secretDir)) {
    const files = fs.readdirSync(secretDir);

    files.forEach(file => {
      const fullPath = path.join(secretDir, file);
      const key = file;
      const data = fs
        .readFileSync(fullPath, "utf8")
        .toString()
        .trim();

      secrets[key] = data;
    });
  }
  return secrets as T;
}

export function getSecretFactory<S extends Secrets = Secrets>(secrets: S): GetSecretFn<S> {
  return (name: keyof S) => secrets[name];
}

// Provide defaults.
export const SECRET_DIR = "/run/secrets";
export const secrets = getSecrets(SECRET_DIR);
export const getSecret: GetSecretFn = getSecretFactory(secrets);
