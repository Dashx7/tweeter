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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const UserTableDAO_1 = require("./UserTableDAO");
const AuthTokenTableDAO_1 = require("./AuthTokenTableDAO");
//Story table will have the key alias, and associate those with their statuses sorted by timestame
class StoryTableDAO {
    constructor() {
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
        this.storyTableName = "stories";
        this.authTokenTableName = "authtokens";
        this.userTableDao = new UserTableDAO_1.UserTableDAO();
    }
    // TODO: Finish implementing and test
    loadMoreStoryItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Auth token " + authToken.token);
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            const alias = user.alias;
            console.log("Alias in query " + alias);
            const params = {
                TableName: "stories",
                KeyConditionExpression: "#alias = :alias",
                ExpressionAttributeNames: {
                    "#alias": "alias"
                },
                ExpressionAttributeValues: {
                    ":alias": alias
                }
            };
            const responseToQuery = yield this.client.send(new client_dynamodb_1.QueryCommand(params));
            console.log("Finished response");
            if (responseToQuery.Items == null) {
                console.log("No statuses found");
                return [[], false]; // User has no statuses
            }
            if (responseToQuery.Items && responseToQuery.Items.length > 0) {
                // It's safe to access responseToQuery.Items[0]
                console.log(responseToQuery.Items[0]);
            }
            return [[], false]; //Temp
        });
    }
    // TODO: Test
    postStatus(authToken, status) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            const alias = status.user.alias; //Pulling the alias from the status's user
            console.log(status.segments);
            const formattedSegments = status.segments.map(segment => ({
                text: segment.text,
                startPostion: segment.startPostion,
                endPosition: segment.endPosition,
                type: segment.type
            }));
            if (formattedSegments === null) {
                throw new Error("Error formatting segments");
            }
            console.log(formattedSegments);
            const updateParams = {
                TableName: this.storyTableName,
                Key: {
                    alias: alias.toString(),
                    time_stamp: status.timestamp.toString()
                },
                UpdateExpression: 'SET status_segments = list_append(if_not_exists(status_segments, :empty_list), :newSegment)',
                ExpressionAttributeValues: {
                    ':newSegment': [formattedSegments],
                    ':empty_list': []
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
