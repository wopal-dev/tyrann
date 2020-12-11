import { HttpStatus } from "./http-status";
import * as yup from 'yup';

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

export type MapOperationToResponse<OperationType extends Operation> = {
    [x in HttpStatus]?: yup.InferType<OperationType['responses'][x]>
}

export type InferResponses<F> = F extends Operation<infer Responses> ? Responses : never;

