"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedTableDAO = void 0;
//Feed table will have the key alias, and associate those with status of their friends sorted by timestamp (post, user, timestamp, segment)
class FeedTableDAO {
    constructor() {
        this.feedTableName = "feeds";
    }
    loadMoreFeedItems(user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    postStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
            //Call the Posts Queue now?
        });
    }
}
exports.FeedTableDAO = FeedTableDAO;
