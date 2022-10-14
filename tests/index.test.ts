import path from "path";
import { promises as fs } from "fs";
import rimraf from "rimraf";

import { getSecrets } from "../lib";

describe("getSecrets", function () {
  it("should read secrets from the given directory", async () => {
    const dir = await makeTempDir();
    try {
      const cred = {
        USERNAME: "userXYZ",
        PASSWORD: "DaA3f/Ts21fe!wq?/1",
      };

      await createSecrets(dir, cred);

      const secrets = getSecrets<typeof cred>(dir);

      expect(secrets).toHaveProperty("USERNAME");
      expect(secrets.USERNAME).toBe(cred.USERNAME);

      expect(secrets).toHaveProperty("PASSWORD");
      expect(secrets.PASSWORD).toBe(cred.PASSWORD);
    } finally {
      await rmdir(dir);
    }
  });

  it("should return empty secrets object if directory does not exist", async () => {
    const secrets = getSecrets(path.join(__dirname, "NON_EXISTENT_DIR"));
    expect(secrets).toEqual({});
  });

  it("should trim newline characters and spaces at the ends of the secret", async () => {
    const dir = await makeTempDir();
    try {
      const passwords = {
        USER_PASSWORD: "\n eWY?Np%L3@vy3!1e4Rog  \n",
        DB_PASSWORD: "\nk5eIN7@of411^eq?5xi\n ",
      };

      await createSecrets(dir, passwords);

      const secrets = getSecrets<typeof passwords>(dir);

      expect(secrets.USER_PASSWORD).toBe("eWY?Np%L3@vy3!1e4Rog");
      expect(secrets.DB_PASSWORD).toBe("k5eIN7@of411^eq?5xi");
    } finally {
      await rmdir(dir);
    }
  });

  it("should ignore directories inside the secret folder", async () => {
    const dir = await makeTempDir();
    try {
      const cred = {
        PASSWORD: "VKtSVUZoiH/2XnS6",
      };

      await createSecrets(dir, cred);
      await fs.mkdir(path.join(dir, "FOLDER"));

      const secrets = getSecrets<typeof cred>(dir);

      expect(secrets).toEqual(cred);
    } finally {
      await rmdir(dir);
    }
  });
});

async function makeTempDir(): Promise<string> {
  return fs.mkdtemp(path.join(__dirname, "SECRETS"));
}

function createSecrets(
  dir: string,
  mapping: { [key: string]: string }
): Promise<void[]> {
  return Promise.all(
    Object.keys(mapping).map((key) =>
      fs.writeFile(path.join(dir, key), mapping[key])
    )
  );
}

function rmdir(dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(dir, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}
