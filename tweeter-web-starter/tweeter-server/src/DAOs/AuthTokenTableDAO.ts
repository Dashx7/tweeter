import { AuthToken, User } from "tweeter-shared";
import { AuthTokenTableInterface } from "./AbstractAuthTokenDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import {
    PutObjectCommand,
    ObjectCannedACL,
} from "@aws-sdk/client-s3";
import AWS from 'aws-sdk';

//AuthToken Table will have the key alias, and token and timestamp

export class AuthTokenTableDAO implements AuthTokenTableInterface {
    private client: DynamoDBClient;
    private AuthTokenTableName: string;
    private usersTableName: string;
    readonly BUCKET = "joshwiseman340";
    readonly REGION = "us-east-1";

    constructor() {
        this.client = new DynamoDBClient({ region: "us-east-1" }); // replacere with your region
        this.AuthTokenTableName = "authtokens"; // replace with your table name
        this.usersTableName = "users";
    }
    async login(aliasToUse: string, password: string): Promise<[User, AuthToken]> {
        const params = {
            TableName: this.usersTableName,
            Key: {
                alias: aliasToUse
            }
        };

        const response = await this.client.send(new GetCommand(params));

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

        const match = await bcrypt.compare(password, response.Item.password_hashed);

        if (match) {
            console.log('Passwords match');
        }
        else {
            console.log('Passwords do not match');
            throw new Error("Invalid alias or password");
        }

        const authToken = AuthToken.Generate();
        // Put authtoken into authtoken table
        const putParams = {
            TableName: this.AuthTokenTableName,
            Item: {
                alias: aliasToUse,
                token: authToken.token,
                timestamp: authToken.timestamp
            }
        };
        const responseToAuthPut = await this.client.send(new PutCommand(putParams));
        console.log(responseToAuthPut);

        let user: User = new User(response.Item.first_name, response.Item.last_name, response.Item.alias, response.Item.image_URL);

        return [user, authToken];
    }

    async logout(authToken: AuthToken): Promise<void> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
        //Remove authtoken query from authtoken's alias
    }

    async putImage(
        fileName: string,
        imageStringBase64Encoded: string
    ): Promise<string> {
        let decodedImageBuffer: Buffer = Buffer.from(
            imageStringBase64Encoded,
            "base64"
        );
        const s3Params = {
            Bucket: this.BUCKET,
            Key: "image/" + fileName,
            Body: decodedImageBuffer,
            ContentType: "image/png",
            ACL: ObjectCannedACL.public_read,
        };
        const c = new PutObjectCommand(s3Params);
        try {
            await this.client.send(c);
            return (
                `https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/image/${fileName}`
            );
        } catch (error) {
            throw Error("S3 put image failed with: " + error);
        }
    }

    async sexyPutImage(fileName: string, userImageBytes: Uint8Array): Promise<string> {
        const s3 = new AWS.S3();
        try {
            let imageStringBase64: string = Buffer.from(userImageBytes).toString('base64');

            const params = {
                Bucket: this.BUCKET,
                Key: `image/${fileName}`,
                Body: Buffer.from(imageStringBase64, 'base64'),
                ContentType: "image/jpeg",
                ACL: 'public-read' // if you want the image to be publicly accessible
            };

            await s3.putObject(params).promise();

            return `https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/image/${fileName}`;
        } catch (error) {
            console.error(`s3 put image failed with: ${error}`);
            throw Error(`s3 put image failed with: ${error}`);
        }
    }



    async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {

        const password_hashed = await bcrypt.hash(password, 1);
        let follower_count = 0;
        let followee_count = 0;

        //Image section
        if (userImageBytes === null) {
            throw new Error("User image is null");
        }
        console.log("Registering user with image bytes: " + userImageBytes.byteLength + userImageBytes);

        let imageStringBase64: string = Buffer.from(userImageBytes).toString("base64");
        console.log("Image String Base64: " + imageStringBase64);
        let image_URL = await this.putImage(alias, imageStringBase64);
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
        await this.client.send(new PutCommand(params));

        let user = new User(firstName, lastName, alias, image_URL);
        const authToken = AuthToken.Generate();
        // Put authtoken into authtoken table
        const putParams = {
            TableName: this.AuthTokenTableName,
            Item: {
                alias: alias,
                token: authToken.token,
                timestamp: authToken.timestamp
            }
        };
        await this.client.send(new PutCommand(putParams));

        return [user, authToken];
    }
}