import { HttpStatus } from "./http-status";
import * as yup from 'yup';
import { InferResponses } from "./operation";


const op = {
    description: "Let's go to shimokitazawa",
    responses: {
        '200': yup.object({
            a: yup.string()
        }),
        '201': yup.object({
            b: yup.string()
        }),
    }
};

type a = InferResponses<typeof op>;
type b = a['200']

