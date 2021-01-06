import { HttpStatus } from "./http-status";
import * as yup from 'yup';
import { ObjectSchema } from "yup";
import { ObjectShape } from "yup/lib/object";
import { TypedSchema } from "yup/lib/util/types";

export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

export type BaseResponses = {
    [x in HttpStatus]?: AllResponses
}

export type AllResponses = BasicResponse | TransformedResponse;

export type BasicResponse = yup.AnySchema;

export type TransformedResponse<Schema extends yup.AnySchema = yup.AnySchema, OutType = any> = {
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

export type InferShape<TSchema> =
    TSchema extends ObjectSchema<infer Shape> ? Shape : never;

export type UndefinableKeys<Shape extends ObjectShape> = string & {
    [K in keyof Shape]?:
    Shape[K] extends TypedSchema ?
    undefined extends yup.InferType<Shape[K]> ?
    K : never
    : never;
}[keyof Shape];

export type InferInterfaceFromShape<Shape extends ObjectShape> = {
    [K in UndefinableKeys<Shape>]?: Shape[K] extends TypedSchema ? yup.InferType<Shape[K]> : any;
} & {
        [K in Exclude<keyof Shape, UndefinableKeys<Shape>>]: Shape[K] extends TypedSchema ? yup.InferType<Shape[K]> : any;
    }

export type InferInterface<TSchema> =
    InferInterfaceFromShape<InferShape<TSchema>>;

export type Operation<
    Responses extends BaseResponses = BaseResponses,
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

export type InferResponseType<Response> =
    Response extends TransformedResponse<any, infer OutType> ? OutType :
    Response extends BasicResponse ? yup.InferType<Response> : never;


export type MapOperationToResponse<OperationType extends Operation> =
    OperationType['responses'] extends BaseResponses ?
    ResponseExtraField & {
        [x in HttpStatus]?: InferResponseType<OperationType['responses'][x]>
    } : never;

export type MapOperationToBodyType<OperationType extends Operation> =
    OperationType['body'] extends yup.AnySchema ? InferInterface<OperationType['body']> : undefined;

export type MapOperationToQueryType<OperationType extends Operation> =
    OperationType['query'] extends yup.AnySchema ? InferInterface<OperationType['query']> : undefined;

export type MapOperationToPathParamsType<OperationType extends Operation> =
    OperationType['pathParams'] extends yup.AnySchema ? InferInterface<OperationType['pathParams']> : undefined;

export type InferResponses<F> = F extends Operation<infer Responses> ? Responses : never;

