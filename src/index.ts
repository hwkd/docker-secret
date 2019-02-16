import fs from "fs";
import path from "path";

export interface Secrets {
  [key: string]: string;
}

export type GetSecretFn = (name: string) => string;

export function getSecrets(secretDir: string): Secrets {
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
  return secrets;
}

export function getSecretFactory(secrets: Secrets): GetSecretFn {
  return (name: string) => secrets[name];
}

export const SECRET_DIR = "/run/secrets";
export const secrets: Secrets = getSecrets(SECRET_DIR);
export const getSecret: GetSecretFn = getSecretFactory(secrets);
