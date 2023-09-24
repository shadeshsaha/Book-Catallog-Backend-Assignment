"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Already Exists!');
    }
    const result = yield prisma_1.default.user.create({
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExists = yield prisma_1.default.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Does Not Exists!');
    }
    if (isExists.password !== password)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password Does Not Match');
    // create access token & refresh token
    const { id, role } = isExists;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AuthService = {
    signUp,
    signIn,
};
