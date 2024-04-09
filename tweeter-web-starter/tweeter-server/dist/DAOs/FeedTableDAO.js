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
const AuthTokenTableDAO_1 = require("./AuthTokenTableDAO");
//Feed table will have the key alias, and associate those with status of their friends sorted by timestamp (post, user, timestamp, segment)
class FeedTableDAO {
    constructor() {
        this.feedTableName = "feeds";
    }
    loadMoreFeedItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // Replace with actual implementation
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            return [[], false];
        });
    }
    postStatus(authToken, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // Replace with actual implementation
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            return;
            // First query request of all followers of alias
            // For each follower Put request their alias and then the status
            // Use your Authtoken's alias to put a new story onto the list sorted by its timestamp
            // const getParams = {
            //     TableName: this.authTokenTableName,
            //     Key: {
            //         token: authToken.token
            //     }
            // };
            // const responseToGet = await this.client.send(new GetCommand(getParams));
            // if (responseToGet.Item == null) {
            //     throw new Error("Invalid token");
            // }
            // console.log(responseToGet.Item);
            // if (!responseToGet.Item.alias) {
            //     throw new Error(`Token ${authToken.token} is missing alias field`);
            // }
        });
    }
}
exports.FeedTableDAO = FeedTableDAO;
