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
exports.tyrann = void 0;
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("./utils");
exports.tyrann = function (api, axiosInstance, options) {
    var axios = axiosInstance || axios_1.default.create();
    var fetch = function (method, path, config) { return __awaiter(void 0, void 0, void 0, function () {
        var operation, finalUrl, sanitizedParams, sanitizedParams, startTime, axiosOptions, _a, _b, response, fullPath, warnError, responseDef, schema, transform, result, ok, e_1;
        var _c, _d;
        var _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    operation = (_e = api.paths[path]) === null || _e === void 0 ? void 0 : _e[method];
                    if (!operation.pathParams) return [3 /*break*/, 2];
                    if ((config === null || config === void 0 ? void 0 : config.pathParams) === undefined) {
                        throw new Error("Path params are not supplied to " + method + " " + path);
                    }
                    return [4 /*yield*/, operation.pathParams.validate(config === null || config === void 0 ? void 0 : config.pathParams)];
                case 1:
                    sanitizedParams = _k.sent();
                    finalUrl = utils_1.formatString(path, sanitizedParams);
                    return [3 /*break*/, 3];
                case 2:
                    finalUrl = path;
                    _k.label = 3;
                case 3:
                    if (!operation.query) return [3 /*break*/, 5];
                    if ((config === null || config === void 0 ? void 0 : config.query) === undefined) {
                        throw new Error("Query params are not supplied to " + method + " " + path);
                    }
                    return [4 /*yield*/, operation.query.validate(config === null || config === void 0 ? void 0 : config.query)];
                case 4:
                    sanitizedParams = _k.sent();
                    if (Object.keys(sanitizedParams).length > 0) {
                        finalUrl += '?' + new URLSearchParams(sanitizedParams).toString();
                    }
                    _k.label = 5;
                case 5:
                    startTime = Date.now();
                    _a = [__assign({ url: finalUrl, method: method }, config)];
                    _b = (config === null || config === void 0 ? void 0 : config.data);
                    if (!_b) return [3 /*break*/, 7];
                    _c = {};
                    return [4 /*yield*/, operation.body.validate(config.data)];
                case 6:
                    _b = (_c.data = _k.sent(),
                        _c);
                    _k.label = 7;
                case 7:
                    axiosOptions = __assign.apply(void 0, _a.concat([(_b)]));
                    (_f = options === null || options === void 0 ? void 0 : options.onRequest) === null || _f === void 0 ? void 0 : _f.call(options, axiosOptions);
                    return [4 /*yield*/, axios.request(axiosOptions)];
                case 8:
                    response = _k.sent();
                    (_g = options === null || options === void 0 ? void 0 : options.onResponse) === null || _g === void 0 ? void 0 : _g.call(options, Date.now() - startTime, response, axiosOptions);
                    fullPath = response.request.responseURL || finalUrl;
                    warnError = function () {
                        console.warn(method + " " + fullPath + " received unexpected data with code " + response.status + ": \n" + fullPath + "\n" + JSON.stringify(response.data, undefined, 2));
                    };
                    responseDef = (_j = (_h = operation) === null || _h === void 0 ? void 0 : _h.responses) === null || _j === void 0 ? void 0 : _j["" + response.status];
                    schema = responseDef;
                    if (schema === undefined) {
                        warnError();
                        throw new Error(method + " " + fullPath + " response of status " + response.status + " is not handled");
                    }
                    if (responseDef.schema !== undefined) {
                        schema = responseDef.schema;
                        transform = responseDef.transform;
                    }
                    _k.label = 9;
                case 9:
                    _k.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, schema.validate(response.data)];
                case 10:
                    result = _k.sent();
                    result = transform ? transform(result) : result;
                    ok = response.status >= 200 && response.status < 400;
                    return [2 /*return*/, (_d = {
                                ok: ok,
                                path: path,
                                url: finalUrl,
                                status: response.status
                            },
                            _d[response.status] = result,
                            _d)];
                case 11:
                    e_1 = _k.sent();
                    warnError();
                    throw new Error(method + " " + fullPath + " got invalid data: " + JSON.stringify(e_1.errors, undefined, 2));
                case 12: return [2 /*return*/];
            }
        });
    }); };
    var get = function (path, config) { return fetch("get", path, config); };
    var post = function (path, body, config) { return fetch("post", path, __assign({ data: body }, config)); };
    // const put: PostType = (path, body, config) => fetch("put", path, { data: body, ...config });
    var del = function (path, config) { return fetch("delete", path, config); };
    return {
        fetch: fetch,
        get: get,
        post: post,
        // put,
        del: del,
        api: api,
        axios: axios,
    };
};
