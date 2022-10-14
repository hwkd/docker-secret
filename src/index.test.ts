import path from "path";
import fs from "fs";
import rimraf from "rimraf";
import { expect } from "chai";
import { getSecrets } from "./index";

type Secrets = {
  USERNAME: string;
  PASSWORD: string;
};

const username = "userXYZ",
  password = "DaA3f/Ts21fe!wq?/1";

describe("Test module", function () {
  it("should return secret values", function (done) {
    fs.mkdtemp(path.join(__dirname, "SECRETS"), (error, folder) => {
      if (error) {
        rimraf(folder, (error: any) => done(error));
      }

      // Create secret files with values.
      Promise.all([
        writeFile(path.join(folder, "USERNAME"), username),
        writeFile(path.join(folder, "PASSWORD"), password),
      ])
        .then(() => {
          const secrets = getSecrets<Secrets>(folder);
          expect(secrets).to.haveOwnProperty("USERNAME").that.equals(username);
          expect(secrets).to.haveOwnProperty("PASSWORD").that.equals(password);
        })
        .finally(() => {
          rimraf(folder, (error: any) => done(error));
        });
    });
  });
});

function writeFile(path: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}
