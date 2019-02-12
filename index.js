"use strict";
const fs = require("fs");
const path = require("path");

const SECRETS_DIR = "/run/secrets";
const secrets = {};

if (fs.existsSync(SECRETS_DIR)) {
  const files = fs.readdirSync(SECRETS_DIR);

  files.forEach(function(file, index) {
    const fullPath = path.join(SECRETS_DIR, file);
    const key = file;
    const data = fs
      .readFileSync(fullPath, "utf8")
      .toString()
      .trim();

    secrets[key] = data;
  });
}

exports.getSecret = function getSecret(name: string): string {
  return secrets[name]
    ? secrets[name]
    : fs
        .readFileSync(path.join(SECRETS_DIR, name), "utf8")
        .toString()
        .trim();
};

exports.secrets = secrets;
