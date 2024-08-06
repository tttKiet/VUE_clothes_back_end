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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.authController = void 0;
var services_1 = require("../../services");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var api_error_1 = __importDefault(require("../../utils/api-error"));
var validate_req_body_1 = require("../../utils/validate-req-body");
var AuthController = /** @class */ (function () {
    function AuthController() {
        var _this = this;
        this.handleLogin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, password, so_dien_thoai, isValid, result, error_1, err;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = req.body, password = _a.password, so_dien_thoai = _a.so_dien_thoai;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        isValid = (0, validate_req_body_1.validateReqBody)(password, so_dien_thoai);
                        if (!isValid) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Vui lòng điền số điện thoại và mật khẩu."))];
                        }
                        return [4 /*yield*/, services_1.authServices.login({
                                password: password,
                                so_dien_thoai: so_dien_thoai,
                            })];
                    case 2:
                        result = _f.sent();
                        if (result.statusCode === 200) {
                            // save cookie
                            res.cookie("refreshToken", (_b = result.data) === null || _b === void 0 ? void 0 : _b.refreshToken, {
                                sameSite: "strict",
                                httpOnly: true,
                                secure: false,
                                path: "/",
                            });
                            console.log((_c = result.data) === null || _c === void 0 ? void 0 : _c.user);
                            return [2 /*return*/, res.status(200).json({
                                    statusCode: result.statusCode,
                                    msg: result.msg,
                                    data: __assign({ accessToken: (_d = result.data) === null || _d === void 0 ? void 0 : _d.accessToken }, (_e = result.data) === null || _e === void 0 ? void 0 : _e.user),
                                })];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _f.sent();
                        err = error_1;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleRefresh = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var refreshToken, result, error_2, err;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        refreshToken = req.cookies.refreshToken;
                        if (!refreshToken) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Bạn chưa đăng nhập."))];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, services_1.authServices.refreshToken({
                                refreshToken: refreshToken,
                            })];
                    case 2:
                        result = _b.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json({
                                    statusCode: result.statusCode,
                                    msg: result.msg,
                                    data: {
                                        accessToken: (_a = result.data) === null || _a === void 0 ? void 0 : _a.accessToken,
                                    },
                                })];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        err = error_2;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleGetProfileLogin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user, err;
            return __generator(this, function (_a) {
                user = req.user;
                try {
                    if (user) {
                        return [2 /*return*/, res.status(200).json({
                                statusCode: 200,
                                msg: "Lấy thông tin người dùng thành công.",
                                data: user,
                            })];
                    }
                    else {
                        return [2 /*return*/, next(new api_error_1.default(404, "Không tim thấy user."))];
                    }
                }
                catch (error) {
                    err = error;
                    return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                }
                return [2 /*return*/];
            });
        }); };
        this.handleLogout = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var refresh_token, refresh_token_secret, userData, error_3, err;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        refresh_token = req.cookies.refreshToken;
                        if (!refresh_token) {
                            return [2 /*return*/, next(new api_error_1.default(401, "Bạn chưa đăng nhập."))];
                        }
                        refresh_token_secret = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.REFRESH_TOKEN_SECRET) || "";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        userData = jsonwebtoken_1.default.verify(refresh_token, refresh_token_secret);
                        return [4 /*yield*/, services_1.authServices.logout({
                                userId: (userData === null || userData === void 0 ? void 0 : userData._id) || "",
                            })];
                    case 2:
                        _b.sent();
                        res.clearCookie("refreshToken", {
                            sameSite: "strict",
                            httpOnly: true,
                            secure: false,
                            path: "/",
                        });
                        return [2 /*return*/, res.status(200).json({
                                statusCode: 200,
                                msg: "Đăng xuất thành công.",
                            })];
                    case 3:
                        error_3 = _b.sent();
                        err = error_3;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return AuthController;
}());
var authController = new AuthController();
exports.authController = authController;
