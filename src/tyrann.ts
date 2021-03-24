import * as yup from 'yup'
import queryString, { StringifyOptions } from 'query-string'
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { Api, BasePaths, InferPaths } from './api'
import { Methods, Path } from './path'
import {
  MapOperationToBodyType,
  MapOperationToPathParamsType,
  MapOperationToQueryType,
  MapOperationToResponse,
  Operation,
} from './operation'
import { formatString } from './utils'


type NonNullable<T> = Exclude<T, null | undefined>;


export type TyrannConfig<OperationType extends Operation> = AxiosRequestConfig & {
    query?: MapOperationToQueryType<OperationType>,
    pathParams?: MapOperationToPathParamsType<OperationType>,
    queryOptions?: StringifyOptions,
};

export interface TyrannOptions {
    onRequest?: (axiosOptions: AxiosRequestConfig) => void | Promise<void>;
    onResponse?: (latency: number, response: AxiosResponse<any>, axiosOptions: AxiosRequestConfig) => void | Promise<void>;
}

export const tyrann = <Paths extends BasePaths, ApiType extends Api<Paths>>(
    api: ApiType, axiosInstance?: AxiosInstance, options?: TyrannOptions
) => {
    const axios = axiosInstance || Axios.create();

    type ApiPaths = InferPaths<ApiType>;
    type PathTypes = keyof ApiPaths & string;
    type ValidMethods = Methods & keyof Path;

    type FetchType = <PathType extends PathTypes, Method extends ValidMethods>(
        method: Method,
        path: PathType,
        config?: TyrannConfig<NonNullable<ApiPaths[PathType][typeof method]>>
    ) => Promise<
        MapOperationToResponse<NonNullable<ApiPaths[PathType][typeof method]>>
    >;

    type MethodType<Method extends ValidMethods> = <PathType extends PathTypes>(
        path: PathType,
        config?: TyrannConfig<NonNullable<ApiPaths[PathType][Method]>>
    ) => Promise<
        MapOperationToResponse<NonNullable<ApiPaths[PathType][Method]>>
    >;

    type PostType = <PathType extends PathTypes>(
        path: PathType,
        body: MapOperationToBodyType<NonNullable<ApiPaths[PathType]["post"]>>,
        config?: TyrannConfig<NonNullable<ApiPaths[PathType]["post"]>>
    ) => Promise<
        MapOperationToResponse<NonNullable<ApiPaths[PathType]["post"]>>
    >;

    type PutType = <PathType extends PathTypes>(
        path: PathType,
        body: MapOperationToBodyType<NonNullable<ApiPaths[PathType]["put"]>>,
        config?: TyrannConfig<NonNullable<ApiPaths[PathType]["put"]>>
    ) => Promise<
        MapOperationToResponse<NonNullable<ApiPaths[PathType]["put"]>>
    >;

    const fetch: FetchType = async (method, path, config) => {
        const operation = (api as any).paths[path]?.[method] as Operation;
        if (operation.transformBody && config) {
            config.data = operation.transformBody(config?.data);
        }
        let finalUrl: string;
        if (operation.pathParams) {
            if (config?.pathParams === undefined) {
                throw new Error(`Path params are not supplied to ${method} ${path}`);
            }
            const sanitizedParams = await operation.pathParams.validate(config?.pathParams!);
            finalUrl = formatString(path, sanitizedParams);
        } else {
            finalUrl = path;
        }
        if (operation.query) {
            if (config?.query === undefined) {
                throw new Error(`Query params are not supplied to ${method} ${path}`);
            }
            const sanitizedParams = await (('__isYupSchema__' in operation.query) ?
                 operation.query.validate(config?.query!) :
                 operation.query.schema.validate(config?.query)
            );

            const finalParams = '__isYupSchema__' in operation.query ? 
                sanitizedParams : operation.query.transform(sanitizedParams);

            if (Object.keys(finalParams).length > 0) {
                finalUrl += '?' + queryString.stringify(finalParams, config.queryOptions);
            }
        }

        let startTime = Date.now();
        const axiosOptions = {
            url: finalUrl,
            method: method as AxiosRequestConfig['method'],
            ...config,
            ...(config?.data && {
                data: await operation.body.validate(config.data)
            })
        };

        options?.onRequest?.(axiosOptions);

        const response = await axios.request(axiosOptions);

        options?.onResponse?.(Date.now() - startTime, response, axiosOptions);

        const fullPath = response.request.responseURL || finalUrl;

        const warnError = () => {
            console.warn(`${method} ${fullPath} received unexpected data with code ${response.status}: \n${fullPath}\n${JSON.stringify(response.data, undefined, 2)}`)
        }

        const responseDef = (operation as any)?.responses?.[`${response.status}`];
        let schema: yup.BaseSchema | undefined = responseDef;

        if (schema === undefined) {
            warnError();
            throw new Error(`${method} ${fullPath} response of status ${response.status} is not handled`);
        }

        let transform: any;

        if (responseDef.schema !== undefined) {
            schema = responseDef.schema;
            transform = responseDef.transform;
        }

        try {
            let result = await schema!.validate(response.data);
            result = transform ? transform(result) : result;
            const ok = response.status >= 200 && response.status < 400;

            return {
                ok,
                path,
                url: finalUrl,
                status: response.status,
                [response.status]: result
            } as any
        } catch (e) {
            warnError();
            throw new Error(`${method} ${fullPath} got invalid data: ${JSON.stringify(e.errors, undefined, 2)}`);
        }
    }

    const get: MethodType<"get"> = (path, config) => fetch("get", path, config);
    const post: PostType = (path, body, config) => fetch("post", path, { data: body, ...config });
    const put: PutType = (path, body, config) => fetch("put", path, { data: body, ...config });
    const del: MethodType<"delete"> = (path, config) => fetch("delete", path, config);

    return {
        fetch,
        get,
        post,
        put,
        del,
        api,
        axios,
    };
}