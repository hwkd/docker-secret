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
const username = "userXYZ", password = "DaA3f/Ts21fe!wq?/1";
describe("Test module", function () {
    it("should return secret values", function (done) {
        fs_1.default.mkdtemp(path_1.default.join(__dirname, "SECRETS"), (error, folder) => {
            if (error) {
                rimraf_1.default(folder, (error) => done(error));
            }
            Promise.all([
                writeFile(path_1.default.join(folder, "USERNAME"), username),
                writeFile(path_1.default.join(folder, "PASSWORD"), password),
            ])
                .then(() => {
                const secrets = index_1.getSecrets(folder);
                chai_1.expect(secrets).to.haveOwnProperty("USERNAME").that.equals(username);
                chai_1.expect(secrets).to.haveOwnProperty("PASSWORD").that.equals(password);
                const getSecret = index_1.getSecretFactory(secrets);
                chai_1.expect(getSecret("USERNAME")).to.equal(username);
                chai_1.expect(getSecret("PASSWORD")).to.equal(password);
            })
                .finally(() => {
                rimraf_1.default(folder, (error) => done(error));
            });
        });
    });
});
function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(path, data, (err) => {
            if (err)
                return reject(err);
            return resolve();
        });
    });
}
//# sourceMappingURL=index.test.js.map