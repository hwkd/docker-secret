# docker-secret
Utility for retrieving docker secrets.

## Usage
Given that you have created secrets for your docker swarm:
```
printf "x" | docker secret create X_KEY -
printf "y" | docker secret create Y_KEY -
printf "z" | docker secret create Z_KEY -
```

You can retrieve these secrets from within the swarm container via `secrets`.
```
import { secrets } from "docker-secret";

expect(secrets.X_KEY).to.equal("x"); // true
expect(secrets.Y_KEY).to.equal("y"); // true
expect(secrets.Z_KEY).to.equal("z"); // true
```
