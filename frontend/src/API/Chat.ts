import Channel from "../classes/Channel";
import Dms, { DmChannel } from "../classes/Dms";
import Message, { Messages } from "../classes/Message";
import Person from "../classes/Person";
import Token from "../classes/Token";
import { Delete, get, getfromURL, getJWT, postJson, postTokenJson, sendData } from "./ApiCalls";

export async function getPerson(personId: string): Promise<{person : Person}>
{
    const path = `users/${personId}`;
    return get(path);
}
export async function getPeople(page: number): Promise<{person: Person[]}>
{
    const path = `/users?page=${page}`;
    return getfromURL(path);
}
export async function getSelf(): Promise<{person : Person}>
{
    const path = "/users/@me";
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
    return getJWT(path);
}
export function getMessages(ChannelId: string): Promise<{message : Message}[]>
{
    const path = `/channels/${ChannelId}/messages?limit=20&sortBy=createdAt&sortDirection=desc`;
    return getJWT(path).then((response) => {
        return response.reverse();

    });  
}
export async function getToken(email: string, password: string) : Promise <{token : Token}>
{
    const path = "/auth/token";
    return postJson(path, {email, password});
}
export async function SendMessage(channelID : string ,data: any) : Promise<{message : Message}>
{
    const path = `/channels/${channelID}/messages/`;
    return await sendData(path, data);
}
export async function GetDMs() : Promise<{DmChannel : DmChannel}[]>
{
    const path = `/users/@me/channels`;
    return getJWT(path);
}
export async function MakeDM(personId : string)
{
    const path = `/users/@me/channels`;
    return postTokenJson(path, {"userId" : personId});
}
export async function deleteMessage(channelId : string, messageid : string){
    const path = `/channels/${channelId}/messages/${messageid}`;
    return Delete(path);
}
