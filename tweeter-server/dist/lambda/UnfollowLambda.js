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
const ResponseCodes_1 = require("./ResponseCodes");
const FollowService_1 = require("../model/service/FollowService");
let handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.authToken == null) {
        throw new Error(ResponseCodes_1.BAD_REQUEST + 'AuthToken is null');
    }
    if (event.userToFollow == null) {
        throw new Error(ResponseCodes_1.BAD_REQUEST + 'User To Follow is null');
    }
    return yield (0, ResponseCodes_1.ErrorReporter)(() => __awaiter(void 0, void 0, void 0, function* () {
        return new tweeter_shared_1.XFollowResponse(true, ...(yield new FollowService_1.FollowService().unfollow(event.authToken, event.userToFollow)));
    }));
});
exports.handler = handler;
