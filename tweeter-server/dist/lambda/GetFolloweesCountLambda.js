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
const FollowService_1 = require("../model/service/FollowService");
const tweeter_shared_1 = require("tweeter-shared");
const ResponseCodes_1 = require("./ResponseCodes");
let handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GetFolloweesCount called in GetFolloweesCountLambda.ts with event: ', event);
    let processedEvent = tweeter_shared_1.GetFollowXCountRequest.fromJson(event);
    if (processedEvent.authToken == null) {
        throw new Error(ResponseCodes_1.BAD_REQUEST + 'Auth token is null');
    }
    if (processedEvent.user == null) {
        throw new Error(ResponseCodes_1.BAD_REQUEST + 'User is null');
    }
    return yield (0, ResponseCodes_1.ErrorReporter)(() => __awaiter(void 0, void 0, void 0, function* () {
        return new tweeter_shared_1.GetFollowXCountResponse(true, yield new FollowService_1.FollowService().getFolloweesCount(processedEvent.authToken, processedEvent.user));
    }));
});
exports.handler = handler;
