import Channel from "../classes/Channel";
import Message from "../classes/Message";
import Person from "../classes/Person";
import Token from "../classes/Token";
import { get, getfromURL, getJWT, postJson } from "./ApiCalls";

export async function getPerson(personId: string): Promise<{ person: Person }> {
  const path = `/users/${personId}`;
  return getfromURL(path);
}
export async function getPeople(page: number): Promise<{ person: Person[] }> {
  const path = `/users?page=${page}`;
  return getfromURL(path);
}
export async function getSelf(): Promise<{ person: Person }> {
  const path = "/users/@me";
  return getJWT(path);
}
export async function getChannels(): Promise<{ channel: Channel }[]> {
  const path = `/channels/`;
  return getJWT(path);
}
export async function getChannel(id: string): Promise<{ channel: Channel }> {
  const path = `/channels/${id}`;
  return getJWT(path);
}
export async function getMessage(
  ChannelId: string,
  MessageId: string
): Promise<{ message: Message }> {
  const path = `/channels/${ChannelId}/messages/${MessageId}`;
  return getJWT(path);
}
export async function getMessages(
  ChannelId: string
): Promise<{ message: Message }[]> {
  const path = `/channels/${ChannelId}/messages/`;
  return getJWT(path);
}
export async function getToken(
  email: string,
  password: string
): Promise<{ token: Token }> {
  const path = "/auth/token";
  return postJson(path, { email, password });
}
