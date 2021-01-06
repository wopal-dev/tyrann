import { tyrann } from "./tyrann";
import * as yup from 'yup';
import Axios from "axios";
import { InferInterfaceFromShape, InferShape, UndefinableKeys } from "./operation";

const idSchema = yup.object({
    id: yup.string(),
});

type IdSchema = yup.TypeOf<typeof idSchema>;

interface Id2 {
    id?: string;    
} 

type Id3 = {
    [K in "id"]?: string;
}

// @ts-expect-error
const id1: IdSchema = {};
const id2: Id2 = {};
const id3: IdSchema = { id: undefined };
const id4: Id3 = {};

type A = {
    a: number;
};

type NullableA = {
    a?: number;
};

type C = A extends NullableA ? unknown : never;
declare const c: C;

type D = NullableA extends A ? unknown : never;
// @ts-expect-error
declare const d: D = 1;

const api = {
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
        },
        "/post": {
            post: {
                body: yup.object({
                    x: yup.number().required(),
                    y: yup.number().required(),
                }),
                responses: {
                    '200': yup.object({
                        brotli: yup.string().required(),
                        method: yup.string().required(),
                    })
                }
            }
        },
        "/query": {
            get: {
                query: yup.object({
                    a: yup.string().required(),
                    b: yup.string().required(),
                }),
                responses: {
                    '200': yup.object({
                        brotli: yup.string().required(),
                        method: yup.string().required(),
                    })
                }
            }
        },
        "/path/{id}": {
            get: {
                pathParams: yup.object({
                    id: yup.number().required(),
                }),
                responses: {
                    '200': yup.object({
                        brotli: yup.string().required(),
                        method: yup.string().required(),
                    })
                }
            }
        },
        "/not-required/{id}": {
            get: {
                pathParams: yup.object({
                    id: yup.number(),
                }),
                responses: {
                    '200': yup.object({
                        brotli: yup.string().required(),
                        method: yup.string().required(),
                    })
                }
            }
        },
        "/transform/{id}": {
            get: {
                pathParams: yup.object({
                    id: yup.number().required(),
                }),
                responses: {
                    '200': {
                        schema: yup.object({
                            brotli: yup.string().required(),
                            method: yup.string().required(),
                        }),
                        transform: (i: {brotli: string, method: string}) => i.brotli + i.method,
                    }
                }
            }
        },
    }
};

const instance = Axios.create();
const client = tyrann(api, instance);

async () => {
    await client.fetch("get", "/brotli").then(x => {
        x[200]?.brotli;
    });

    await client.fetch("post", "/brotli").then(x => {
        // @ts-expect-error
        x[200]?.brotli;
    });

    await client.get("/brotli").then(x => {
        x[200]?.brotli;
    });

    await client.post("/brotli", undefined).then(x => {
        // @ts-expect-error
        x[200]?.brotli;
    });

    // @ts-expect-error
    await client.post("/post", {}).then(x => {
        x[200]?.brotli;
    });

    await client.post("/post", { x: 1, y: 1 }).then(x => {
        x[200]?.brotli;
    });

    // @ts-expect-error
    await client.post("/post").then(x => {
        x[200]?.brotli;
    });

    await client.get("/query", {
        query: {
            a: "a",
            b: "b"
        }
    }).then(x => {
        x[200]?.brotli;
    });

    await client.get("/transform/{id}", {
        pathParams: {
            id: 1
        }
    }).then(x => {
        const s: string | undefined = x[200];
    });

    await client.get("/transform/{id}", {
        // @ts-expect-error
        pathParams: {
        }
    }).then(x => {
        const s: string | undefined = x[200];
    });

    await client.get("/not-required/{id}", {
        pathParams: {
        }
    });
}

const idSchema2 = yup.object({
    id: yup.string(),
    id2: yup.string().defined(),
});

type Shape = InferShape<typeof idSchema2>;

type Interface = InferInterfaceFromShape<Shape>;

const t: Interface = {
    id2: "11",
};