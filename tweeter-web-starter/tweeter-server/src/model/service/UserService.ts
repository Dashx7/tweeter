import { AuthToken, FakeData, User } from "tweeter-shared";
import { BaseService } from "./BaseService";
import bcrpt from "bcryptjs";
import {
    S3Client,
    PutObjectCommand,
    ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export class UserService {
    private userDAO = new BaseService().getUserDAO();
    private authTokenDAO = new BaseService().getAuthTokenDAO();

    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        // TODO: Replace with the result of calling the server
        let user = FakeData.instance.firstUser;

        if (user === null) {
            throw new Error("Invalid alias or password");
        }

        return await this.authTokenDAO.login(alias, password);
    };



    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {

        return await this.authTokenDAO.register(firstName, lastName, alias, password, userImageBytes);
    };

    public async logout(authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {

        return await this.userDAO.getUser(alias);
    };
}