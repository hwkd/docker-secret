import path from "path";
import fs from "fs";
import rimraf from "rimraf";
import { expect } from "chai";
import { getSecretFactory, getSecrets } from "./index";

describe("Test module", function() {
  it("should return secret values", function(done) {
    fs.mkdtemp(path.join(__dirname, "SECRET"), (error, folder) => {
      if (error) {
        rimraf(folder, (error: any) => done(error));
      }

      fs.writeFile(
        path.join(folder, "SUPSERSECRET"),
        "secret-value",
        (error: any) => {
          if (error) {
            rimraf(folder, (error: any) => done(error));
          }

          const secrets = getSecrets(folder);
          expect(secrets)
            .to.haveOwnProperty("SUPSERSECRET")
            .that.equals("secret-value");

          rimraf(folder, (error: any) => done(error));

          const getSecret = getSecretFactory(secrets);
          const supersecret = getSecret("SUPSERSECRET");
          expect(supersecret).to.equal("secret-value");
        }
      );
    });
  });
});
