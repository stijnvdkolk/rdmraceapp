import { get } from "./ApiCalls";

class person{
    id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
    role : string | undefined;
    status : string | undefined;
    aboutMe : string | undefined;
}

export async function getPerson(channelID: string): Promise<{
    id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
    role : string | undefined;
    status : string | undefined;
    aboutMe : string | undefined;
}>
{
    const path = `/getPeople/Person/${channelID}`;
    return get(path);
}

export async function getChannel(channelID: string): Promise<{
    id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
    role : string | undefined;
    status : string | undefined;
    aboutMe : string | undefined;
}>
{
    const path = `/getPeople/Channel/${channelID}`;
    return get(path);
}
export async function getMessage(): Promise<{
    id: string | undefined;
    content: string | undefined;
    channelId: string | undefined;
    author: person | undefined;
    authorId: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    attachments: string[] | undefined;
}>
{
    const path = `/messages/singleton`;
    console.log(get(path));
    return get(path);
}
export async function getMessages(num: number): Promise<{
    id: string | undefined;
    content: string | undefined;
    channelId: string | undefined;
    author: person | undefined;
    authorId: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    attachments: string[] | undefined;
}[]>
{
    const path = `/messages/group/${num}`;
    console.log(get(path));
    return get(path);
}