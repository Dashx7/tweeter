import { AuthToken } from "../domain/AuthToken";

export class Response {

}

export class AuthenticationResponse {
    username: string;
    token: AuthToken;

    constructor(username: string, authToken: AuthToken) {
        this.username = username;
        this.token = authToken;
    }
}