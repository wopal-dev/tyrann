import { HttpStatus } from "./http-status";
import * as yup from 'yup';
import { InferInterface } from "./schemaUtils";


export type BaseResponses = {
    [x in HttpStatus]?: GenericSchema
}

export type GenericSchema = BasicSchema | TransformedSchema;

export type BasicSchema = yup.AnySchema;

export type TransformedSchema<Schema extends yup.AnySchema = yup.AnySchema, OutType = any> = {
    schema: Schema,
    transform: (sanitizedData: yup.InferType<Schema>) => OutType
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
    Responses extends BaseResponses = BaseResponses,
    QuerySchema extends GenericSchema = GenericSchema,
    PathParamsSchema extends yup.AnySchema = any,
    BodySchema extends yup.AnySchema = any,
    > = {
        description?: string;
        query?: QuerySchema;
        pathParams?: PathParamsSchema;
        body?: BodySchema;
        responses: Responses;
    };

export type InferResponseType<Response> =
    Response extends TransformedSchema<any, infer OutType> ? OutType :
    Response extends BasicSchema ? yup.InferType<Response> : never;


export type MapOperationToResponse<OperationType extends Operation> =
    OperationType['responses'] extends BaseResponses ?
    ResponseExtraField & {
        [x in HttpStatus]?: InferResponseType<OperationType['responses'][x]>
    } : never;

export type MapOperationToBodyType<OperationType extends Operation> =
    OperationType['body'] extends yup.AnySchema ? InferInterface<OperationType['body']> : undefined;

export type MapOperationToQueryType<OperationType extends Operation> =
    OperationType['query'] extends GenericSchema ? InferInterface<OperationType['query']> : undefined;

export type MapOperationToPathParamsType<OperationType extends Operation> =
    OperationType['pathParams'] extends yup.AnySchema ? InferInterface<OperationType['pathParams']> : undefined;

export type InferResponses<F> = F extends Operation<infer Responses> ? Responses : never;

