export default class Invite {
  id!: string;
  code!: string;
  maxUses!: number;
  createdAt!: Date;
  updatedAt!: Date;
  amountUsed!: number;
  expireAt!: string;
  role!: "ADMIN" | "TEAM_MEMBER" | "SPONSOR" | "MARKETING";
}
export class InviteBuilder {
  maxUses!: number;
  role!: "ADMIN" | "TEAM_MEMBER" | "SPONSOR" | "MARKETING" | string;
  expiresAt!: Date | "";
  constructor(maxUses: number, role: "ADMIN" | "TEAM_MEMBER" | "SPONSOR" | "MARKETING" | string, expiresAt: Date | "") {
    this.maxUses = maxUses;
    this.role = role;
    this.expiresAt = expiresAt;
  }  
}
