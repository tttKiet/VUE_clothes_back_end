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
exports.authServices = void 0;
var models_1 = require("../app/models");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateTokens_1 = __importDefault(require("../utils/generateTokens"));
var models_2 = require("../app/models");
var verify_refresh_token_1 = __importDefault(require("../utils/verify-refresh-token"));
var Staff_1 = require("../app/models/Staff");
var AuthServices = /** @class */ (function () {
    function AuthServices() {
    }
    AuthServices.prototype.login = function (_a) {
        var so_dien_thoai = _a.so_dien_thoai, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var userExists, isValidPassword, _b, accessToken, refreshToken, userToken, staffExists, isValidPassword, _c, accessToken, refreshToken, userToken;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, models_1.User.findOne({
                            so_dien_thoai: so_dien_thoai,
                        }).lean()];
                    case 1:
                        userExists = _d.sent();
                        if (!userExists) return [3 /*break*/, 10];
                        return [4 /*yield*/, bcrypt_1.default.compare(password, (userExists === null || userExists === void 0 ? void 0 : userExists.password) || "")];
                    case 2:
                        isValidPassword = _d.sent();
                        if (!isValidPassword) {
                            return [2 /*return*/, {
                                    statusCode: 401,
                                    msg: "Sai số điện thoại hoặc mật khẩu.",
                                }];
                        }
                        return [4 /*yield*/, (0, generateTokens_1.default)(userExists, "user")];
                    case 3:
                        _b = _d.sent(), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                        if (!accessToken || !refreshToken) {
                            return [2 /*return*/, {
                                    statusCode: 401,
                                    msg: "Đăng nhập không thành công, vui lòng thử lại..",
                                }];
                        }
                        return [4 /*yield*/, models_2.UserToken.findOne({
                                userId: userExists._id,
                            })];
                    case 4:
                        userToken = _d.sent();
                        if (!userToken) return [3 /*break*/, 7];
                        return [4 /*yield*/, userToken.updateOne({
                                refresh_token: refreshToken,
                            })];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, userToken.save()];
                    case 6:
                        _d.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, models_2.UserToken.create({
                            userId: userExists._id,
                            refresh_token: refreshToken,
                            userType: "User",
                        })];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [2 /*return*/, {
                            statusCode: 200,
                            msg: "Đăng nhập thành công.",
                            data: {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                user: __assign(__assign({}, userExists), { password: null, role: "user" }),
                            },
                        }];
                    case 10: return [4 /*yield*/, Staff_1.Staff.findOne({
                            so_dien_thoai: so_dien_thoai,
                        }).lean()];
                    case 11:
                        staffExists = _d.sent();
                        if (!staffExists) return [3 /*break*/, 20];
                        return [4 /*yield*/, bcrypt_1.default.compare(password, (staffExists === null || staffExists === void 0 ? void 0 : staffExists.password) || "")];
                    case 12:
                        isValidPassword = _d.sent();
                        if (!isValidPassword) {
                            return [2 /*return*/, {
                                    statusCode: 401,
                                    msg: "Sai số điện thoại hoặc mật khẩu.",
                                }];
                        }
                        return [4 /*yield*/, (0, generateTokens_1.default)(staffExists, "admin")];
                    case 13:
                        _c = _d.sent(), accessToken = _c.accessToken, refreshToken = _c.refreshToken;
                        if (!accessToken || !refreshToken) {
                            return [2 /*return*/, {
                                    statusCode: 401,
                                    msg: "Đăng nhập không thành công, vui lòng thử lại..",
                                }];
                        }
                        return [4 /*yield*/, models_2.UserToken.findOne({
                                userId: staffExists._id,
                            })];
                    case 14:
                        userToken = _d.sent();
                        if (!userToken) return [3 /*break*/, 17];
                        return [4 /*yield*/, userToken.updateOne({
                                refresh_token: refreshToken,
                            })];
                    case 15:
                        _d.sent();
                        return [4 /*yield*/, userToken.save()];
                    case 16:
                        _d.sent();
                        return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, models_2.UserToken.create({
                            userId: staffExists._id,
                            refresh_token: refreshToken,
                            userType: "Staff",
                        })];
                    case 18:
                        _d.sent();
                        _d.label = 19;
                    case 19: return [2 /*return*/, {
                            statusCode: 200,
                            msg: "Đăng nhập thành công.",
                            data: {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                user: __assign(__assign({}, staffExists), { password: null, role: "admin" }),
                            },
                        }];
                    case 20: return [2 /*return*/, {
                            statusCode: 401,
                            msg: "Sai số điện thoại hoặc mật khẩu.",
                        }];
                }
            });
        });
    };
    AuthServices.prototype.refreshToken = function (_a) {
        var _b;
        var refreshToken = _a.refreshToken;
        return __awaiter(this, void 0, void 0, function () {
            var refresh_token_secret, userData, result, newAccessToken;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        refresh_token_secret = ((_b = process.env) === null || _b === void 0 ? void 0 : _b.REFRESH_TOKEN_SECRET) || "";
                        userData = jsonwebtoken_1.default.verify(refreshToken, refresh_token_secret);
                        return [4 /*yield*/, (0, verify_refresh_token_1.default)(refreshToken)];
                    case 1:
                        result = _c.sent();
                        if (result.error) {
                            return [2 /*return*/, {
                                    statusCode: 401,
                                    msg: result.message || "Làm mới access token 0 thành công.",
                                }];
                        }
                        return [4 /*yield*/, (0, generateTokens_1.default)(userData, userData.role)];
                    case 2:
                        newAccessToken = (_c.sent()).accessToken;
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Làm mới access token thành công.",
                                data: {
                                    accessToken: newAccessToken,
                                },
                            }];
                }
            });
        });
    };
    // async getProfile(user:TokenPayload) {
    //   const refresh_token_secret = process.env?.REFRESH_TOKEN_SECRET || "";
    //   const userData = jwt.verify(
    //     refreshToken,
    //     refresh_token_secret
    //   ) as JwtPayload;
    //   const result = await verifyRefreshToken(refreshToken);
    //   if (result.error) {
    //     return {
    //       statusCode: 403,
    //       msg: result.message || "Làm mới access token 0 thành công.",
    //     };
    //   }
    //   const { accessToken: newAccessToken } = await generateTokens(
    //     userData,
    //     userData.role
    //   );
    //   return {
    //     statusCode: 200,
    //     msg: "Làm mới access token thành công.",
    //     data: {
    //       accessToken: newAccessToken,
    //     },
    //   };
    // }
    AuthServices.prototype.logout = function (_a) {
        var userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_2.UserToken.deleteOne({ userId: userId })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthServices;
}());
var authServices = new AuthServices();
exports.authServices = authServices;
