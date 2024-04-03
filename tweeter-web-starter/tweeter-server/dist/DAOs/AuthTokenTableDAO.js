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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenTableDAO = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_s3_1 = require("@aws-sdk/client-s3");
//AuthToken Table will have the key alias, and token and timestamp
class AuthTokenTableDAO {
    constructor() {
        this.BUCKET = "joshwiseman340";
        this.REGION = "us-east-1";
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" }); // replace with your region
        this.AuthTokenTableName = "authtoken"; // replace with your table name
        this.usersTableName = "users";
    }
    login(alias, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Validate the user's credentials
            const params = {
                TableName: this.usersTableName,
                Key: {
                    alias: alias
                }
            };
            const response = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            if (response.Item == null) {
                throw new Error;
            }
            if (!response.Item.passwordHashed || !response.Item.first_name || !response.Item.last_name || !response.Item.image_URL || !response.Item.follower_count || !response.Item.followee_count) {
                throw new Error("User with alias ${alias} is missing required fields");
            }
            // Bcrypt compare password to hashed password, if not valid throw error
            const match = yield bcryptjs_1.default.compare(password, response.Item.passwordHashed);
            if (!match) {
                throw new Error("Invalid password");
            }
            const authToken = tweeter_shared_1.AuthToken.Generate();
            // Put authtoken into authtoken table
            const putParams = {
                TableName: this.AuthTokenTableName,
                Item: {
                    alias: alias,
                    token: authToken.token,
                    timestamp: authToken.timestamp
                }
            };
            yield this.client.send(new lib_dynamodb_1.PutCommand(putParams));
            let user = new tweeter_shared_1.User(response.Item.first_name, response.Item.last_name, response.Item.alias, response.Item.image_URL);
            return [user, authToken];
        });
    }
    logout(authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
            throw new Error("Method not implemented.");
            //Remove authtoken query from authtoken's alias
        });
    }
    putImage(fileName, imageStringBase64Encoded) {
        return __awaiter(this, void 0, void 0, function* () {
            let decodedImageBuffer = Buffer.from(imageStringBase64Encoded, "base64");
            const s3Params = {
                Bucket: this.BUCKET,
                Key: "image/" + fileName,
                Body: decodedImageBuffer,
                ContentType: "image/png",
                ACL: client_s3_1.ObjectCannedACL.public_read,
            };
            const c = new client_s3_1.PutObjectCommand(s3Params);
            try {
                yield this.client.send(c);
                return (`https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/image/{fileName}`);
            }
            catch (error) {
                throw Error("s3 put image failed with: " + error);
            }
        });
    }
    register(firstName, lastName, alias, password, userImageBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const password_hashed = yield bcryptjs_1.default.hash(password, 10);
            let follower_count = 0;
            let followee_count = 0;
            let imageStringBase64 = Buffer.from(userImageBytes).toString("base64");
            let image_URL = yield this.putImage(alias, imageStringBase64);
            //Put user variables, password_hashed, follower_count, followee_count into users table
            const params = {
                TableName: "users",
                Item: {
                    alias: alias,
                    password_hashed: password_hashed,
                    first_name: firstName,
                    last_name: lastName,
                    image_URL: image_URL,
                    follower_count: follower_count,
                    followee_count: followee_count
                }
            };
            yield this.client.send(new lib_dynamodb_1.PutCommand(params));
            let user = new tweeter_shared_1.User(firstName, lastName, alias, image_URL);
            const authToken = tweeter_shared_1.AuthToken.Generate();
            return [user, authToken];
        });
    }
}
exports.AuthTokenTableDAO = AuthTokenTableDAO;
