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
exports.StoryTableDAO = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const ClientAccess_1 = require("./ClientAccess");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
//Story table will have the key alias, and associate those with their statuses sorted by timestame
class StoryTableDAO {
    constructor() {
        this.storyTableName = "stories";
    }
    loadMoreStoryItems(user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const alias = user.alias;
            const time_stamp = lastItem === null || lastItem === void 0 ? void 0 : lastItem.timestamp;
            console.log("Alias for story :" + alias + " Time stamp: " + time_stamp);
            const params = {
                TableName: "stories",
                KeyConditionExpression: "alias = :alias",
                ExpressionAttributeValues: {
                    ":alias": alias
                },
                Limit: pageSize,
                ExclusiveStartKey: lastItem === undefined || lastItem === null
                    ? undefined
                    : {
                        ["alias"]: alias,
                        ["time_stamp"]: lastItem.timestamp.toString()
                    }
            };
            const items = [];
            const data = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.QueryCommand(params));
            console.log(data);
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((item) => items.push(new tweeter_shared_1.Status(item.post, user, Number(item.time_stamp))));
            // items.reverse(); // Reverse the order of the items so that the most recent status is first
            return [items, hasMorePages];
        });
    }
    postStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = status.user.alias; //Pulling the alias from the status's user
            const updateParams = {
                TableName: this.storyTableName,
                Key: {
                    alias: alias.toString(),
                    time_stamp: status.timestamp.toString()
                },
                UpdateExpression: 'SET post = :post',
                ExpressionAttributeValues: {
                    ':post': status.post
                },
                ReturnValues: client_dynamodb_1.ReturnValue.UPDATED_NEW
            };
            const responseToUpdate = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.UpdateCommand(updateParams));
            if (responseToUpdate == null) {
                throw new Error("Error posting status");
            }
            console.log(responseToUpdate);
            return;
        });
    }
}
exports.StoryTableDAO = StoryTableDAO;
