import { Resource } from "sst";
import { Util } from "@luca-sst/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";


const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const params = {
        TableName: Resource.Notes.name,
        Key: {
            userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
            noteId: event?.pathParameters?.id, // The id of the note from the path
        },
    };

    await dynamoDb.send(new DeleteCommand(params));

    const sesClient = new SESv2Client();
    await sesClient.send(
        new SendEmailCommand({
            FromEmailAddress: Resource.MyEmail.sender,
            Destination: {
                ToAddresses: [Resource.MyEmail.sender],
            },
            Content: {
                Simple: {
                    Subject: { Data: "Ticket Deleted" },
                    Body: {
                        Text: { Data: `Ticket ${event?.pathParameters?.id} has been deleted.` },
                    },
                },
            },
        })
    );

    return JSON.stringify({ status: true });
});