import { Invite } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { createdAt } from '.';

const dateNow = new Date();
export const expireAt = new Date(dateNow.getTime() + 1000 * 60 * 60 * 24 * 7);

export const usableInvite: Invite = {
  id: uuidv4(),
  amountUsed: 1,
  createdAt: createdAt,
  updatedAt: createdAt,
  code: 'MC43ODA',
  expireAt: expireAt,
  maxUses: 10,
  role: 'TEAM_MEMBER',
};

export const unusableInvite: Invite = {
  id: uuidv4(),
  amountUsed: 1,
  createdAt: createdAt,
  updatedAt: createdAt,
  code: 'MC43ODB',
  expireAt: expireAt,
  maxUses: 1,
  role: 'ADMIN',
};

export const expiredInvite: Invite = {
  id: uuidv4(),
  amountUsed: 3,
  createdAt: createdAt,
  updatedAt: createdAt,
  code: 'MC43ODC',
  expireAt: new Date('2020-01-01'),
  maxUses: 10,
  role: 'SPONSOR',
};

export const invites = [usableInvite, unusableInvite, expiredInvite];
