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
//Follow table will have two indexes
// One is the key follow_alias, and associates follow_username, followee_alias, and followee_username (This one is to find all the people they follow)
// The other is key followee_alias, and assocites followee_username, follow_alias and follow_username (This one is to find all the people that follow them)
class FollowTableDAO {
    constructor() {
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
        this.followTableName = "follows";
        this.userTableName = "users";
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
            console.log("User: " + JSON.stringify(user));
            const aliasToUse = user.alias;
            console.log("Alias to use: " + aliasToUse);
            const params = {
                TableName: this.userTableName,
                Key: {
                    'alias': aliasToUse,
                },
            };
            console.log("Attempting to get followee count of " + aliasToUse);
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            if (!output.Item || !output.Item.followee_count || !output.Item.followee_count.N) {
                return 0;
            }
            console.log("Output count :" + output.Item.followee_count.N);
            return Number(output.Item.followee_count.N);
        });
    }
    getFollowersCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("User: " + JSON.stringify(user));
            const aliasToUse = user.alias;
            console.log("Alias to use: " + aliasToUse);
            const params = {
                TableName: this.userTableName,
                Key: {
                    'alias': aliasToUse,
                },
            };
            console.log("Attempting to get follower count of " + aliasToUse);
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            if (!output.Item || !output.Item.follower_count || !output.Item.follower_count.N) {
                return 0;
            }
            console.log("Output count :" + output.Item.follower_count.N);
            return Number(output.Item.follower_count.N);
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
