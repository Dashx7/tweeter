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
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const BaseService_1 = require("./BaseService");
const AuthTokenTableDAO_1 = require("../../DAOs/AuthTokenTableDAO");
class UserService extends BaseService_1.BaseService {
    login(alias, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            if (user === null) {
                throw new Error("Invalid alias or password");
            }
            return yield this.getAuthTokenDAO().login(alias, password);
        });
    }
    ;
    register(firstName, lastName, alias, password, userImageBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Registering user with image bytes: " + userImageBytes.byteLength + userImageBytes);
            const response = yield this.getAuthTokenDAO().register(firstName, lastName, alias, password, userImageBytes);
            console.log(response);
            return response;
        });
    }
    ;
    logout(authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAuthTokenDAO().logout(authToken);
        });
    }
    ;
    getUser(authToken, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            return yield this.getUserDAO().getUser(alias);
        });
    }
    ;
}
exports.UserService = UserService;
