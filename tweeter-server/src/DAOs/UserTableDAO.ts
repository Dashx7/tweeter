import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, ReturnValue } from "@aws-sdk/client-dynamodb";
export class UserTableDAO {
    private client: DynamoDBClient;

    constructor() {
        this.client = new DynamoDBClient({ region: "us-west-2" });
    }

    async follow(toFollowAlias: string, followerAlias: string): Promise<void> {
        const params = {
            TableName: 'Users',
            Key: { id: { S: toFollowAlias } },
            UpdateExpression: 'ADD following :followerAlias',
            ExpressionAttributeValues: {
                ':followerAlias': { SS: [followerAlias] },
            },
            ReturnValues: ReturnValue.UPDATED_NEW,
        };

        await this.client.send(new UpdateCommand(params));
    }

    async unfollow(toUnfollowAlias: string, followerAlias: string): Promise<void> {
        const params = {
            TableName: 'Users',
            Key: { id: { S: toUnfollowAlias } },
            UpdateExpression: 'DELETE following :followerAlias',
            ExpressionAttributeValues: {
                ':followerAlias': { SS: [followerAlias] },
            },
            ReturnValues: ReturnValue.UPDATED_NEW,
        };

        await this.client.send(new UpdateCommand(params));
    }
}