import { Api, BasePaths, InferPaths } from "./api";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { MapOperationToBodyType, MapOperationToPathParamsType, MapOperationToQueryType, MapOperationToResponse, Operation } from "./operation";
declare type NonNullable<T> = Exclude<T, null | undefined>;
export declare type TyrannConfig<OperationType extends Operation> = AxiosRequestConfig & {
    query?: MapOperationToQueryType<OperationType>;
    pathParams?: MapOperationToPathParamsType<OperationType>;
};
export interface TyrannOptions {
    onRequest?: (axiosOptions: AxiosRequestConfig) => void | Promise<void>;
    onResponse?: (latency: number, response: AxiosResponse<any>, axiosOptions: AxiosRequestConfig) => void | Promise<void>;
}
export declare const tyrann: <Paths extends BasePaths<any>, ApiType extends Api<Paths>>(api: ApiType, axiosInstance?: AxiosInstance | undefined, options?: TyrannOptions | undefined) => {
    fetch: <PathType extends keyof InferPaths<ApiType> & string, Method extends "get" | "delete" | "post" | "put" | "head" | "trace">(method: Method, path: PathType, config?: TyrannConfig<Exclude<InferPaths<ApiType>[PathType][Method], null | undefined>> | undefined) => Promise<MapOperationToResponse<Exclude<InferPaths<ApiType>[PathType][Method], null | undefined>>>;
    get: <PathType_1 extends keyof InferPaths<ApiType> & string>(path: PathType_1, config?: TyrannConfig<Exclude<InferPaths<ApiType>[PathType_1]["get"], null | undefined>> | undefined) => Promise<MapOperationToResponse<Exclude<InferPaths<ApiType>[PathType_1]["get"], null | undefined>>>;
    post: <PathType_3 extends keyof InferPaths<ApiType> & string>(path: PathType_3, body: MapOperationToBodyType<Exclude<InferPaths<ApiType>[PathType_3]["post"], null | undefined>>, config?: TyrannConfig<Exclude<InferPaths<ApiType>[PathType_3]["post"], null | undefined>> | undefined) => Promise<MapOperationToResponse<Exclude<InferPaths<ApiType>[PathType_3]["post"], null | undefined>>>;
    del: <PathType_4 extends keyof InferPaths<ApiType> & string>(path: PathType_4, config?: TyrannConfig<Exclude<InferPaths<ApiType>[PathType_4]["delete"], null | undefined>> | undefined) => Promise<MapOperationToResponse<Exclude<InferPaths<ApiType>[PathType_4]["delete"], null | undefined>>>;
    api: ApiType;
    axios: AxiosInstance;
};
export {};
