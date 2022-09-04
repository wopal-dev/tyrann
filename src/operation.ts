import * as yup from "yup";

import { HttpStatus } from "./http-status";

export type BaseResponses = {
  [x in HttpStatus]?: GenericSchema;
};

export type GenericSchema = BasicSchema | TransformedSchema;

export type BasicSchema = yup.Schema;

export type TransformedSchema<
  Schema extends yup.Schema = yup.Schema,
  OutType = any
> = {
  schema: Schema;
  transform: (sanitizedData: yup.InferType<Schema>) => OutType;
};

export type ResponseExtraField = {
  ok: boolean;
  path: string;
  url: string;
  status: number;
};

export type BaseResponseType = ResponseExtraField & {
  [x in HttpStatus]?: any;
};

export type Operation<
  Responses extends BaseResponses = BaseResponses,
  QuerySchema extends GenericSchema = GenericSchema,
  PathParamsSchema extends yup.Schema = any,
  BodySchema extends yup.Schema = any
> = {
  description?: string;
  query?: QuerySchema;
  pathParams?: PathParamsSchema;
  body?: BodySchema;
  transformBody?: (body: any) => any;
  responses: Responses;
};

export type InferResponseType<Response> = Response extends TransformedSchema<
  any,
  infer OutType
>
  ? OutType
  : Response extends BasicSchema
  ? yup.InferType<Response>
  : never;

export type MapOperationToResponse<OperationType extends Operation> =
  OperationType["responses"] extends BaseResponses
    ? ResponseExtraField & {
        [x in HttpStatus]?: InferResponseType<OperationType["responses"][x]>;
      }
    : never;

export type MapOperationToBodyType<OperationType extends Operation> =
  OperationType["body"] extends yup.Schema
    ? yup.InferType<OperationType["body"]>
    : undefined;

export type MapOperationToQueryType<OperationType extends Operation> =
  OperationType["query"] extends BasicSchema
    ? yup.InferType<OperationType["query"]>
    : OperationType["query"] extends TransformedSchema
    ? yup.InferType<OperationType["query"]["schema"]>
    : never;

export type MapOperationToPathParamsType<OperationType extends Operation> =
  OperationType["pathParams"] extends yup.Schema
    ? yup.InferType<OperationType["pathParams"]>
    : undefined;

export type InferResponses<F> = F extends Operation<infer Responses>
  ? Responses
  : never;
