import { PrismaClient } from '../lib/generated/prisma';
import { compare } from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Add any passwords you want to test here
const PASSWORDS_TO_TEST = [
  process.env.ADMIN_PASSWORD,
  'WEBDESINO@2026',
  'admin123',
  'webdesino123',
].filter(Boolean) as string[];

async function checkAdminPassword() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@webdesino.com';

    const admin = await prisma.admin.findFirst({
      where: { email: adminEmail },
      select: { email: true, password: true, updatedAt: true },
    });

    if (!admin) {
      console.log('❌ No admin record found in Prisma DB for:', adminEmail);
      console.log('   (Note: Admin login uses Supabase Auth, not this table)');
      return;
    }

    console.log('\n📋 Admin record found in Prisma DB:');
    console.log('   Email      :', admin.email);
    console.log('   Hash (DB)  :', admin.password);
    console.log('   Last update:', admin.updatedAt);
    console.log('\n🔍 Testing passwords against stored hash...\n');

    let matchFound = false;
    for (const pwd of PASSWORDS_TO_TEST) {
      const isMatch = await compare(pwd, admin.password);
      const mark = isMatch ? '✅ MATCH' : '❌ no match';
      console.log(`   ${mark}  →  "${pwd}"`);
      if (isMatch) matchFound = true;
    }

    if (!matchFound) {
      console.log('\n⚠️  None of the tested passwords matched.');
      console.log('   Add more candidates to PASSWORDS_TO_TEST array in this script.');
    }

    console.log('\n──────────────────────────────────────────');
    console.log('⚠️  NOTE: Current admin login (login page) uses SUPABASE AUTH,');
    console.log('   not this Prisma table. To check/update the Supabase password,');
    console.log('   use the "Forgot Password" flow or Supabase dashboard.');
    console.log('──────────────────────────────────────────\n');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminPassword();
