import Person from "./Person";

export default class Message {
    id: string | undefined;
    content: string | undefined;
    channelId: string | undefined;
    author: Person | undefined;
    authorId: string | undefined;
    createdAt: Date |  undefined;
    updatedAt: Date | undefined;
    attachments: string[] | undefined;
}
export class Messages{
    messages: Message[] | undefined;
}