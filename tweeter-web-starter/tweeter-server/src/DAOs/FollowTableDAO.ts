import { DynamoDBClient, PutItemCommand, PutItemCommandInput, QueryCommand, UpdateItemCommand, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand, PutCommand, QueryCommandInput,
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
    private client: DynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
    private readonly followTableName: string = "follows";
    private readonly userTableName: string = "users";
    private ddbDocClient = DynamoDBDocumentClient.from(this.client);

    constructor() { }

    async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {

        const followee_alias = user.alias;
        console.log("Alias for follower :" + followee_alias);

        const params: QueryCommandInput = {
            TableName: this.userTableName,
            KeyConditionExpression: "followee_alias = :followee_alias",
            ExpressionAttributeValues: {
                ":followee_alias": followee_alias
            },
            Limit: pageSize,
            ExclusiveStartKey: lastItem === undefined || lastItem === null
                ? undefined
                : {
                    ["followee_alias"]: followee_alias,
                }
        };

        const items: User[] = [];
        const data = await this.ddbDocClient.send(new QueryCommand(params));
        console.log(data);
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        // data.Items?.forEach((item) =>
        //     items.push(
        //         new User(
        //             item.first_name,
        //             item.last_name,
        //             item.alias,
        //             item.image_URL
        //         )
        //     )
        // );
        return [items, hasMorePages];
    }

    async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {

        throw new Error("Method not implemented.");
    }

    //About to test
    async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {

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

    // async getFolloweesCount(
    //     authToken: AuthToken,
    //     user: User
    // ): Promise<number> {
    //     // console.log("User: " + JSON.stringify(user));
    //     const aliasToUse: string = user.alias;
    //     console.log("Alias to use: " + aliasToUse);
    //     // const params = {
    //     //     TableName: this.userTableName,
    //     //     Key: {
    //     //         'alias': aliasToUse,
    //     //     },
    //     // };
    //     // console.log("Attempting to get followee count of " + aliasToUse);
    //     // const output = await this.ddbDocClient.send(new GetCommand(params));
    //     // console.log("Output: " + JSON.stringify(output));
    //     // if (output.Item === undefined) {
    //     //     console.log("Output is undefined");
    //     //     return -1;
    //     // }
    //     // console.log("Output count :" + output.Item.followee_count.N);
    //     // if (!output.Item || !output.Item.followee_count || !output.Item.followee_count.N) {
    //     //     return 0;
    //     // }
    //     // return Number(output.Item.followee_count.N);
    // }

    // async getFollowersCount(
    //     authToken: AuthToken,
    //     user: User
    // ): Promise<number> {
    //     AuthTokenTableDAO.authenticate(authToken);
    //     // console.log("User: " + JSON.stringify(user));
    //     const aliasToUse: string = user.alias;
    //     // console.log("Alias to use: " + aliasToUse);
    //     const params = {
    //         TableName: this.userTableName,
    //         Key: {
    //             'alias': aliasToUse,
    //         },
    //     };
    //     console.log("Attempting to get follower count of " + aliasToUse);
    //     const output = await this.ddbDocClient.send(new GetCommand(params));
    //     console.log("Output: " + JSON.stringify(output));
    //     if (output.Item === undefined) {
    //         console.log("Output is undefined");
    //         return -1;
    //     }
    //     console.log("Output count :" + output.Item.follower_count.N);
    //     if (!output.Item || !output.Item.follower_count || !output.Item.follower_count.N) {
    //         return 0;
    //     }
    //     return Number(output.Item.follower_count.N);
    // }

    // async getFolloweesCountByQuery(
    //     authToken: AuthToken,
    //     user: User
    // ): Promise<number> {
    //     AuthTokenTableDAO.authenticate(authToken);
    //     console.log("User: " + JSON.stringify(user));
    //     const aliasToUse: string = user.alias;
    //     console.log("Alias to use: " + aliasToUse);

    //     const params = {
    //         TableName: this.userTableName,
    //         Key: {
    //             'alias': aliasToUse,
    //         },
    //     };
    //     console.log("Attempting to get followee count of " + aliasToUse);
    //     const output = await this.client.send(new GetCommand(params));
    //     if (!output.Item || !output.Item.followee_count || !output.Item.followee_count.N) {
    //         return 0;
    //     }
    //     console.log("Output count :" + output.Item.followee_count.N);
    //     return Number(output.Item.followee_count.N);
    // }

    //Need to update count in users table
    async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<string> {

        // Extract user information
        const followeeAlias = userToFollow.alias; // Assuming alias is the user's identifier
        const originalUser = await AuthTokenTableDAO.findUserByAuthToken(authToken);
        const followerAlias = originalUser.alias;

        console.log("Follower alias: " + followerAlias + " Followee alias: " + followeeAlias);
        const params = {
            TableName: this.followTableName,
            Item: {
                follower_alias: followerAlias,
                followee_alias: followeeAlias
            }
        };

        const response = await this.ddbDocClient.send(new PutCommand(params));
        console.log(response);

        return followerAlias;
    }

    async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<string> {

        // Extract user information
        const followeeAlias = userToUnfollow.alias; // Assuming alias is the user's identifier
        const originalUser = await AuthTokenTableDAO.findUserByAuthToken(authToken);
        const followerAlias = originalUser.alias;

        console.log("Follower alias: " + followerAlias + " Followee alias: " + followeeAlias);
        const params = {
            TableName: this.followTableName,
            Key: {
                follower_alias: followerAlias,
                followee_alias: followeeAlias
            }
        };

        const response = await this.ddbDocClient.send(new DeleteCommand(params));
        console.log(response);

        return followerAlias;
    }

}