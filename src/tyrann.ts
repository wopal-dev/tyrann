import { Api, BasePaths, InferPaths } from "./api";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Methods, Path } from "./path";
import { MapOperationToBodyType, MapOperationToResponse } from "./operation";
import * as yup from 'yup';


type NonNullable<T> = Exclude<T, null | undefined>

export const tyrann = <Paths extends BasePaths, ApiType extends Api<Paths>>(
    api: ApiType, axiosInstance: AxiosInstance
) => {
    const axios = axiosInstance;

    type ApiPaths = InferPaths<ApiType>;
    type PathTypes = keyof ApiPaths & string;
    type ValidMethods = Methods & keyof Path;


    type FetchType = <PathType extends PathTypes, Method extends ValidMethods>(
        method: Method,
        path: PathType,
        config?: Partial<AxiosRequestConfig>
    ) => Promise<
        MapOperationToResponse<NonNullable<ApiPaths[PathType][typeof method]>>
    >;

    type MethodType<Method extends ValidMethods> = <PathType extends PathTypes>(
        path: PathType,
        config?: Partial<AxiosRequestConfig>
    ) => Promise<
        MapOperationToResponse<NonNullable<ApiPaths[PathType][Method]>>
    >;

    type PostType = <PathType extends PathTypes>(
        path: PathType,
        body: MapOperationToBodyType<NonNullable<ApiPaths[PathType]["post"]>>,
        config?: Partial<AxiosRequestConfig>
    ) => Promise<
        MapOperationToResponse<NonNullable<ApiPaths[PathType]["post"]>>
    >;

    const fetch: FetchType = async (method, path, config) => {
        const response = await axios.request({
            url: path,
            method: method as AxiosRequestConfig['method'],
            ...config,
        });

        const schema = (api as any).paths[path]?.[method]?.[`${response.status}`] as yup.BaseSchema;

        if (schema === undefined) {
            throw new Error(`${method} ${path} response of status ${response.status} is not handled`);
        }

        try {
            const result = await schema.validate(response.data);
            return {
                [response.status]: result
            } as any
        } catch (e) {
            throw new Error(`${method} ${path} got invalid data: ${JSON.stringify(e)}`);
        }
    }

    const get: MethodType<"get"> = (path, config) => fetch("get", path, config);
    const post: PostType = (path, body, config) => fetch("post", path, {data: body, ...config});
    const put: PostType = (path, body, config) => fetch("put", path, {data: body, ...config});
    const del: MethodType<"delete"> = (path, config) => fetch("delete", path, config);

    return {
        fetch,
        get,
        post,
        put,
        del
    };
}