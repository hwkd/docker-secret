import path from "path";
import { existsSync, readdirSync, lstatSync, readFileSync } from "fs";

// Default secrets directory.
const SECRET_DIR = "/run/secrets";

interface Secrets {
  [key: string]: string;
}

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

export const secrets = getSecrets(SECRET_DIR);
