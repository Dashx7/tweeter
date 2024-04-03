import { AuthToken, User } from "tweeter-shared";
import { AuthTokenTableInterface } from "./AbstractAuthTokenDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import {
    PutObjectCommand,
    ObjectCannedACL,
} from "@aws-sdk/client-s3";

//AuthToken Table will have the key alias, and token and timestamp

export class AuthTokenTableDAO implements AuthTokenTableInterface {
    private client: DynamoDBClient;
    private AuthTokenTableName: string;
    private usersTableName: string;
    readonly BUCKET = "joshwiseman340";
    readonly REGION = "us-east-1";

    constructor() {
        this.client = new DynamoDBClient({ region: "us-east-1" }); // replacere with your region
        this.AuthTokenTableName = "authtoken"; // replace with your table name
        this.usersTableName = "users";
    }
    async login(alias: string, password: string): Promise<[User, AuthToken]> {
        // TODO: Validate the user's credentials
        const params = {
            TableName: this.usersTableName,
            Key: {
                alias: alias
            }
        };

        const response = await this.client.send(new GetCommand(params));

        if (response.Item == null) {
            throw new Error;
        }
        if (!response.Item.passwordHashed || !response.Item.first_name || !response.Item.last_name || !response.Item.image_URL || !response.Item.follower_count || !response.Item.followee_count) {
            throw new Error("User with alias ${alias} is missing required fields");
        }

        // Bcrypt compare password to hashed password, if not valid throw error
        const match = await bcrypt.compare(password, response.Item.passwordHashed);

        if (!match) {
            throw new Error("Invalid password");
        }

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
                `https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/image/{fileName}`
            );
        } catch (error) {
            throw Error("s3 put image failed with: " + error);
        }
    }

    async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {

        const password_hashed = await bcrypt.hash(password, 10);
        let follower_count = 0;
        let followee_count = 0;

        let imageStringBase64: string = Buffer.from(userImageBytes).toString("base64");
        let image_URL = await this.putImage(alias, imageStringBase64);


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

        return [user, authToken];
    }
}