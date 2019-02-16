"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getSecrets(secretDir) {
    const secrets = {};
    if (fs_1.default.existsSync(secretDir)) {
        const files = fs_1.default.readdirSync(secretDir);
        files.forEach(file => {
            const fullPath = path_1.default.join(secretDir, file);
            const key = file;
            const data = fs_1.default
                .readFileSync(fullPath, "utf8")
                .toString()
                .trim();
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
exports.SECRET_DIR = "/run/secrets";
exports.secrets = getSecrets(exports.SECRET_DIR);
exports.getSecret = getSecretFactory(exports.secrets);
//# sourceMappingURL=index.js.map