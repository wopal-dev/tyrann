import { MapOperationToResponse } from "./operation";
import { Methods, Path } from "./path"

export type BasePaths<PathsType extends {} = any> = {
    [path in keyof PathsType]: Path;
}

export type Api<
    Paths extends BasePaths = any
> = {
    baseUrl: string;
    paths: Paths;
}

export type InferPaths<ApiType extends Api> = ApiType extends Api<infer Paths> ? Paths : never;

export type InferClient<ApiType extends Api> = {
    fetch: <Path extends keyof InferPaths<ApiType>, Method extends Methods>(method: Method, path: Path) => Promise<
        MapOperationToResponse<InferPaths<ApiType>[Path][typeof method]>
    >;
}