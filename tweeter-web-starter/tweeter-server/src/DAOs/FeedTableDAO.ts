import { AuthToken, User, Status } from "tweeter-shared";
import { FeedTableInterface } from "./AbstractFeedTableDAO";

//Feed table will have the key alias, and associate those with status of their friends sorted by timestamp (post, user, timestamp, segment)

export class FeedTableDAO implements FeedTableInterface {
    private feedTableName: string = "feeds";
    async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // const alias = user.alias;
        // const time_stamp = lastItem?.timestamp;
        // console.log("Alias for feed :" + alias + " Time stamp: " + time_stamp);
        // //console.log(time_stamp);

        // const params: QueryCommandInput = {
        //     TableName: "stories",
        //     KeyConditionExpression: "alias = :alias",
        //     ExpressionAttributeValues: {
        //         ":alias": alias
        //     },
        //     Limit: pageSize,
        //     ExclusiveStartKey: lastItem === undefined || lastItem === null
        //         ? undefined
        //         : {
        //             ["alias"]: alias,
        //             ["time_stamp"]: lastItem.timestamp.toString()
        //         }
        // };

        // const items: Status[] = [];
        // const data = await getDocumentClient().send(new QueryCommand(params));
        // console.log(data);
        // const hasMorePages = data.LastEvaluatedKey !== undefined;
        // data.Items?.forEach((item) =>
        //     items.push(
        //         new Status(
        //             item.post,
        //             user,
        //             Number(item.time_stamp)
        //         )
        //     )
        // );
        // return [items, hasMorePages];
        return [[], false];
    }

    async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {

        return;
        //Send 

        // const alias = status.user.alias; //Pulling the alias from the status's user
        // const updateParams = {
        //     TableName: this.feedTableName,
        //     Key: {
        //         alias: alias.toString(),
        //         time_stamp: status.timestamp.toString()
        //     },
        //     UpdateExpression: 'SET post = :post',
        //     ExpressionAttributeValues: {
        //         ':post': status.post
        //     },
        //     ReturnValues: ReturnValue.UPDATED_NEW
        // };

        // const responseToUpdate = await getDocumentClient().send(new UpdateCommand(updateParams));
        // if (responseToUpdate == null) {
        //     throw new Error("Error posting status");
        // }
        // console.log(responseToUpdate);
    }
}