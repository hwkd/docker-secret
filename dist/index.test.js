"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const rimraf_1 = __importDefault(require("rimraf"));
const chai_1 = require("chai");
const index_1 = require("./index");
describe("Test module", function () {
    it("should return secret values", function (done) {
        fs_1.default.mkdtemp(path_1.default.join(__dirname, "SECRET"), (error, folder) => {
            if (error) {
                rimraf_1.default(folder, (error) => done(error));
            }
            fs_1.default.writeFile(path_1.default.join(folder, "SUPSERSECRET"), "secret-value", (error) => {
                if (error) {
                    rimraf_1.default(folder, (error) => done(error));
                }
                const secrets = index_1.getSecrets(folder);
                chai_1.expect(secrets)
                    .to.haveOwnProperty("SUPSERSECRET")
                    .that.equals("secret-value");
                rimraf_1.default(folder, (error) => done(error));
                const getSecret = index_1.getSecretFactory(secrets);
                const supersecret = getSecret("SUPSERSECRET");
                chai_1.expect(supersecret).to.equal("secret-value");
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map