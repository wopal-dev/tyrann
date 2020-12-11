import { HttpStatus } from "./http-status";
import * as yup from 'yup';

export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

export type BaseResponses = {
    [x in HttpStatus]?: yup.AnySchema
}

export type Operation<
    Responses extends BaseResponses = any,
    BodySchema extends yup.AnySchema = any,
    QuerySchema extends yup.AnySchema = any,
    > = {
        description?: string;
        query?: QuerySchema;
        body?: BodySchema;
        responses: Responses;
    };

export type MapOperationToResponse<OperationType extends Operation> =
    OperationType['responses'] extends BaseResponses ? {
    [x in HttpStatus]?: yup.InferType<OperationType['responses'][x]>
} : never;

export type MapOperationToBodyType<OperationType extends Operation> =
    OperationType['body'] extends yup.AnySchema ? yup.InferType<OperationType['body']> : undefined;

export type InferResponses<F> = F extends Operation<infer Responses> ? Responses : never;

