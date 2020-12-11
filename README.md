# tyrann
An easy solution to keep your REST calls and data types in the same place

## Overview

+ Describe your data

```typescript
import { tyrann } from "./tyrann";
const api = {
    paths: {
        "/coordinate": {
            post: {
                body: yup.object({
                    x: yup.number().required(),
                    y: yup.number().required(),
                }),
                responses: {
                    '200': yup.object({
                        id: yup.number().required(),
                        outside_the_plane: yup.boolean(),
                    })
                }
            }
        },
        "/coordinate/{id}": {
            get: {
                path: yup.object({
                    id: yup.number().required(),
                }),
                responses: {
                    '200': yup.object({
                        x: yup.number().required(),
                        y: yup.number().required(),
                    })
                }
            }
        },
    }
};

const client = tyrann(api);
```

+ Ask for what you want
```typescript
    const response = await client.fetch("get", "/coordinate/{id}", {
        pathParams: { id: 1 }
    })
```

+ Get predictable results
```typescript
    console.log(response['200'])
    {
        "x": 114,
        "y": 514
    }
```
