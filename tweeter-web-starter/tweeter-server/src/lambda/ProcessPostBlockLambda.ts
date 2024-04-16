import { PostBlockRequest } from "tweeter-shared/dist/model/net/Request";
import { StatusService } from "../model/service/StatusService";
import { performErrorReportingOperation } from "./IntegrationResponseCommon";

// ProcessPostBlockLambda will take a post block and process it and add a status to
// All 25 people in the block. It will call the service to call A DAO to add each status based upon the user to post to
export let handler = async (SQS_PostBlock_Object: any): Promise<void> => {
    // console.log("PostChopperLambda: handler: full event: " + JSON.stringify(SQS_PostBlock_Object));
    const bodyString = SQS_PostBlock_Object.Records[0].body;
    console.log("PostChopperLambda: handler: bodyString: " + bodyString);
    const event = PostBlockRequest.fromJsonString(bodyString); // From JSON string because it's coming from SQS which must be stringified
    console.log("PostChopperLambda: handler: event processed: " + JSON.stringify(event));

    if (event.status == null) {
        throw new Error("Status is undefined");
    }
    if (event.followers == null) {
        throw new Error("Followers is undefined");
    }
    if (event.followers.length == 0) {
        throw new Error("Followers is empty");
    }

    return await performErrorReportingOperation(async () => {
        await new StatusService().processStatuses(event.status, event.followers);
    });
}


