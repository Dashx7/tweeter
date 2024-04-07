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
const tweeter_shared_1 = require("tweeter-shared");
//Usertable will be key alias, and have passwordHashed, first_name, last_name, image_URL, follower_count, followee_count
class UserTableDAO {
    constructor() {
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
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
            const response = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
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
}
exports.UserTableDAO = UserTableDAO;
