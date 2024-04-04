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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
//AuthToken Table will have the key alias, and token and timestamp
class AuthTokenTableDAO {
    constructor() {
        this.BUCKET = "joshwiseman340";
        this.REGION = "us-east-1";
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" }); // replacere with your region
        this.AuthTokenTableName = "authtokens"; // replace with your table name
        this.usersTableName = "users";
    }
    login(aliasToUse, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.usersTableName,
                Key: {
                    alias: aliasToUse
                }
            };
            const response = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            if (response.Item == null) {
                throw new Error;
            }
            console.log(response.Item);
            if (!response.Item.password_hashed) {
                throw new Error(`User with alias ${aliasToUse} is missing password_hashed field`);
            }
            if (!response.Item.first_name) {
                throw new Error(`User with alias ${aliasToUse} is missing first_name field`);
            }
            if (!response.Item.last_name) {
                throw new Error(`User with alias ${aliasToUse} is missing last_name field`);
            }
            if (!response.Item.image_URL) {
                throw new Error(`User with alias ${aliasToUse} is missing image_URL field`);
            }
            if (response.Item.follower_count === null) {
                throw new Error(`User with alias ${aliasToUse} is missing follower_count field`);
            }
            if (response.Item.followee_count === null) {
                throw new Error(`User with alias ${aliasToUse} is missing followee_count field`);
            }
            // Bcrypt compare password to hashed password, if not valid throw error
            console.log("Starting password comparison");
            const match = yield bcryptjs_1.default.compare(password, response.Item.password_hashed);
            if (match) {
                console.log('Passwords match');
            }
            else {
                console.log('Passwords do not match');
                throw new Error("Invalid alias or password");
            }
            const authToken = tweeter_shared_1.AuthToken.Generate();
            // Put authtoken into authtoken table
            const putParams = {
                TableName: this.AuthTokenTableName,
                Item: {
                    alias: aliasToUse,
                    token: authToken.token,
                    timestamp: authToken.timestamp
                }
            };
            const responseToAuthPut = yield this.client.send(new lib_dynamodb_1.PutCommand(putParams));
            console.log(responseToAuthPut);
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
                return (`https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/image/${fileName}`);
            }
            catch (error) {
                throw Error("S3 put image failed with: " + error);
            }
        });
    }
    sexyPutImage(fileName, userImageBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const s3 = new aws_sdk_1.default.S3();
            try {
                let imageStringBase64 = Buffer.from(userImageBytes).toString('base64');
                const params = {
                    Bucket: this.BUCKET,
                    Key: `image/${fileName}`,
                    Body: Buffer.from(imageStringBase64, 'base64'),
                    ContentType: "image/jpeg",
                    ACL: 'public-read' // if you want the image to be publicly accessible
                };
                yield s3.putObject(params).promise();
                return `https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/image/${fileName}`;
            }
            catch (error) {
                console.error(`s3 put image failed with: ${error}`);
                throw Error(`s3 put image failed with: ${error}`);
            }
        });
    }
    register(firstName, lastName, alias, password, userImageBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const password_hashed = yield bcryptjs_1.default.hash(password, 1);
            let follower_count = 0;
            let followee_count = 0;
            //Image section
            if (userImageBytes === null) {
                throw new Error("User image is null");
            }
            console.log("Registering user with image bytes: " + userImageBytes.byteLength + userImageBytes);
            let imageStringBase64 = Buffer.from(userImageBytes).toString("base64");
            console.log("Image String Base64: " + imageStringBase64);
            let image_URL = yield this.putImage(alias, imageStringBase64);
            // let image_URL = "https://joshwiseman340.s3.us-east-1.amazonaws.com/image/" + alias; //TODO: Change this to the correct URL
            console.log("Image URL: " + image_URL);
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
            return [user, authToken];
        });
    }
}
exports.AuthTokenTableDAO = AuthTokenTableDAO;
