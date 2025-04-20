import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // First create a dummy user
    const dummyUser = await prisma.user.create({
      data: {
        id: 'dummy-user-id',
        name: 'Dummy User',
        email: 'dummy@example.com',
        username: 'dummyuser',
      },
    });

    console.log('Dummy user created:', dummyUser);

    // Then create a profile for the user
    const dummyProfile = await prisma.profile.create({
      data: {
        id: 'dummy-profile-id',
        userId: dummyUser.id,
        amountProductsSold: 0,
      },
    });

    console.log('Dummy profile created:', dummyProfile);
  } catch (error) {
    console.error('Error creating dummy data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 