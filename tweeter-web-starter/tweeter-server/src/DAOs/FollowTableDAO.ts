import { DynamoDBClient, Select } from "@aws-sdk/client-dynamodb";
import { GetCommand, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

import { AuthToken, User } from "tweeter-shared";
import { FollowTableDAOInterface } from "./AbstractFollowTableDAO";

//Follow table will have two indexes
// One is the key follow_alias, and associates follow_username, followee_alias, and followee_username (This one is to find all the people they follow)
// The other is key followee_alias, and assocites followee_username, follow_alias and follow_username (This one is to find all the people that follow them)

export class FollowTableDAO implements FollowTableDAOInterface {
    private client: DynamoDBClient;
    private readonly tableName: string;
    private readonly followerName: string;
    private readonly followerHandle: string;
    private readonly followeeName: string;
    private readonly followeeHandle: string;

    constructor() {
        this.client = new DynamoDBClient({ region: "us-east-1" }); // replace with your region
        this.tableName = "follows"; // replace with your table name
        this.followeeName = "followee_name";
        this.followeeHandle = "followee_handle";
        this.followerName = "follower_name";
        this.followerHandle = "follower_handle";
    }

    async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        const params = {
            TableName: this.tableName,
            IndexName: 'followee_index',
            KeyConditionExpression: 'followee_handle = :followee_handle',
            ExpressionAttributeValues: {
                ':followee_handle': { S: user.alias },
            },
            Select: Select.COUNT,
        };

        const output = await this.client.send(new QueryCommand(params));
        if (output.Count === undefined) {
            return 0;
        }
        console.log("Output count :" + output.Count);
        return output.Count;
    }

    async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[number, number]> {
        const params = {
            TableName: 'Users',
            Key: { id: { S: userToFollow.alias } },
            UpdateExpression: 'ADD following :followerAlias',
            ExpressionAttributeValues: {
                // ':followerAlias': { SS: [authToken.alias] },
            },
            ReturnValues: 'UPDATED_NEW',
        };

        // const response = await this.client.send(new UpdateCommand(params));
        // TODO: Extract the updated follower and followee counts from the response
        return [0, 0]; // Replace with actual counts
    }

    async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[number, number]> {
        const params = {
            TableName: 'Users',
            Key: { id: { S: userToUnfollow.alias } },
            UpdateExpression: 'DELETE following :followerAlias',
            ExpressionAttributeValues: {
                // ':followerAlias': { SS: [authToken.alias] },
            },
            ReturnValues: 'UPDATED_NEW',
        };

        // const response = await this.client.send(new UpdateCommand(params));
        // TODO: Extract the updated follower and followee counts from the response
        return [0, 0]; // Replace with actual counts
    }

}