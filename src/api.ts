import { Path } from "./path";

export type BasePaths<PathsType extends {} = any> = {
  [path in keyof PathsType]: Path;
};

export type Api<Paths extends BasePaths = any> = {
  paths: Paths;
};

export type InferPaths<ApiType extends Api> = ApiType extends Api<infer Paths>
  ? Paths
  : never;
