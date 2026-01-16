import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'everywherehv@gmail.com' },
    update: {},
    create: {
      email: 'everywherehv@gmail.com',
      name: 'HV',
      googleId: 'google_everywherehv_123456789',
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@mentorgain.com' },
    update: {},
    create: {
      email: 'user@mentorgain.com',
      name: 'Test User',
      googleId: 'google_user_987654321',
      role: 'USER',
    },
  });

  console.log({ admin, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });