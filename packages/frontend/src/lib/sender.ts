import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

interface EmailParams {
    toEmail: string;
    noteId: string;
    noteTitle: string;
    action: "updated" | "deleted";
}

export async function sendNoteNotificationEmail({
    toEmail,
    noteId,
    noteTitle,
    action,
}: EmailParams): Promise<void> {
    const subject = `Note ${action}: ${noteTitle}`;
    const message =
        action === "deleted"
            ? `Your note "${noteTitle}" has been deleted.`
            : `Your note "${noteTitle}" has been updated.`;

    const params = {
        Source: process.env.SES_EMAIL_SOURCE || "noreply@example.com",
        Destination: {
            ToAddresses: [toEmail],
        },
        Message: {
            Subject: { Data: subject },
            Body: {
                Html: {
                    Data: `
                        <h2>${subject}</h2>
                        <p>${message}</p>
                        <p>Note ID: ${noteId}</p>
                    `,
                },
            },
        },
    };

    try {
        await sesClient.send(new SendEmailCommand(params));
    } catch (error) {
        console.error(`Failed to send email for note ${noteId}:`, error);
        throw error;
    }
}