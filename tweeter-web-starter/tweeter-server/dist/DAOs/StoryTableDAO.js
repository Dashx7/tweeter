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
//Story table will have the key alias, and associate those with their statuses sorted by timestame
class StoryTableDAO {
    constructor() {
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
        this.storyTableName = "stories";
        this.authTokenTableName = "authtokens";
    }
    loadMoreStoryItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            throw new Error("Method not implemented.");
            // Query the feed
        });
    }
    postStatus(authToken, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            // Use your Authtoken's alias to put a new story onto the list sorted by its timestamp
            // const getParams = {
            //     TableName: this.authTokenTableName,
            //     Key: {
            //         token: authToken.token
            //     }
            // };
            // const responseToGet = await this.client.send(new GetCommand(getParams));
            // if (responseToGet.Item == null) {
            //     throw new Error("Invalid token");
            // }
            // console.log(responseToGet.Item);
            // if (!responseToGet.Item.alias) {
            //     throw new Error(`Token ${authToken.token} is missing alias field`);
            // }
            // const aliasToUse = responseToGet.Item.alias;
            const currentTime = new Date().toISOString();
            const alias = status.user;
            const putParams = {
                TableName: this.storyTableName,
                Item: {
                    sender_alias: alias,
                    time_stamp: currentTime,
                    //TODO put in the status
                }
            };
            const responseToStatusPut = yield this.client.send(new lib_dynamodb_1.PutCommand(putParams));
        });
    }
}
exports.StoryTableDAO = StoryTableDAO;
