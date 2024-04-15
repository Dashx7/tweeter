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
const Request_1 = require("tweeter-shared/dist/model/net/Request");
const StatusService_1 = require("../model/service/StatusService");
const IntegrationResponseCommon_1 = require("./IntegrationResponseCommon");
// ProcessPostBlockLambda will take a post block and process it and add a status to
// All 25 people in the block. It will call the service to call A DAO to add each status based upon the user to post to
let handler = (SQS_PostBlock_String) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("PostChopperLambda: handler: full event: " + SQS_PostBlock_String);
    const entireEvent = JSON.parse(SQS_PostBlock_String);
    const bodyString = entireEvent.Records[0].body;
    const event = Request_1.PostBlockRequest.fromJsonString(bodyString); // From JSON string because it's coming from SQS which must be stringified
    console.log("PostChopperLambda: handler: event processed: " + JSON.stringify(event));
    if (event.status == null) {
        throw new Error("Status is undefined");
    }
    if (event.followers == null) {
        throw new Error("Followers is undefined");
    }
    if (event.followers.length == 0) {
        throw new Error("Followers is empty");
    }
    return yield (0, IntegrationResponseCommon_1.performErrorReportingOperation)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield new StatusService_1.StatusService().processStatuses(event.status, event.followers);
    }));
});
exports.handler = handler;
