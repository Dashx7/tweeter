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
const ResponseCodes_1 = require("./ResponseCodes");
let handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Login called in LoginLambda.ts with event: ', event);
    let processedEvent = tweeter_shared_1.LoginRequest.fromJson(event);
    if (processedEvent.username == null) {
        throw new Error(ResponseCodes_1.BAD_REQUEST + 'username is null');
    }
    if (processedEvent.password == null) {
        throw new Error(ResponseCodes_1.BAD_REQUEST + 'password is null');
    }
    return yield (0, ResponseCodes_1.ErrorReporter)(() => __awaiter(void 0, void 0, void 0, function* () {
        return new tweeter_shared_1.AuthenticateResponse(true, ...(yield new UserService_1.UserService().login(processedEvent.username, processedEvent.password)));
    }));
});
exports.handler = handler;
