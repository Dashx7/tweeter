import { AuthenticateResponse, LoginRequest } from "./Request";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {

    private SERVER_URL = "TODO: Set this value.";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    //from Json doesn't exist?
    // async login(request: LoginRequest): Promise<AuthenticateResponse> {
    //     const endpoint = "/service/login";
    //     const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

    //     return AuthenticateResponse.fromJson(response);
    // }
}