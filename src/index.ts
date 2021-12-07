import fs from "fs";
import path from "path";

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
  if (fs.existsSync(_secretDir)) {
    const files = fs.readdirSync(_secretDir);

    files.forEach((file) => {
      const fullPath = path.join(_secretDir, file);
      const key = file;
      if(fs.lstatSync(fullPath).isDirectory()) return;
      const data = fs.readFileSync(fullPath, "utf8").toString().trim();

      secrets[key] = data;
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
