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
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const BaseService_1 = require("./BaseService");
const AuthTokenTableDAO_1 = require("../../DAOs/AuthTokenTableDAO");
class StatusService extends BaseService_1.BaseService {
    loadMoreFeedItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            return tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
        });
    }
    loadMoreStoryItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            console.log("Loading more story items");
            console.log("User: " + user.toJson());
            console.log("PageSize: " + pageSize);
            console.log("LastItem: " + lastItem);
            const response = yield this.getStoryDAO().loadMoreStoryItems(authToken, user, pageSize, lastItem);
            console.log("Got back response in status service :" + response.toString());
            return response;
        });
    }
    postStatus(authToken, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            yield this.getStoryDAO().postStatus(authToken, newStatus);
            // await this.feedService.postStatus(authToken, newStatus); // This will be changed in 4b
            return;
        });
    }
    ;
}
exports.StatusService = StatusService;
