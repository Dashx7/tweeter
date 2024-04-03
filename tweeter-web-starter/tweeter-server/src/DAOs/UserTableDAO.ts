import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { User } from "tweeter-shared";

//Usertable will be key alias, and have passwordHashed, first_name, last_name, image_URL, follower_count, followee_count

export class UserTableDAO {
    private client: DynamoDBClient;
    private readonly tableName: string;

    constructor() {
        this.client = new DynamoDBClient({ region: "us-east-1" }); // replace with your region
        this.tableName = "users"; // replace with your table name
    }

    async getUser(alias: string): Promise<User> {
        const params = {
            TableName: this.tableName,
            Key: {
                alias: alias
            }
        };

        const response = await this.client.send(new GetCommand(params));

        if (!response.Item) {
            throw new Error(`User with alias ${alias} not found`);
        }
        if (!response.Item.first_name || !response.Item.last_name || !response.Item.alias || !response.Item.image_URL) {
            throw new Error(`User with alias ${alias} is missing required fields`);
        }
        console.log(response.Item);

        // Convert the response.Item into a User object
        let user: User = new User(response.Item.first_name, response.Item.last_name, response.Item.alias, response.Item.image_URL);
        return user;
    }
}