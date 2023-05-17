import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
const bcrypt = require('bcryptjs');

// import { links } from '../data/links';

const prisma = new PrismaClient();

const password = 'admin11'
async function main() {
  await prisma.user.create({
    data: {
      email: 'admin2@gmail.com',
      // hashedPassword:'$2y$10$eQBxSXXJwnDMubWxwHk.Tex9kJIcGA8GsT9mt.M/FzX5Yz9UHzkxq',
      // hashedPassword: '$2y$10$lulkhHqFqNxfAFU41sbKGuyAQFxHXqmvQxsivC5eNsOX2zWQTuECe',
      hashedPassword: bcrypt.hashSync(password,10),
      
      roles:'Admin'
    },
  });

//   await prisma.link.createMany({
//     data: links,
//   });
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })