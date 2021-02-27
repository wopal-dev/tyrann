import { Operation } from "./operation";
export declare type Path = {
    summary?: string;
    description?: string;
    get?: Operation;
    post?: Operation;
    put?: Operation;
    delete?: Operation;
    head?: Operation;
    patch?: Operation;
    trace?: Operation;
};
export declare type Methods = "get" | "post" | "put" | "delete" | "head" | "path" | "trace";
