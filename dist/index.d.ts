export declare const SECRET_DIR = "/run/secrets";
export interface Secrets {
    [key: string]: string;
}
export declare type GetSecretFn<S extends Secrets = Secrets> = (name: keyof S) => S[keyof S];
export declare function getSecrets<T extends Secrets = Secrets>(secretDir?: string): T;
export declare function getSecretFactory<S extends Secrets = Secrets>(secrets: S): GetSecretFn<S>;
export declare const secrets: Secrets;
export declare const getSecret: GetSecretFn;
