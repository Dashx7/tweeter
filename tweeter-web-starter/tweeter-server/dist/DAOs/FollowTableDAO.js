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
const AuthTokenTableDAO_1 = require("./AuthTokenTableDAO");
const ClientAccess_1 = require("./ClientAccess");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
//Follow table will have two indexes
// One is the key follow_alias, and associates follow_username, followee_alias, and followee_username (This one is to find all the people they follow)
// The other is key followee_alias, and assocites followee_username, follow_alias and follow_username (This one is to find all the people that follow them)
class FollowTableDAO {
    constructor() {
        this.followTableName = "follows";
        this.userTableName = "users";
    }
    loadMoreFollowers(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const followee_alias = user.alias;
            console.log("Alias for follower :" + followee_alias);
            const params = {
                TableName: this.followTableName,
                IndexName: "followee_alias-follower_alias-index",
                KeyConditionExpression: "followee_alias = :followee_alias",
                ExpressionAttributeValues: {
                    ":followee_alias": followee_alias
                },
                Limit: pageSize,
                ExclusiveStartKey: lastItem === undefined || lastItem === null
                    ? undefined
                    : {
                        ["followee_alias"]: followee_alias,
                    }
            };
            // const items: User[] = [];
            const aliasList = [];
            const data = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.QueryCommand(params));
            console.log("This is the Data :" + JSON.stringify(data));
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                if (item.follower_alias && item.follower_alias.trim() !== "") {
                    aliasList.push(item.follower_alias);
                }
            });
            console.log("Alias List: " + aliasList);
            return [aliasList, hasMorePages];
        });
    }
    loadMoreFollowees(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const follower_alias = user.alias;
            console.log("Alias for follower :" + follower_alias);
            const params = {
                TableName: this.followTableName,
                KeyConditionExpression: "follower_alias = :follower_alias",
                ExpressionAttributeValues: {
                    ":follower_alias": follower_alias
                },
                Limit: pageSize,
                ExclusiveStartKey: lastItem === undefined || lastItem === null
                    ? undefined
                    : {
                        ["follower_alias"]: follower_alias,
                    }
            };
            // const items: User[] = [];
            const aliasList = [];
            const data = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.QueryCommand(params));
            console.log("This is the Data :" + JSON.stringify(data));
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                if (item.followee_alias && item.followee_alias.trim() !== "") {
                    aliasList.push(item.followee_alias);
                }
            });
            console.log("Alias List: " + aliasList);
            return [aliasList, hasMorePages];
        });
    }
    //About to test
    getIsFollowerStatus(authToken, user, selectedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve follower information
            const followerAlias = user.alias;
            const followedAlias = selectedUser.alias;
            // Using template literals
            const params = {
                TableName: this.followTableName,
                KeyConditionExpression: `followerAlias = :followerAlias AND followedAlias = :followedAlias`,
                ExpressionAttributeValues: {
                    ":followerAlias": followerAlias,
                    ":followedAlias": followedAlias
                }
            };
            const response = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.QueryCommand(params));
            console.log("Response: " + JSON.stringify(response));
            return response.Items && response.Items.length > 0 ? true : false;
        });
    }
    // async getFolloweesCountByQuery(
    //     authToken: AuthToken,
    //     user: User
    // ): Promise<number> {
    //     AuthTokenTableDAO.authenticate(authToken);
    //     console.log("User: " + JSON.stringify(user));
    //     const aliasToUse: string = user.alias;
    //     console.log("Alias to use: " + aliasToUse);
    //     const params = {
    //         TableName: this.userTableName,
    //         Key: {
    //             'alias': aliasToUse,
    //         },
    //     };
    //     console.log("Attempting to get followee count of " + aliasToUse);
    //     const output = await this.client.send(new GetCommand(params));
    //     if (!output.Item || !output.Item.followee_count || !output.Item.followee_count.N) {
    //         return 0;
    //     }
    //     console.log("Output count :" + output.Item.followee_count.N);
    //     return Number(output.Item.followee_count.N);
    // }
    //Need to update count in users table
    follow(authToken, userToFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract user information
            const followeeAlias = userToFollow.alias; // Assuming alias is the user's identifier
            const originalUser = yield AuthTokenTableDAO_1.AuthTokenTableDAO.findUserByAuthToken(authToken);
            const followerAlias = originalUser.alias;
            console.log("Follower alias: " + followerAlias + " Followee alias: " + followeeAlias);
            const params = {
                TableName: this.followTableName,
                Item: {
                    follower_alias: followerAlias,
                    followee_alias: followeeAlias
                }
            };
            const response = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.PutCommand(params));
            console.log(response);
            return followerAlias;
        });
    }
    unfollow(authToken, userToUnfollow) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract user information
            const followeeAlias = userToUnfollow.alias; // Assuming alias is the user's identifier
            const originalUser = yield AuthTokenTableDAO_1.AuthTokenTableDAO.findUserByAuthToken(authToken);
            const followerAlias = originalUser.alias;
            console.log("Follower alias: " + followerAlias + " Followee alias: " + followeeAlias);
            const params = {
                TableName: this.followTableName,
                Key: {
                    follower_alias: followerAlias,
                    followee_alias: followeeAlias
                }
            };
            const response = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.DeleteCommand(params));
            console.log(response);
            return followerAlias;
        });
    }
}
exports.FollowTableDAO = FollowTableDAO;
