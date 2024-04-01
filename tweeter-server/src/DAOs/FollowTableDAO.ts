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

export class FollowTableDAO {
    private client: DynamoDBClient;
    private tableName: string;

    constructor() {
        this.client = new DynamoDBClient({ region: "us-east-1" }); // replace with your region
        this.tableName = "Users"; // replace with your table name
    }

    async getUser(alias: string): Promise<User> {
        const params = {
            TableName: this.tableName,
            Key: {
                alias: { S: alias }
            }
        };

        const response = await this.client.send(new GetCommand(params));

        if (!response.Item) {
            throw new Error(`User with alias ${alias} not found`);
        }

        // Convert the response.Item into a User object
        const user: User = {
            alias: response.Item.alias.S,
            // Add other User properties here
        };

        return user;
    }
}