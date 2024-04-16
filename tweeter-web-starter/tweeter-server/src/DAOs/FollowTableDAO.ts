import { AuthToken, User } from "tweeter-shared";
import { FollowTableDAOInterface } from "./AbstractFollowTableDAO";
import { AuthTokenTableDAO } from "./AuthTokenTableDAO";
import { getDocumentClient } from "./ClientAccess";
import { DeleteCommand, PutCommand, QueryCommand, QueryCommandInput, } from "@aws-sdk/lib-dynamodb";


//Follow table will have two indexes
// One is the key follow_alias, and associates follow_username, followee_alias, and followee_username (This one is to find all the people they follow)
// The other is key followee_alias, and assocites followee_username, follow_alias and follow_username (This one is to find all the people that follow them)

export class FollowTableDAO implements FollowTableDAOInterface {
    private readonly followTableName: string = "follows";

    async loadMoreFollowers(
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[string[], boolean]> {

        const followee_alias = user.alias;
        console.log("Alias for follower :" + followee_alias);

        const params: QueryCommandInput = {
            TableName: this.followTableName,
            IndexName: "followee_alias-follower_alias-index",
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


        const aliasList: string[] = [];
        const data = await getDocumentClient().send(new QueryCommand(params));
        console.log("This is the Data :" + JSON.stringify(data));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) => {
            if (item.follower_alias && item.follower_alias.trim() !== "") {
                aliasList.push(item.follower_alias);
            }
        });
        console.log("Alias List: " + aliasList);

        return [aliasList, hasMorePages];
    }

    async loadMoreFollowees(
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[string[], boolean]> {

        const follower_alias = user.alias;
        console.log("Alias for follower :" + follower_alias);

        const params: QueryCommandInput = {
            TableName: this.followTableName,
            KeyConditionExpression: "follower_alias = :follower_alias",
            ExpressionAttributeValues: {
                ":follower_alias": follower_alias
            },
            Limit: pageSize,
            ExclusiveStartKey: lastItem === undefined || lastItem === null
                ? undefined
                : {
                    ["follower_alias"]: follower_alias,
                }
        };

        // const items: User[] = [];
        const aliasList: string[] = [];
        const data = await getDocumentClient().send(new QueryCommand(params));
        console.log("This is the Data :" + JSON.stringify(data));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) => {
            if (item.followee_alias && item.followee_alias.trim() !== "") {
                aliasList.push(item.followee_alias);
            }
        });
        console.log("Alias List: " + aliasList);

        return [aliasList, hasMorePages];
    }


    async getIsFollowerStatus(
        user: User,
        selectedUser: User
    ): Promise<boolean> {

        // Retrieve follower information
        const followerAlias = user.alias;
        const followeeAlias = selectedUser.alias;

        // Using template literals
        const params = {
            TableName: this.followTableName,
            KeyConditionExpression: 'follower_alias = :follower_alias and followee_alias = :followee_alias',
            ExpressionAttributeValues: {
                ':follower_alias': followerAlias,
                ':followee_alias': followeeAlias
            }
        };

        const response = await getDocumentClient().send(new QueryCommand(params));
        console.log("Response: " + JSON.stringify(response));
        return response.Items && response.Items.length > 0 ? true : false;

    }

    async follow(
        // authToken: AuthToken,
        originalUser: User,
        userToFollow: User
    ): Promise<string> {

        // Extract user information
        const followeeAlias = userToFollow.alias; // Assuming alias is the user's identifier
        const followerAlias = originalUser.alias;

        console.log("Follower alias: " + followerAlias + " Followee alias: " + followeeAlias);
        const params = {
            TableName: this.followTableName,
            Item: {
                follower_alias: followerAlias,
                followee_alias: followeeAlias
            }
        };

        const response = await getDocumentClient().send(new PutCommand(params));
        // console.log(response);

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

        const response = await getDocumentClient().send(new DeleteCommand(params));
        console.log(response);

        return followerAlias;
    }

}