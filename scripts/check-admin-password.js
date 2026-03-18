require('dotenv').config();
const { PrismaClient } = require('../lib/generated/prisma');
const { compare } = require('bcryptjs');

const prisma = new PrismaClient();

const PASSWORDS_TO_TEST = [
  'WEBDESINO@2026',
  'admin123',
  'webdesino123',
  process.env.ADMIN_PASSWORD,
].filter(Boolean);

async function run() {
  const email = process.env.ADMIN_EMAIL || 'admin@webdesino.com';

  const admin = await prisma.admin.findFirst({
    where: { email },
    select: { email: true, password: true, updatedAt: true },
  });

  if (!admin) {
    console.log('No admin record found in Prisma DB for:', email);
    console.log('(Admin login uses Supabase Auth — Prisma DB table may be unused)');
    await prisma.$disconnect();
    return;
  }

  console.log('\n--- Prisma DB Admin Record ---');
  console.log('Email  :', admin.email);
  console.log('Hash   :', admin.password);
  console.log('Updated:', admin.updatedAt);

  console.log('\n--- Password Match Results ---');
  for (const pwd of PASSWORDS_TO_TEST) {
    const ok = await compare(pwd, admin.password);
    console.log(ok ? 'MATCH   ->' : 'no match->', `"${pwd}"`);
  }

  console.log('\nNOTE: Admin login page uses Supabase Auth, NOT this Prisma table.');
  await prisma.$disconnect();
}

run().catch(console.error);
