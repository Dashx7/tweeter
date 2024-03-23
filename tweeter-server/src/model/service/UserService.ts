import { User, AuthToken, FakeData } from "tweeter-shared";

export class UserService {

    public async login(alias: string, password: string): Promise<[User, AuthToken]> {
        let user = FakeData.instance.firstUser;

        if (user === null) {
            throw new Error("Invalid alias or password");
        }

        return [user, FakeData.instance.authToken];
    }
}