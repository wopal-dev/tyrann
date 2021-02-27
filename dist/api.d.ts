import { Path } from "./path";
export declare type BasePaths<PathsType extends {} = any> = {
    [path in keyof PathsType]: Path;
};
export declare type Api<Paths extends BasePaths = any> = {
    paths: Paths;
};
export declare type InferPaths<ApiType extends Api> = ApiType extends Api<infer Paths> ? Paths : never;
