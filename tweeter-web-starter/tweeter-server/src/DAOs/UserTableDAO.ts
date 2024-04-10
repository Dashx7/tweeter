import { AuthToken, User } from "tweeter-shared";
import { getClient, getDocumentClient } from "./ClientAccess";
import { GetCommand, UpdateCommand, } from "@aws-sdk/lib-dynamodb";


//Usertable will be key alias, and have passwordHashed, first_name, last_name, image_URL, follower_count, followee_count

export class UserTableDAO {
    private readonly tableName: string = "users";

    async getUser(alias: string): Promise<User> {
        const params = {
            TableName: this.tableName,
            Key: {
                alias: alias
            }
        };

        const response = await getClient().send(new GetCommand(params));

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

    async follow(aliasOfFollower: string, aliasOfFollowee: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: {
                alias: aliasOfFollower
            },
            ExpressionAttributeValues: {
                ":inc": 1
            },
            UpdateExpression: "SET followee_count = followee_count + :inc",
        };
        const response = await getDocumentClient().send(new UpdateCommand(params));
        console.log(response);

        const params2 = {
            TableName: this.tableName,
            Key: {
                alias: aliasOfFollowee
            },
            ExpressionAttributeValues: {
                ":inc": 1
            },
            UpdateExpression: "SET follower_count = follower_count + :inc",
        };
        const response2 = await getDocumentClient().send(new UpdateCommand(params2));
        console.log(response2);

        return;
    }

    async unfollow(aliasOfFollower: string, aliasOfFollowee: string): Promise<void> {

        const params = {
            TableName: this.tableName,
            Key: {
                alias: aliasOfFollower
            },
            ExpressionAttributeValues: {
                ":inc": -1
            },
            UpdateExpression: "ADD followee_count :val"
        };
        const response = await getDocumentClient().send(new UpdateCommand(params));
        console.log(response);

        const params2 = {
            TableName: this.tableName,
            Key: {
                alias: aliasOfFollowee
            },
            ExpressionAttributeValues: {
                ":inc": -1
            },
            UpdateExpression: "ADD follower_count :val"
        };
        const response2 = await getDocumentClient().send(new UpdateCommand(params2));
        console.log(response2);

        return;
    }

    async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {

        const aliasToUse: string = user.alias;
        console.log("Alias to use: " + aliasToUse);

        const params = {
            TableName: this.tableName,
            Key: {
                alias: aliasToUse
            }
        };

        const response = await getClient().send(new GetCommand(params));
        console.log(response);

        if (!response.Item) {
            throw new Error(`User with alias ${aliasToUse} not found`);
        }

        return response.Item?.followee_count
    }

    async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {

        const aliasToUse: string = user.alias;
        console.log("Alias to use: " + aliasToUse);
        const params = {
            TableName: this.tableName,
            Key: {
                'alias': aliasToUse,
            },
        };

        const response = await getClient().send(new GetCommand(params));
        console.log(response);

        if (!response.Item) {
            throw new Error(`User with alias ${aliasToUse} not found`);
        }

        return response.Item?.follower_count
    }
}