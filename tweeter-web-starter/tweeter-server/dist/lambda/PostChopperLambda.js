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
const StatusService_1 = require("../model/service/StatusService");
const IntegrationResponseCommon_1 = require("./IntegrationResponseCommon");
const tweeter_shared_1 = require("tweeter-shared");
// This will pull a Post from the OriginlPost Queue and Chop the post into PostBlocks
// Of 25 (arbitrary) People to post to each, then send the PostBlock to the PostBlock Queue
let handler = (SQS_Status_Object) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("PostChopperLambda: handler: full event: ", JSON.stringify(SQS_Status_Object));
    const bodyString = SQS_Status_Object.Records[0].body;
    console.log("PostChopperLambda: handler: bodyString: ", bodyString);
    // const status = JSON.parse(bodyString) as Status; // From JSON string because it's coming from SQS which must be stringified
    // console.log("PostChopperLambda: handler: event processed: ", status);
    const betterStatus = tweeter_shared_1.Status.fromJson(bodyString);
    console.log("PostChopperLambda: handler: event processed: ", betterStatus);
    // if (status == null) {
    //     throw new Error("Status is undefined");
    // }
    if (betterStatus == null) {
        throw new Error("Status is undefined");
    }
    return yield (0, IntegrationResponseCommon_1.performErrorReportingOperation)(() => __awaiter(void 0, void 0, void 0, function* () {
        // await new StatusService().originalPostChopper(status);
        yield new StatusService_1.StatusService().originalPostChopper(betterStatus);
    }));
});
exports.handler = handler;
