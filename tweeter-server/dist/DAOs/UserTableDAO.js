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
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
class UserTableDAO {
    constructor() {
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-west-2" });
    }
    follow(toFollowAlias, followerAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: 'Users',
                Key: { id: { S: toFollowAlias } },
                UpdateExpression: 'ADD following :followerAlias',
                ExpressionAttributeValues: {
                    ':followerAlias': { SS: [followerAlias] },
                },
                ReturnValues: client_dynamodb_1.ReturnValue.UPDATED_NEW,
            };
            yield this.client.send(new lib_dynamodb_1.UpdateCommand(params));
        });
    }
    unfollow(toUnfollowAlias, followerAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: 'Users',
                Key: { id: { S: toUnfollowAlias } },
                UpdateExpression: 'DELETE following :followerAlias',
                ExpressionAttributeValues: {
                    ':followerAlias': { SS: [followerAlias] },
                },
                ReturnValues: client_dynamodb_1.ReturnValue.UPDATED_NEW,
            };
            yield this.client.send(new lib_dynamodb_1.UpdateCommand(params));
        });
    }
}
exports.UserTableDAO = UserTableDAO;
