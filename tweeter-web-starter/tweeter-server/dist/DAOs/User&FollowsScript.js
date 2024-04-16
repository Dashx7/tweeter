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
const tweeter_shared_1 = require("tweeter-shared");
const AuthTokenTableDAO_1 = require("./AuthTokenTableDAO");
// import { UserTableDAO } from './UserTableDAO';
const FollowTableDAO_1 = require("./FollowTableDAO");
function createUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const authTokenTableDAO = new AuthTokenTableDAO_1.AuthTokenTableDAO();
        // const userTableDAO = new UserTableDAO();
        const followTableDAO = new FollowTableDAO_1.FollowTableDAO();
        const user1 = new tweeter_shared_1.User('1', '1', '@1', "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg");
        for (let i = 5820; i < 10000; i++) {
            const firstName = `firstName${i}`;
            const lastName = `lastName${i}`;
            const alias = `@zgen${i}`;
            const password = '1'; // replace with a secure, hashed password
            const userImageBytes = new Uint8Array(); // Just the fake image
            try {
                yield authTokenTableDAO.register(firstName, lastName, alias, password, userImageBytes);
                console.log(`User ${i} registered`);
                const user = new tweeter_shared_1.User(firstName, lastName, alias, "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg");
                // await userTableDAO.follow(user, '@1');
                yield followTableDAO.follow(user, user1);
                // console.log(`User ${i} followed @1`);
            }
            catch (error) {
                console.error(`Error registering user ${i}:`, error);
            }
        }
    });
}
createUsers();
