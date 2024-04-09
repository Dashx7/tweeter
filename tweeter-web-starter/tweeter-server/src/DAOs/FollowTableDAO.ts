import { DynamoDBClient, PutItemCommand, PutItemCommandInput, QueryCommand, UpdateItemCommand, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import {
    GetCommand, QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { AuthToken, User } from "tweeter-shared";
import { FollowTableDAOInterface } from "./AbstractFollowTableDAO";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { AuthTokenTableDAO } from "./AuthTokenTableDAO";
import { UserTableDAO } from "./UserTableDAO";

//Follow table will have two indexes
// One is the key follow_alias, and associates follow_username, followee_alias, and followee_username (This one is to find all the people they follow)
// The other is key followee_alias, and assocites followee_username, follow_alias and follow_username (This one is to find all the people that follow them)

export class FollowTableDAO implements FollowTableDAOInterface {
    private client: DynamoDBClient;
    private readonly followTableName: string;
    private readonly userTableName: string;
    private readonly followerName: string;
    private readonly followerHandle: string;
    private readonly followeeName: string;
    private readonly followeeHandle: string;

    constructor() {
        this.client = new DynamoDBClient({ region: "us-east-1" });
        this.followTableName = "follows";
        this.userTableName = "users";
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
        AuthTokenTableDAO.authenticate(authToken);
        throw new Error("Method not implemented.");
    }

    async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Implement this method
        AuthTokenTableDAO.authenticate(authToken);
        throw new Error("Method not implemented.");
    }

    //About to test
    async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // TODO: Implement this method
        AuthTokenTableDAO.authenticate(authToken);

        // Retrieve follower information
        const followerAlias = user.alias;
        const followedAlias = selectedUser.alias;

        // Using template literals
        const params: QueryCommandInput = {
            TableName: this.followTableName,
            KeyConditionExpression: `followerAlias = :followerAlias AND followedAlias = :followedAlias`,
            ExpressionAttributeValues: {
                ":followerAlias": followerAlias,
                ":followedAlias": followedAlias
            }
        };

        const response = await this.client.send(new QueryCommand(params));
        console.log("Response: " + JSON.stringify(response));
        return response.Items && response.Items.length > 0 ? true : false;

    }

    async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        AuthTokenTableDAO.authenticate(authToken);
        console.log("User: " + JSON.stringify(user));
        const aliasToUse: string = user.alias;
        console.log("Alias to use: " + aliasToUse);
        const params = {
            TableName: this.userTableName,
            Key: {
                'alias': aliasToUse,
            },
        };
        console.log("Attempting to get followee count of " + aliasToUse);
        const output = await this.client.send(new GetCommand(params));
        if (!output.Item || !output.Item.followee_count || !output.Item.followee_count.N) {
            return 0;
        }
        console.log("Output count :" + output.Item.followee_count.N);
        return Number(output.Item.followee_count.N);
    }

    async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        AuthTokenTableDAO.authenticate(authToken);
        console.log("User: " + JSON.stringify(user));
        const aliasToUse: string = user.alias;
        console.log("Alias to use: " + aliasToUse);
        const params = {
            TableName: this.userTableName,
            Key: {
                'alias': aliasToUse,
            },
        };
        console.log("Attempting to get follower count of " + aliasToUse);
        const output = await this.client.send(new GetCommand(params));
        if (!output.Item || !output.Item.follower_count || !output.Item.follower_count.N) {
            return 0;
        }
        console.log("Output count :" + output.Item.follower_count.N);
        return Number(output.Item.follower_count.N);
    }

    //Might work
    async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[number, number]> {
        AuthTokenTableDAO.authenticate(authToken);

        // Extract user information
        const followeeAlias = userToFollow.alias; // Assuming alias is the user's identifier
        const originalUser = await AuthTokenTableDAO.findUserByAuthToken(authToken);
        const followerAlias = originalUser.alias;


        const params: PutItemCommandInput = {
            TableName: this.followTableName,
            Item: {
                follower_alias: { S: followerAlias },
                followee_alias: { S: followeeAlias }
            }
        };
        try {
            const response = await this.client.send(new PutItemCommand(params));
            if (response.$metadata.httpStatusCode !== 200) {
                throw new Error("Error following user: " + response.$metadata.httpStatusCode);
            }

            //Get the updated follower and followee counts by calling the getFollowersCount and getFolloweesCount methods with the orginal user
            const followerCount = await this.getFollowersCount(authToken, originalUser);
            const followingCount = await this.getFolloweesCount(authToken, originalUser);

            return [followerCount, followingCount];
        } catch (error) {
            console.error("Error following user:", error);
            throw error;
        }
    }

    // Probably doesn't work
    async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[number, number]> {
        AuthTokenTableDAO.authenticate(authToken);

        // Extract user information
        const followerAlias = userToUnfollow.alias;

        // Define update parameters
        const params: UpdateItemCommandInput = {
            TableName: this.userTableName,
            Key: {
                id: { S: followerAlias } // Update user with the matching alias
            },
            UpdateExpression: 'SET following = list_delete(following, :followerAlias)',
            ExpressionAttributeValues: {
                ':followerAlias': { S: followerAlias }
            },
            ReturnValues: 'UPDATED_NEW' // Return updated follower count
        };

        try {
            const response = await this.client.send(new UpdateItemCommand(params));

            // Get the updated follower and followee counts
            const originalUser = await AuthTokenTableDAO.findUserByAuthToken(authToken);
            const followerCount = await this.getFollowersCount(authToken, originalUser);
            const followingCount = await this.getFolloweesCount(authToken, originalUser);

            return [followerCount, followingCount];
        } catch (error) {
            console.error("Error unfollowing user:", error);
            throw error; // Re-throw for proper error handling
        }
    }

}