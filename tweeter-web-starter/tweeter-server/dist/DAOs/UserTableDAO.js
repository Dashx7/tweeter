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
exports.UserTableDAO = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const ClientAccess_1 = require("./ClientAccess");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
//Usertable will be key alias, and have passwordHashed, first_name, last_name, image_URL, follower_count, followee_count
class UserTableDAO {
    constructor() {
        this.tableName = "users";
    }
    getUser(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: {
                    alias: alias
                }
            };
            const response = yield (0, ClientAccess_1.getClient)().send(new lib_dynamodb_1.GetCommand(params));
            if (!response.Item) {
                throw new Error(`User with alias ${alias} not found`);
            }
            if (!response.Item.first_name || !response.Item.last_name || !response.Item.alias || !response.Item.image_URL) {
                throw new Error(`User with alias ${alias} is missing required fields`);
            }
            console.log(response.Item);
            // Convert the response.Item into a User object
            let user = new tweeter_shared_1.User(response.Item.first_name, response.Item.last_name, response.Item.alias, response.Item.image_URL);
            return user;
        });
    }
    follow(aliasOfFollower, aliasOfFollowee) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: {
                    alias: aliasOfFollower
                },
                ExpressionAttributeValues: {
                    ":inc": 1
                },
                UpdateExpression: "SET followee_count = followee_count + :inc",
            };
            const response = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.UpdateCommand(params));
            console.log(response);
            const params2 = {
                TableName: this.tableName,
                Key: {
                    alias: aliasOfFollowee
                },
                ExpressionAttributeValues: {
                    ":inc": 1
                },
                UpdateExpression: "SET follower_count = follower_count + :inc",
            };
            const response2 = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.UpdateCommand(params2));
            console.log(response2);
            return;
        });
    }
    unfollow(aliasOfFollower, aliasOfFollowee) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: {
                    alias: aliasOfFollower
                },
                ExpressionAttributeValues: {
                    ":inc": -1
                },
                UpdateExpression: "ADD followee_count :val"
            };
            const response = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.UpdateCommand(params));
            console.log(response);
            const params2 = {
                TableName: this.tableName,
                Key: {
                    alias: aliasOfFollowee
                },
                ExpressionAttributeValues: {
                    ":inc": -1
                },
                UpdateExpression: "ADD follower_count :val"
            };
            const response2 = yield (0, ClientAccess_1.getDocumentClient)().send(new lib_dynamodb_1.UpdateCommand(params2));
            console.log(response2);
            return;
        });
    }
    getFolloweesCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const aliasToUse = user.alias;
            console.log("Alias to use: " + aliasToUse);
            const params = {
                TableName: this.tableName,
                Key: {
                    alias: aliasToUse
                }
            };
            const response = yield (0, ClientAccess_1.getClient)().send(new lib_dynamodb_1.GetCommand(params));
            console.log(response);
            if (!response.Item) {
                throw new Error(`User with alias ${aliasToUse} not found`);
            }
            return (_a = response.Item) === null || _a === void 0 ? void 0 : _a.followee_count;
        });
    }
    getFollowersCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const aliasToUse = user.alias;
            console.log("Alias to use: " + aliasToUse);
            const params = {
                TableName: this.tableName,
                Key: {
                    'alias': aliasToUse,
                },
            };
            const response = yield (0, ClientAccess_1.getClient)().send(new lib_dynamodb_1.GetCommand(params));
            console.log(response);
            if (!response.Item) {
                throw new Error(`User with alias ${aliasToUse} not found`);
            }
            return (_a = response.Item) === null || _a === void 0 ? void 0 : _a.follower_count;
        });
    }
}
exports.UserTableDAO = UserTableDAO;
