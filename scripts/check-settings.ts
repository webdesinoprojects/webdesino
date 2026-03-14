
import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function checkSettings() {
  const settings = await prisma.companySettings.findMany();
  //console.log('Current Settings:', settings);
}

checkSettings()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
