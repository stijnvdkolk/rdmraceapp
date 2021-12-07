import { get } from "./ApiCalls";

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