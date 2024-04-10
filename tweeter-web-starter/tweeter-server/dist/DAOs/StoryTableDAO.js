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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
//Story table will have the key alias, and associate those with their statuses sorted by timestame
class StoryTableDAO {
    constructor() {
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
        this.ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(this.client);
        this.storyTableName = "stories";
        this.authTokenTableName = "authtokens";
    }
    loadMoreStoryItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const alias = user.alias;
            const time_stamp = lastItem === null || lastItem === void 0 ? void 0 : lastItem.timestamp;
            console.log("Alias for story :" + alias + " Time stamp: " + time_stamp);
            //console.log(time_stamp);
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
            const data = yield this.ddbDocClient.send(new lib_dynamodb_1.QueryCommand(params));
            console.log(data);
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((item) => items.push(new tweeter_shared_1.Status(item.post, user, Number(item.time_stamp))));
            return [items, hasMorePages];
        });
    }
    // Working
    postStatus(authToken, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = status.user.alias; //Pulling the alias from the status's user
            // console.log(status.segments);
            // const formattedSegments = status.segments.map(segment => ({ // This is to format the segments to be put into the database
            //     text: segment.text,
            //     startPostion: segment.startPostion,
            //     endPosition: segment.endPosition,
            //     type: segment.type
            // }));
            // if (formattedSegments === null) {
            //     throw new Error("Error formatting segments");
            // }
            // console.log(formattedSegments);
            // const updateParams = {
            //     TableName: this.storyTableName,
            //     Key: {
            //         alias: alias.toString(),
            //         time_stamp: status.timestamp.toString()
            //     },
            //     UpdateExpression: 'SET status_segments = list_append(if_not_exists(status_segments, :empty_list), :newSegment)',
            //     ExpressionAttributeValues: {
            //         ':newSegment': [formattedSegments],
            //         ':empty_list': []
            //     },
            //     ReturnValues: ReturnValue.UPDATED_NEW
            // };
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
            const responseToUpdate = yield this.client.send(new lib_dynamodb_1.UpdateCommand(updateParams));
            if (responseToUpdate == null) {
                throw new Error("Error posting status");
            }
            console.log(responseToUpdate);
            return;
        });
    }
}
exports.StoryTableDAO = StoryTableDAO;
