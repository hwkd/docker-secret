"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.SECRET_DIR = "/run/secrets";
function getSecrets(secretDir) {
    const _secretDir = secretDir || exports.SECRET_DIR;
    const secrets = {};
    if (fs_1.default.existsSync(_secretDir)) {
        const files = fs_1.default.readdirSync(_secretDir);
        files.forEach((file) => {
            const fullPath = path_1.default.join(_secretDir, file);
            const key = file;
            const data = fs_1.default.readFileSync(fullPath, "utf8").toString().trim();
            secrets[key] = data;
        });
    }
    return secrets;
}
exports.getSecrets = getSecrets;
function getSecretFactory(secrets) {
    return (name) => secrets[name];
}
exports.getSecretFactory = getSecretFactory;
exports.secrets = getSecrets(exports.SECRET_DIR);
exports.getSecret = getSecretFactory(exports.secrets);
//# sourceMappingURL=index.js.map