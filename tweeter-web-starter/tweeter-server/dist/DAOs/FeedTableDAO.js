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
exports.FeedTableDAO = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const ClientAccess_1 = require("./ClientAccess");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
//Feed table will have the key alias, and associate those with status of their friends sorted by timestamp (post, user, timestamp, segment)
class FeedTableDAO {
    constructor() {
        this.feedTableName = "feeds";
    }
    loadMoreFeedItems(user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const receiver_alias = user.alias;
            const time_stamp = lastItem === null || lastItem === void 0 ? void 0 : lastItem.timestamp;
            console.log("Receiver alias for feed :" + receiver_alias + " Time stamp: " + time_stamp);
            console.log("Confirming deserialization of user: " + user.toJson());
            console.log("receiver_alias: " + receiver_alias + " pageSize: " + pageSize + " lastItem: " + (lastItem === null || lastItem === void 0 ? void 0 : lastItem.toJson()));
            const params = {
                TableName: this.feedTableName,
                KeyConditionExpression: "receiver_alias = :receiver_alias",
                ExpressionAttributeValues: {
                    ":receiver_alias": receiver_alias
                },
                Limit: pageSize,
                ExclusiveStartKey: lastItem === undefined || lastItem === null
                    ? undefined
                    : {
                        ["receiver_alias"]: receiver_alias,
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
    postStatus(status, followerAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const aliasOfStatus = status.user.alias;
            const firstName = status.user.firstName;
            const lastName = status.user.lastName;
            const imageUrl = status.user.imageUrl;
            if (status == null) {
                throw new Error("Status is undefined in postStatus");
            }
            if (status.user == null) {
                throw new Error("User is undefined in postStatus");
            }
            if (aliasOfStatus == null) {
                throw new Error("Alias of follower is undefined in postStatus");
            }
            console.log("Posting status to feed with alias: " + aliasOfStatus + " and status: " + status.post + " and timestamp: " + status.timestamp + " and user: " + status.user.alias);
            const updateParams = {
                TableName: this.feedTableName,
                Key: {
                    receiver_alias: followerAlias.toString(),
                    time_stamp: status.timestamp.toString()
                },
                UpdateExpression: 'SET post = :post, status_alias = :status_alias, firstName = :firstName, lastName = :lastName, imageUrl = :imageUrl',
                ExpressionAttributeValues: {
                    ':post': status.post,
                    ':status_alias': aliasOfStatus,
                    ':firstName': firstName,
                    ':lastName': lastName,
                    ':imageUrl': imageUrl
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
exports.FeedTableDAO = FeedTableDAO;
