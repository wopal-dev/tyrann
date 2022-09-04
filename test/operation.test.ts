import * as yup from "yup";

import { InferResponses } from "../src/operation";

const op = {
  description: "Let's go to shimokitazawa",
  responses: {
    "200": yup.object({
      a: yup.string(),
    }),
    "201": yup.object({
      b: yup.string(),
    }),
  },
};

type a = InferResponses<typeof op>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type b = a["200"];
