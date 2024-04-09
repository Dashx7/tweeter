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
const AuthTokenTableDAO_1 = require("./AuthTokenTableDAO");
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
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            throw new Error("Method not implemented.");
        });
    }
    loadMoreFollowees(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            throw new Error("Method not implemented.");
        });
    }
    //About to test
    getIsFollowerStatus(authToken, user, selectedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
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
            const response = yield this.client.send(new client_dynamodb_1.QueryCommand(params));
            console.log("Response: " + JSON.stringify(response));
            return response.Items && response.Items.length > 0 ? true : false;
        });
    }
    getFolloweesCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
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
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
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
    //Might work
    follow(authToken, userToFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            // Extract user information
            const followeeAlias = userToFollow.alias; // Assuming alias is the user's identifier
            const originalUser = yield AuthTokenTableDAO_1.AuthTokenTableDAO.findUserByAuthToken(authToken);
            const followerAlias = originalUser.alias;
            const params = {
                TableName: 'Follows',
                Item: {
                    follower_alias: { S: followerAlias },
                    followee_alias: { S: followeeAlias }
                }
            };
            try {
                const response = yield this.client.send(new client_dynamodb_1.PutItemCommand(params));
                if (response.$metadata.httpStatusCode !== 200) {
                    throw new Error("Error following user: " + response.$metadata.httpStatusCode);
                }
                //Get the updated follower and followee counts by calling the getFollowersCount and getFolloweesCount methods with the orginal user
                const followerCount = yield this.getFollowersCount(authToken, originalUser);
                const followingCount = yield this.getFolloweesCount(authToken, originalUser);
                return [followerCount, followingCount];
            }
            catch (error) {
                console.error("Error following user:", error);
                throw error;
            }
        });
    }
    // Probably doesn't work
    unfollow(authToken, userToUnfollow) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            // Extract user information
            const followerAlias = userToUnfollow.alias;
            // Define update parameters
            const params = {
                TableName: 'Users',
                Key: {
                    id: { S: followerAlias } // Update user with the matching alias
                },
                UpdateExpression: 'SET following = list_delete(following, :followerAlias)',
                ExpressionAttributeValues: {
                    ':followerAlias': { S: followerAlias }
                },
                ReturnValues: 'UPDATED_NEW' // Return updated follower count
            };
            try {
                const response = yield this.client.send(new client_dynamodb_1.UpdateItemCommand(params));
                // Get the updated follower and followee counts
                const originalUser = yield AuthTokenTableDAO_1.AuthTokenTableDAO.findUserByAuthToken(authToken);
                const followerCount = yield this.getFollowersCount(authToken, originalUser);
                const followingCount = yield this.getFolloweesCount(authToken, originalUser);
                return [followerCount, followingCount];
            }
            catch (error) {
                console.error("Error unfollowing user:", error);
                throw error; // Re-throw for proper error handling
            }
        });
    }
}
exports.FollowTableDAO = FollowTableDAO;
