import {TweeterRequest, TweeterResponse} from "tweeter-shared";

export class ClientCommunicator {
    private readonly SERVER_URL: string;

    constructor(SERVER_URL: string) {
        this.SERVER_URL = SERVER_URL;
    }

    async doPost<T extends TweeterRequest>(req: T, endpoint: string): Promise<JSON> {
        const url = this.SERVER_URL + endpoint;
        const request = {
            method: "post",
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            }),
            body: JSON.stringify(req),
        };

        try {
            const resp: Response = await fetch(url, request);
            let obj = await resp.json();
            //console.log(`${endpoint} :`, obj);
            if (resp.ok) {
                return obj;
            } else {
                const error = await resp.json();
                throw new Error(error.errorMessage);
            }

        } catch (err) {
            throw new Error(
                "Client communicator doPost failed:\n" + (err as Error).message
            );
        }
    }
}