# docker-secret ![](https://img.shields.io/travis/hwkd/docker-secret.svg?style=flat)
Utility for retrieving docker secrets.

## Usage
Given that you have created secrets for your docker swarm
```
printf "myUsername" | docker secret create USERNAME -
printf "mySuperSecret" | docker secret create PASSWORD -
```
You can retrieve secrets via the following methods:

### `secrets`
Loads secrets defined in the `/run/secrets` directory. To load from a different directory, refer to [`getSecrets(dir)`](#getsecretsdir).
```
import { secrets } from "docker-secret";

// Use secrets in your app.
mongoose.connect(`mongodb://${secrets.USERNAME}:${secrets.PASSWORD}@mongodb/mydb`);
```

### `getSecrets(dir)`
You can read secrets from a directory you define. This is useful for loading secrets from a different directory during development.
```
import { join } from "path";
import { getSecrets } from "docker-secret";

const secrets = getSecrets(process.env.SECRET_DIR);

// Also supports typings
type Credentials = {
  USERNAME: string;
  PASSWORD: string;
};
const secrets = getSecrets<Credentials>(secretDir);
secrets.USERNAME // no error
secrets.PASSWORD // no error
secrets.RANDOM // error

// You can also call the function without any argument to load secrets from `/run/secrets` by default.
const secrets = getSecrets<Credentials>();
```

### `getSecret(key)`
You can also use a utility function `getSecret(key)` if you wish:
```
// imported `getSecret` also loads secrets from the `/run/secrets`.
import { getSecret } from "docker-secret"

const username = getSecret("USERNAME");
const password = getSecret("PASSWORD");
```

You can define your own `getSecret` function like the following:
```
import { join } from "path";
import { getSecretFactory } from "docker-secret";

const secrets = getSecrets(join(__dirname, "secrets"));
const getSecret = getSecretFactory(secrets);

const username = getSecret("USERNAME");
const password = getSecret("PASSWORD");
```
