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
    console.log("GetUserRequest: " + JSON.stringify(event));
    event = tweeter_shared_1.GetUserRequest.fromJson(event);
    console.log("GetUserRequest Processed: " + JSON.stringify(event));
    if (event.authToken == null) {
        throw new Error(IntegrationResponseCommon_1.BAD_REQUEST + "authToken is undefined");
    }
    if (event.alias == null) {
        throw new Error(IntegrationResponseCommon_1.BAD_REQUEST + "alias is undefined");
    }
    return yield (0, IntegrationResponseCommon_1.performErrorReportingOperation)(() => __awaiter(void 0, void 0, void 0, function* () {
        return new tweeter_shared_1.GetUserResponse(true, yield new UserService_1.UserService().getUser(event.authToken, event.alias));
    }));
});
exports.handler = handler;
