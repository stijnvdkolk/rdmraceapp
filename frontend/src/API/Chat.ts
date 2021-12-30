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
    const path = `getPeople/Person/${channelID}`;
    return get(path);
}
export async function getPeople(amount: number): Promise<{
    id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
    role : string | undefined;
    status : string | undefined;
    aboutMe : string | undefined;
}[]>
{
    const path = `getPeople/${amount}`;
    return get(path);
}

export async function getSelf(): Promise<{
    id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
    role : string | undefined;
    status : string | undefined;
    aboutMe : string | undefined;
}>
{
    const path = "testing";
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
    const path = `getPeople/Channel/${channelID}`;
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
    const path = `messages/singleton`;
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
    const path = `messages/group/${num}`;
    return get(path);
}