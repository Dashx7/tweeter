import { AuthToken, User, Status } from "tweeter-shared";
import { StoryTableInterface } from "./AbstractStoryTableDAO";
import { getClient, getDocumentClient } from "./ClientAccess";
import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { QueryCommand, QueryCommandInput, UpdateCommand } from "@aws-sdk/lib-dynamodb";


//Story table will have the key alias, and associate those with their statuses sorted by timestame

export class StoryTableDAO implements StoryTableInterface {
    private readonly storyTableName = "stories";
    private readonly authTokenTableName = "authtokens";

    async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {

        const alias = user.alias;
        const time_stamp = lastItem?.timestamp;
        console.log("Alias for story :" + alias + " Time stamp: " + time_stamp);
        //console.log(time_stamp);

        const params: QueryCommandInput = {
            TableName: "stories",
            KeyConditionExpression: "alias = :alias",
            ExpressionAttributeValues: {
                ":alias": alias
            },
            Limit: pageSize,
            ExclusiveStartKey: lastItem === undefined || lastItem === null
                ? undefined
                : {
                    ["alias"]: alias,
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
        return [items, hasMorePages];
    }

    // Working
    async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {
        const alias = status.user.alias; //Pulling the alias from the status's user
        // console.log(status.segments);
        // const formattedSegments = status.segments.map(segment => ({ // This is to format the segments to be put into the database
        //     text: segment.text,
        //     startPostion: segment.startPostion,
        //     endPosition: segment.endPosition,
        //     type: segment.type
        // }));
        // if (formattedSegments === null) {
        //     throw new Error("Error formatting segments");
        // }
        // console.log(formattedSegments);

        // const updateParams = {
        //     TableName: this.storyTableName,
        //     Key: {
        //         alias: alias.toString(),
        //         time_stamp: status.timestamp.toString()
        //     },
        //     UpdateExpression: 'SET status_segments = list_append(if_not_exists(status_segments, :empty_list), :newSegment)',
        //     ExpressionAttributeValues: {
        //         ':newSegment': [formattedSegments],
        //         ':empty_list': []
        //     },
        //     ReturnValues: ReturnValue.UPDATED_NEW
        // };

        const updateParams = {
            TableName: this.storyTableName,
            Key: {
                alias: alias.toString(),
                time_stamp: status.timestamp.toString()
            },
            UpdateExpression: 'SET post = :post',
            ExpressionAttributeValues: {
                ':post': status.post
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