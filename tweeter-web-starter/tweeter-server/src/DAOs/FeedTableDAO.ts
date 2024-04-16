import { User, Status } from "tweeter-shared";
import { FeedTableInterface } from "./AbstractFeedTableDAO";
import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { getDocumentClient } from "./ClientAccess";
import { QueryCommand, QueryCommandInput, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { StoryTableDAO } from "./StoryTableDAO";

//Feed table will have the key alias, and associate those with status of their friends sorted by timestamp (post, user, timestamp, segment)

export class FeedTableDAO implements FeedTableInterface {
    private feedTableName: string = "feeds";
    async loadMoreFeedItems(
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {

        const receiver_alias = user.alias;
        const time_stamp = lastItem?.timestamp;
        console.log("Receiver alias for feed :" + receiver_alias + " Time stamp: " + time_stamp);
        console.log("Confirming deserialization of user: " + user.toJson());
        console.log("receiver_alias: " + receiver_alias + " pageSize: " + pageSize + " lastItem: " + lastItem?.toJson());

        const params: QueryCommandInput = {
            TableName: this.feedTableName,
            KeyConditionExpression: "receiver_alias = :receiver_alias",
            ExpressionAttributeValues: {
                ":receiver_alias": receiver_alias
            },
            Limit: pageSize,
            ExclusiveStartKey: lastItem === undefined || lastItem === null
                ? undefined
                : {
                    ["receiver_alias"]: receiver_alias,
                    ["time_stamp"]: lastItem.timestamp.toString()
                }
        };

        const items: Status[] = [];
        const data = await getDocumentClient().send(new QueryCommand(params));
        console.log(data);
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) =>
            items.push(
                new Status(
                    item.post,
                    user,
                    Number(item.time_stamp)
                )
            )
        );
        // items.reverse(); // Reverse the order of the items so that the most recent status is first
        return [items, hasMorePages];
    }

    async postStatus(
        status: Status,
        followerAlias: string
    ): Promise<void> {
        const aliasOfStatus: string = status.user.alias;
        const firstName: string = status.user.firstName;
        const lastName: string = status.user.lastName;
        const imageUrl: string = status.user.imageUrl;

        if (status == null) {
            throw new Error("Status is undefined in postStatus");
        }
        if (status.user == null) {
            throw new Error("User is undefined in postStatus");
        }
        if (aliasOfStatus == null) {
            throw new Error("Alias of follower is undefined in postStatus");
        }
        console.log("Posting status to feed with alias: " + aliasOfStatus + " and status: " + status.post + " and timestamp: " + status.timestamp + " and user: " + status.user.alias);
        const updateParams = {
            TableName: this.feedTableName,
            Key: {
                receiver_alias: followerAlias.toString(),
                time_stamp: status.timestamp.toString()
            },
            UpdateExpression: 'SET post = :post, status_alias = :status_alias, firstName = :firstName, lastName = :lastName, imageUrl = :imageUrl',
            ExpressionAttributeValues: {
                ':post': status.post,
                ':status_alias': aliasOfStatus,
                ':firstName': firstName,
                ':lastName': lastName,
                ':imageUrl': imageUrl
            },
            ReturnValues: ReturnValue.UPDATED_NEW
        };

        const responseToUpdate = await getDocumentClient().send(new UpdateCommand(updateParams));
        if (responseToUpdate == null) {
            throw new Error("Error posting status");
        }
        console.log(responseToUpdate);

        return;
    }
}