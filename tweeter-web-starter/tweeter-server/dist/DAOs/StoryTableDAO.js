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
            const getParams = {
                TableName: this.storyTableName,
                Key: {
                    sender_alias: user.alias
                }
            };
            const responseToQuery = yield this.client.send(new client_dynamodb_1.QueryCommand(getParams));
            console.log(responseToQuery);
            if (responseToQuery.Items == null) {
                return [[], false]; // User has no statuses
            }
            // Get the user associated with the statuses
            // let statuses: Status[] = responseToQuery.Items.map((item: any) => {
            //     let user = new User(
            //         item.sender_alias.S,
            //         item.first_name.S,
            //         item.last_name.S,
            //         item.image_URL.S,
            //     );
            //     let segments = item.segments.L.map((segmentItem: any) => {
            //         return new PostSegment(
            //             segmentItem.segment_type.S,
            //             segmentItem.content.S
            //             // add more parameters if PostSegment constructor requires
            //         );
            //     });
            //     return new Status(
            //         item.post.S,
            //         user,
            //         Number(item.time_stamp.N)
            //     );
            // });
            // return new Status(
            //     item.post.S,
            //     user,
            //     Number(item.time_stamp.N),
            //     segments
            // );
            return [[], false]; //Temp
        });
    }
    // TODO: Test
    postStatus(authToken, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = status.user.alias; //Pulling the alias from the status's user
            const putParams = {
                TableName: this.storyTableName,
                Item: {
                    alias: alias,
                    time_stamp: status.timestamp,
                    post: status.post,
                    segments: status.segments,
                }
            };
            const responseToStatusPut = yield this.client.send(new lib_dynamodb_1.PutCommand(putParams));
            if (responseToStatusPut == null) {
                throw new Error("Error posting status");
            }
            console.log(responseToStatusPut);
            return;
        });
    }
}
exports.StoryTableDAO = StoryTableDAO;
