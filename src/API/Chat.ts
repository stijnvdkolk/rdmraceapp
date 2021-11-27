import { get } from "./ApiCalls";

export async function getPerson(channelID: string): Promise<{
    id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
}>
{
    const path = `/getPeople/Person/${channelID}`;
    console.log(path);
    return get(path);
}