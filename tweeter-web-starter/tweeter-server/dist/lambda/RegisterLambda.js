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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const UserService_1 = require("../model/service/UserService");
const IntegrationResponseCommon_1 = require("./IntegrationResponseCommon");
let handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.alias == null) {
        throw new Error(IntegrationResponseCommon_1.BAD_REQUEST + "alias is undefined");
    }
    if (event.password == null) {
        throw new Error(IntegrationResponseCommon_1.BAD_REQUEST + "password is undefined");
    }
    if (event.firstName == null) {
        throw new Error(IntegrationResponseCommon_1.BAD_REQUEST + "firstName is undefined");
    }
    if (event.lastName == null) {
        throw new Error(IntegrationResponseCommon_1.BAD_REQUEST + "lastName is undefined");
    }
    if (event.userImageBase64 == null) {
        throw new Error(IntegrationResponseCommon_1.BAD_REQUEST + "userImageBase64 is undefined");
    }
    return yield (0, IntegrationResponseCommon_1.performErrorReportingOperation)(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Registering user with image bytes: " + event.userImageBase64.length + event.userImageBase64);
        const uInt8Array = Uint8Array.from(Buffer.from(event.userImageBase64, 'base64'));
        console.log("Registering user with Uint8 Array image bytes: " + uInt8Array.byteLength + uInt8Array);
        return new tweeter_shared_1.AuthenticateResponse(true, ...(yield new UserService_1.UserService().register(event.firstName, event.lastName, event.alias, event.password, uInt8Array)));
    }));
});
exports.handler = handler;
