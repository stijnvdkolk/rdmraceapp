export default class Invite{
    maxUses!: number;
    role!: "ADMIN" | "TEAM_MEMBER" | "SPONSOR" | "MARKETING";
    expiresAt!: Date | "" ;
}
export class InviteBuilder{
    maxUses!: number;
    role!: "ADMIN" | "TEAM_MEMBER" | "SPONSOR" | "MARKETING";
    expiresAt!: Date | "" ;
}