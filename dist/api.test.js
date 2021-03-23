"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tyrann_1 = require("./tyrann");
var yup = __importStar(require("yup"));
var axios_1 = __importDefault(require("axios"));
var idSchema = yup.object({
    id: yup.string(),
});
// @ts-expect-error
var id1 = {};
var id2 = {};
var id3 = { id: undefined };
var id4 = {};
var api = {
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
        "/put": {
            put: {
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
                        transform: function (i) { return i.brotli + i.method; },
                    }
                }
            }
        },
        "/transform/query/": {
            get: {
                query: {
                    schema: yup.object({
                        x: yup.number(),
                    }),
                    transform: function (x) { return (__assign(__assign({}, x), { a: 1 })); }
                },
                responses: {
                    '200': {
                        schema: yup.object({
                            brotli: yup.string().required(),
                            method: yup.string().required(),
                        }),
                        transform: function (i) { return i.brotli + i.method; },
                    }
                }
            }
        },
    }
};
var instance = axios_1.default.create();
var client = tyrann_1.tyrann(api, instance);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.fetch("get", "/brotli").then(function (x) {
                    var _a;
                    (_a = x[200]) === null || _a === void 0 ? void 0 : _a.brotli;
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.fetch("post", "/brotli").then(function (x) {
                        var _a;
                        // @ts-expect-error
                        (_a = x[200]) === null || _a === void 0 ? void 0 : _a.brotli;
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.put("/put", { x: 1, y: 1 })];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.get("/brotli").then(function (x) {
                        var _a;
                        (_a = x[200]) === null || _a === void 0 ? void 0 : _a.brotli;
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, client.post("/brotli", undefined).then(function (x) {
                        var _a;
                        // @ts-expect-error
                        (_a = x[200]) === null || _a === void 0 ? void 0 : _a.brotli;
                    })];
            case 5:
                _a.sent();
                // @ts-expect-error
                return [4 /*yield*/, client.post("/post", {}).then(function (x) {
                        var _a;
                        (_a = x[200]) === null || _a === void 0 ? void 0 : _a.brotli;
                    })];
            case 6:
                // @ts-expect-error
                _a.sent();
                return [4 /*yield*/, client.post("/post", { x: 1, y: 1 }).then(function (x) {
                        var _a;
                        (_a = x[200]) === null || _a === void 0 ? void 0 : _a.brotli;
                    })];
            case 7:
                _a.sent();
                // @ts-expect-error
                return [4 /*yield*/, client.post("/post").then(function (x) {
                        var _a;
                        (_a = x[200]) === null || _a === void 0 ? void 0 : _a.brotli;
                    })];
            case 8:
                // @ts-expect-error
                _a.sent();
                return [4 /*yield*/, client.get("/query", {
                        query: {
                            a: "a",
                            b: "b"
                        }
                    }).then(function (x) {
                        var _a;
                        (_a = x[200]) === null || _a === void 0 ? void 0 : _a.brotli;
                    })];
            case 9:
                _a.sent();
                return [4 /*yield*/, client.get("/transform/{id}", {
                        pathParams: {
                            id: 1
                        }
                    }).then(function (x) {
                        var s = x[200];
                    })];
            case 10:
                _a.sent();
                return [4 /*yield*/, client.get("/transform/{id}", {
                        // @ts-expect-error
                        pathParams: {}
                    }).then(function (x) {
                        var s = x[200];
                    })];
            case 11:
                _a.sent();
                return [4 /*yield*/, client.get("/transform/query/", {
                        query: {
                            x: 1,
                        }
                    }).then(function (x) {
                        var s = x[200];
                    })];
            case 12:
                _a.sent();
                return [4 /*yield*/, client.get("/not-required/{id}", {
                        pathParams: {}
                    })];
            case 13:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var idSchema2 = yup.object({
    id: yup.string(),
    id2: yup.string().defined(),
});
var t = {
    id2: "11",
};
