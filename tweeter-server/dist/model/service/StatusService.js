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
const FakeData_1 = require("tweeter-shared/src/util/FakeData");
class StatusService {
    loadMoreFeedItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return FakeData_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
        });
    }
    loadMoreStoryItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return FakeData_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
        });
    }
    ;
    postStatus(authToken, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((f) => setTimeout(f, 2000));
        });
    }
}
exports.StatusService = StatusService;
