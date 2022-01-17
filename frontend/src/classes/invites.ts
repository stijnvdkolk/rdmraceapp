export default class Invite{
    id!: string;
    code!: string;
    maxUses!: number;
    createdAt!: Date;
    updatedAt!: Date;
    amountUsed!: number;
    expireAt!: Date;
    role!: "ADMIN" | "TEAM_MEMBER" | "SPONSOR" | "MARKETING";
}
export class InviteBuilder{
    maxUses!: number;
    role!: "ADMIN" | "TEAM_MEMBER" | "SPONSOR" | "MARKETING";
    expiresAt!: Date | "" ;
}