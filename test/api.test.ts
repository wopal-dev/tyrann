import Axios from "axios";
import * as yup from "yup";

import { tyrann } from "../src/tyrann";

const idSchema = yup.object({
  id: yup.string().defined(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type IdSchema = yup.InferType<typeof idSchema>;

const xySchema = yup.object({
  x: yup.number().required(),
  y: yup.number().required(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type XYSchema = yup.InferType<typeof xySchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const xy1: XYSchema = {
  x: 1,
  y: 1,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const xy2: XYSchema = {
  // @ts-expect-error
  x: undefined,
  y: 1,
};

type A = {
  a: number;
};

type NullableA = {
  a?: number;
};

type C = A extends NullableA ? unknown : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const c: C;

type D = NullableA extends A ? unknown : never;
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const d: D = 1;

const api = {
  paths: {
    "/brotli": {
      get: {
        responses: {
          "200": yup.object({
            brotli: yup.string().required(),
            method: yup.string().required(),
          }),
        },
      },
    },
    "/post": {
      post: {
        body: yup.object({
          x: yup.number().required(),
          y: yup.number().required(),
        }),
        responses: {
          "200": yup.object({
            brotli: yup.string().required(),
            method: yup.string().required(),
          }),
        },
      },
    },
    "/put": {
      put: {
        body: yup.object({
          x: yup.number().required(),
          y: yup.number().required(),
        }),
        responses: {
          "200": yup.object({
            brotli: yup.string().required(),
            method: yup.string().required(),
          }),
        },
      },
    },
    "/query": {
      get: {
        query: yup.object({
          a: yup.string().required(),
          b: yup.string().required(),
        }),
        responses: {
          "200": yup.object({
            brotli: yup.string().required(),
            method: yup.string().required(),
          }),
        },
      },
    },
    "/path/{id}": {
      get: {
        pathParams: yup.object({
          id: yup.number().required(),
        }),
        responses: {
          "200": yup.object({
            brotli: yup.string().required(),
            method: yup.string().required(),
          }),
        },
      },
    },
    "/not-required/{id}": {
      get: {
        pathParams: yup.object({
          id: yup.number(),
        }),
        responses: {
          "200": yup.object({
            brotli: yup.string().required(),
            method: yup.string().required(),
          }),
        },
      },
    },
    "/transform/{id}": {
      get: {
        pathParams: yup.object({
          id: yup.number().required(),
        }),
        responses: {
          "200": {
            schema: yup.object({
              brotli: yup.string().required(),
              method: yup.string().required(),
            }),
            transform: (i: { brotli: string; method: string }) =>
              i.brotli + i.method,
          },
        },
      },
    },
    "/transform/query/": {
      get: {
        query: {
          schema: yup.object({
            x: yup.number(),
          }),
          transform: (x: {}) => ({ ...x, a: 1 }),
        },
        responses: {
          "200": {
            schema: yup.object({
              brotli: yup.string().required(),
              method: yup.string().required(),
            }),
            transform: (i: { brotli: string; method: string }) =>
              i.brotli + i.method,
          },
        },
      },
    },
  },
};

const instance = Axios.create();
const client = tyrann(api, instance);

async () => {
  await client.fetch("get", "/brotli").then((x) => {
    x[200]?.brotli;
  });

  await client.fetch("post", "/brotli").then((x) => {
    // @ts-expect-error
    x[200]?.brotli;
  });

  await client.put("/put", { x: 1, y: 1 });

  await client.get("/brotli").then((x) => {
    x[200]?.brotli;
  });

  await client.post("/brotli", undefined).then((x) => {
    // @ts-expect-error
    x[200]?.brotli;
  });

  // @ts-expect-error
  await client.post("/post", {}).then((x) => {
    x[200]?.brotli;
  });

  await client.post("/post", { x: 1, y: 1 }).then((x) => {
    x[200]?.brotli;
  });

  // @ts-expect-error
  await client.post("/post").then((x) => {
    x[200]?.brotli;
  });

  await client
    .get("/query", {
      query: {
        a: "a",
        b: "b",
      },
    })
    .then((x) => {
      x[200]?.brotli;
    });

  await client
    .get("/transform/{id}", {
      pathParams: {
        id: 1,
      },
    })
    .then((x) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const s: string | undefined = x[200];
    });

  await client
    .get("/transform/{id}", {
      // @ts-expect-error
      pathParams: {},
    })
    .then((x) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const s: string | undefined = x[200];
    });

  await client
    .get("/transform/query/", {
      query: {
        x: 1,
      },
    })
    .then((x) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const s: string | undefined = x[200];
    });

  await client.get("/not-required/{id}", {
    pathParams: {},
  });
};
