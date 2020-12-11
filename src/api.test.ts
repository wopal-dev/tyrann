import { Api, InferClient } from "./api";
import * as yup from 'yup';

const api = {
    baseUrl: "https://httpbin.org",
    paths: {
        "/brotli": {
            get: {
                responses: {
                    '200': yup.object({
                        brotli: yup.string().required(),
                        method: yup.string().required(),
                    })
                }
            }
        }
    }
};

let client: InferClient<typeof api> = {} as any;

client.fetch("get", "/brotli").then(x => {
    x[200]?.brotli;
});

client.fetch("post", "/brotli").then(x => {
    x[200]?.brotli;
});