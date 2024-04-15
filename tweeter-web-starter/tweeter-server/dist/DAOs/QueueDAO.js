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
exports.QueueDAO = void 0;
const aws_sdk_1 = require("aws-sdk");
class QueueDAO {
    constructor() {
        this.sqs = new aws_sdk_1.SQS();
        this.OriginalPostQueue = "https://sqs.us-east-1.amazonaws.com/532311244571/OriginalPostsQueue";
        this.PostBlockQueue = "https://sqs.us-east-1.amazonaws.com/532311244571/PostBlockQueue";
    }
    sendToQueue(queueUrl, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageBody = JSON.stringify(message);
            console.log(`Sending message to queue: ${messageBody}`);
            const params = {
                MessageBody: messageBody,
                QueueUrl: queueUrl
            };
            try {
                const data = yield this.sqs.sendMessage(params).promise();
                console.log(`Message sent successfully, message ID: ${data.MessageId}`);
            }
            catch (error) {
                console.log(`Error sending message: ${error}`);
            }
        });
    }
    // Probably should make these function implementations of an abstract sentToQueue
    sendToOriginalPostQ(status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendToQueue(this.OriginalPostQueue, status);
        });
    }
    sendToPostBlockQ(postBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendToQueue(this.PostBlockQueue, postBlock);
        });
    }
}
exports.QueueDAO = QueueDAO;
