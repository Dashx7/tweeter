import { StatusService } from "../model/service/StatusService";
import { performErrorReportingOperation } from "./IntegrationResponseCommon";
import { Status } from "tweeter-shared";

// This will pull a Post from the OriginlPost Queue and Chop the post into PostBlocks
// Of 25 (arbitrary) People to post to each, then send the PostBlock to the PostBlock Queue
export let handler = async (SQS_Status_Object: any): Promise<void> => {
    console.log("PostChopperLambda: handler: full event: ", JSON.stringify(SQS_Status_Object));
    const bodyString = SQS_Status_Object.Records[0].body;
    console.log("PostChopperLambda: handler: bodyString: ", bodyString);
    // const status = JSON.parse(bodyString) as Status; // From JSON string because it's coming from SQS which must be stringified
    // console.log("PostChopperLambda: handler: event processed: ", status);
    const betterStatus = Status.fromJson(bodyString);
    console.log("PostChopperLambda: handler: event processed: ", betterStatus);

    // if (status == null) {
    //     throw new Error("Status is undefined");
    // }
    if (betterStatus == null) {
        throw new Error("Status is undefined");
    }
    return await performErrorReportingOperation(async () => {
        // await new StatusService().originalPostChopper(status);
        await new StatusService().originalPostChopper(betterStatus);
    });
}

