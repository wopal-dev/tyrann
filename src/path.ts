import { Operation } from "./operation";

export type Path = {
    summary?: string;
    description?: string;
    get?: Operation;
    post?: Operation;
    put?: Operation;
    delete?: Operation;
    head?: Operation;
    patch?: Operation;
    trace?: Operation;
}

export type Methods = "get" | "post" | "put" | "delete" | "head" | "path" | "trace";

