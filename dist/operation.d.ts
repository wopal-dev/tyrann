import { HttpStatus } from "./http-status";
import * as yup from 'yup';
import { InferInterface } from "./schemaUtils";
export declare type BaseResponses = {
    [x in HttpStatus]?: AllResponses;
};
export declare type AllResponses = BasicResponse | TransformedResponse;
export declare type BasicResponse = yup.AnySchema;
export declare type TransformedResponse<Schema extends yup.AnySchema = yup.AnySchema, OutType = any> = {
    schema: Schema;
    transform: (sanitizedData: yup.InferType<Schema>) => OutType;
};
export declare type ResponseExtraField = {
    ok: boolean;
    path: string;
    url: string;
    status: number;
};
export declare type BaseResponseType = ResponseExtraField & {
    [x in HttpStatus]?: any;
};
export declare type Operation<Responses extends BaseResponses = BaseResponses, QuerySchema extends yup.AnySchema = any, PathParamsSchema extends yup.AnySchema = any, BodySchema extends yup.AnySchema = any> = {
    description?: string;
    query?: QuerySchema;
    pathParams?: PathParamsSchema;
    body?: BodySchema;
    responses: Responses;
};
export declare type InferResponseType<Response> = Response extends TransformedResponse<any, infer OutType> ? OutType : Response extends BasicResponse ? yup.InferType<Response> : never;
export declare type MapOperationToResponse<OperationType extends Operation> = OperationType['responses'] extends BaseResponses ? ResponseExtraField & {
    [x in HttpStatus]?: InferResponseType<OperationType['responses'][x]>;
} : never;
export declare type MapOperationToBodyType<OperationType extends Operation> = OperationType['body'] extends yup.AnySchema ? InferInterface<OperationType['body']> : undefined;
export declare type MapOperationToQueryType<OperationType extends Operation> = OperationType['query'] extends yup.AnySchema ? InferInterface<OperationType['query']> : undefined;
export declare type MapOperationToPathParamsType<OperationType extends Operation> = OperationType['pathParams'] extends yup.AnySchema ? InferInterface<OperationType['pathParams']> : undefined;
export declare type InferResponses<F> = F extends Operation<infer Responses> ? Responses : never;
