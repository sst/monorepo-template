import { Resource } from "sst";
import { Util } from "@luca-sst/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const sesClient = new SESv2Client();

export const main = Util.handler(async (event) => {
    const data = JSON.parse(event.body || "{}");

    const params = {
        TableName: Resource.Notes.name,
        Key: {
            userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
            noteId: event?.pathParameters?.id,
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },
    };

    await dynamoDb.send(new UpdateCommand(params));

    await sesClient.send(
        new SendEmailCommand({
            FromEmailAddress: Resource.MyEmail.sender,
            Destination: {
                ToAddresses: [Resource.MyEmail.sender],
            },
            Content: {
                Simple: {
                    Subject: { Data: "Ticket Updated" },
                    Body: {
                        Text: { Data: `Ticket ${event?.pathParameters?.id} has been updated.` },
                    },
                },
            },
        })
    );

    return JSON.stringify({ status: true });
});