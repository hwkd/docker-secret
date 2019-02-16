export interface Secrets {
    [key: string]: string;
}
export declare type GetSecretFn = (name: string) => string;
export declare function getSecrets(secretDir: string): Secrets;
export declare function getSecretFactory(secrets: Secrets): GetSecretFn;
export declare const SECRET_DIR = "/run/secrets";
export declare const secrets: Secrets;
export declare const getSecret: GetSecretFn;
