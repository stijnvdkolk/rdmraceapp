import { ChannelType, PrismaClient, UserRole } from '@prisma/client';
import readline from 'readline';
import colors from 'yoctocolors';

const prisma = new PrismaClient();

async function seed() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function question(question: string) {
    return new Promise<string>((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  console.log(
    colors.bold(
      colors.red('!!! WARNING: This will delete all data in the database !!!'),
    ),
  );

  const answer = await question(
    colors.bgRed(
      colors.white('Are you sure you want to delete all data? (y/n)'),
    ),
  );

  if (answer.toLowerCase() !== 'y') return;

  await prisma.user.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.message.deleteMany();

  console.log('Seeding...');

  //// USER SEED
  // Admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@rdmraceapp.nl',
      password: 'hash',
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
      rolesAccess: [UserRole.MARKETING],
    },
  });

  // Team channel
  const teamChannel = await prisma.channel.create({
    data: {
      name: 'Team',
      description: 'This is the team channel',
      type: ChannelType.PRIVATE_CHANNEL,
      rolesAccess: [UserRole.TEAM_MEMBER],
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
