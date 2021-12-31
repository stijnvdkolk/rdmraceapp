import Channel from "../classes/Channel";
import Message from "../classes/Message";
import Person from "../classes/Person";
import { get, getJWT, postJson, postTokenJson } from "./ApiCalls";

export async function getPerson(channelID: string): Promise<{person : Person}>
{
    const path = `getPeople/Person/${channelID}`;
    return get(path);
}
export async function getPeople(amount: number): Promise<{person: Person[]}>
{
    const path = `getPeople/${amount}`;
    return get(path);
}
export async function getSelf(): Promise<{person : Person}>
{
    const path = "/auth/@me";
    return getJWT(path);
}
export async function getChannels(): Promise<{channel : Channel}[]>
{
    const path = `/channels/`;
    return getJWT(path);
}
export async function getChannel(id : string): Promise<{channel : Channel}>
{
    const path = `/channels/${id}`;
    return getJWT(path);
}
export async function getMessage(ChannelId: string, MessageId: string): Promise<{message : Message}>
{
    const path = `/channels/${ChannelId}/messages/${MessageId}`;
    return get(path);
}
export async function getMessages(ChannelId: string): Promise<{ message : Message}[]>
{
    const path = `/channels/${ChannelId}/messages/`;
    return get(path);
}
export async function getToken(email: string, password: string)
{
    const path = "/auth/token";
    return await postTokenJson(path, {email, password});
}