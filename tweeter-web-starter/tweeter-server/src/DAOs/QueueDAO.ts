import { SQS } from 'aws-sdk';
import { Status } from 'tweeter-shared';
import { PostBlockRequest } from 'tweeter-shared/dist/model/net/Request';

export class QueueDAO {
    private sqs: SQS = new SQS();
    private OriginalPostQueue: string = "https://sqs.us-east-1.amazonaws.com/532311244571/OriginalPostsQueue";
    private PostBlockQueue: string = "https://sqs.us-east-1.amazonaws.com/532311244571/PostBlockQueue";


    private async sendToQueue(queueUrl: string, message: object): Promise<void> {
        const messageBody = JSON.stringify(message);
        console.log(`Sending message to queue: ${messageBody}`);
        const params = {
            MessageBody: messageBody,
            QueueUrl: queueUrl
        };

        try {
            const data = await this.sqs.sendMessage(params).promise();
            console.log(`Message sent successfully, message ID: ${data.MessageId}`);
        } catch (error) {
            console.log(`Error sending message: ${error}`);
        }
    }

    // Probably should make these function implementations of an abstract sentToQueue
    public async sendToOriginalPostQ(status: Status): Promise<void> {
        await this.sendToQueue(this.OriginalPostQueue, status);
    }

    public async sendToPostBlockQ(postBlock: PostBlockRequest): Promise<void> {
        await this.sendToQueue(this.PostBlockQueue, postBlock);
    }
}