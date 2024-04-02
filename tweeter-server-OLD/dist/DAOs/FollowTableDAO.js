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
exports.FollowTableDAO = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class FollowTableDAO {
    constructor() {
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" }); // replace with your region
        this.tableName = "follows"; // replace with your table name
        this.followeeName = "followee_name";
        this.followeeHandle = "followee_handle";
        this.followerName = "follower_name";
        this.followerHandle = "follower_handle";
    }
    loadMoreFollowers(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            throw new Error("Method not implemented.");
        });
    }
    loadMoreFollowees(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            throw new Error("Method not implemented.");
        });
    }
    getIsFollowerStatus(authToken, user, selectedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            throw new Error("Method not implemented.");
        });
    }
    getFolloweesCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            throw new Error("Method not implemented.");
        });
    }
    getFollowersCount(//My best example yet?
    authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: 'follows',
                IndexName: 'followee_index', // replace with your GSI name THIS MIGHT NEED A FIX
                KeyConditionExpression: 'followee_handle = :followee_handle',
                ExpressionAttributeValues: {
                    ':followee_handle': { S: user.alias },
                },
                Select: client_dynamodb_1.Select.COUNT,
            };
            const output = yield this.client.send(new lib_dynamodb_1.QueryCommand(params));
            if (output.Count === undefined) {
                return 0;
            }
            console.log("Output count :" + output.Count);
            return output.Count;
        });
    }
    follow(authToken, userToFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: 'Users',
                Key: { id: { S: userToFollow.alias } },
                UpdateExpression: 'ADD following :followerAlias',
                ExpressionAttributeValues: {
                // ':followerAlias': { SS: [authToken.alias] },
                },
                ReturnValues: 'UPDATED_NEW',
            };
            // const response = await this.client.send(new UpdateCommand(params));
            // TODO: Extract the updated follower and followee counts from the response
            return [0, 0]; // Replace with actual counts
        });
    }
    unfollow(authToken, userToUnfollow) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: 'Users',
                Key: { id: { S: userToUnfollow.alias } },
                UpdateExpression: 'DELETE following :followerAlias',
                ExpressionAttributeValues: {
                // ':followerAlias': { SS: [authToken.alias] },
                },
                ReturnValues: 'UPDATED_NEW',
            };
            // const response = await this.client.send(new UpdateCommand(params));
            // TODO: Extract the updated follower and followee counts from the response
            return [0, 0]; // Replace with actual counts
        });
    }
}
exports.FollowTableDAO = FollowTableDAO;
// export class FollowTableDAO {
//     private client: DynamoDBClient;
//     constructor() {
//         this.client = new DynamoDBClient({ region: "us-west-2" });
//     }
//     async follow(toFollowAlias: string, followerAlias: string): Promise<void> {
//         const params = {
//             TableName: 'Users',
//             Key: { id: { S: toFollowAlias } },
//             UpdateExpression: 'ADD following :followerAlias',
//             ExpressionAttributeValues: {
//                 ':followerAlias': { SS: [followerAlias] },
//             },
//             ReturnValues: ReturnValue.UPDATED_NEW,
//         };
//         await this.client.send(new UpdateCommand(params));
//     }
//     async unfollow(toUnfollowAlias: string, followerAlias: string): Promise<void> {
//         const params = {
//             TableName: 'Users',
//             Key: { id: { S: toUnfollowAlias } },
//             UpdateExpression: 'DELETE following :followerAlias',
//             ExpressionAttributeValues: {
//                 ':followerAlias': { SS: [followerAlias] },
//             },
//             ReturnValues: ReturnValue.UPDATED_NEW,
//         };
//         await this.client.send(new UpdateCommand(params));
//     }
// }
