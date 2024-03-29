import { ChannelType, PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('!!! WARNING: This will delete all data in the database !!!');

  await prisma.attachment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.user.deleteMany();
  await prisma.invite.deleteMany();

  console.log('Seeding...');

  //// USER SEED
  // Admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@rdmraceapp.nl',
      password:
        '$argon2i$v=19$m=4096,t=6,p=1$YNmOHY4jm4mM9uFSx4B5sw$8xKLH11tfCcogZjqTOBWwrWxfaBqlgzvB3pcbTyJ6h8', // admin
      username: 'Admin',
      aboutMe: 'I am an admin on this platform!',
      role: UserRole.ADMIN,
    },
  });

  //// CHANNEL SEED
  // General channel
  const generalChannel = await prisma.channel.create({
    data: {
      name: 'General',
      type: ChannelType.PUBLIC_CHANNEL,
    },
  });

  // News channel
  const newsChannel = await prisma.channel.create({
    data: {
      name: 'News',
      description: 'This is the news channel',
      type: ChannelType.NEWS_CHANNEL,
    },
  });

  // Marketing channel
  const marketingChannel = await prisma.channel.create({
    data: {
      name: 'Marketing',
      description: 'This is the marketing channel',
      type: ChannelType.PRIVATE_CHANNEL,
      rolesAccess: [UserRole.MARKETING, UserRole.ADMIN],
    },
  });

  // Team channel
  const teamChannel = await prisma.channel.create({
    data: {
      name: 'Team',
      description: 'This is the team channel',
      type: ChannelType.PRIVATE_CHANNEL,
      rolesAccess: [UserRole.TEAM_MEMBER, UserRole.MARKETING, UserRole.ADMIN],
    },
  });

  console.log({
    adminUser,
    generalChannel,
    newsChannel,
    marketingChannel,
    teamChannel,
  });
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
