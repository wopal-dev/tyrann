import { HttpStatus } from "./http-status";
import * as yup from 'yup';

export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

export type BaseResponses = {
    [x in HttpStatus]?: yup.AnySchema
}

export type ResponseExtraField = {
    ok: boolean,
    path: string,
    url: string,
    status: number,
}

export type BaseResponseType = ResponseExtraField & {
    [x in HttpStatus]?: any;
}

export type Operation<
    Responses extends BaseResponses = any,
    QuerySchema extends yup.AnySchema = any,
    PathParamsSchema extends yup.AnySchema = any,
    BodySchema extends yup.AnySchema = any,
    > = {
        description?: string;
        query?: QuerySchema;
        pathParams?: PathParamsSchema;
        body?: BodySchema;
        responses: Responses;
    };

export type MapOperationToResponse<OperationType extends Operation> =
    OperationType['responses'] extends BaseResponses ?
    ResponseExtraField & {
        [x in HttpStatus]?: yup.InferType<OperationType['responses'][x]>
    } : never;

export type MapOperationToBodyType<OperationType extends Operation> =
    OperationType['body'] extends yup.AnySchema ? yup.InferType<OperationType['body']> : undefined;

export type MapOperationToQueryType<OperationType extends Operation> =
    OperationType['query'] extends yup.AnySchema ? yup.InferType<OperationType['query']> : undefined;

export type MapOperationToPathParamsType<OperationType extends Operation> =
    OperationType['pathParams'] extends yup.AnySchema ? yup.InferType<OperationType['pathParams']> : undefined;

export type InferResponses<F> = F extends Operation<infer Responses> ? Responses : never;

