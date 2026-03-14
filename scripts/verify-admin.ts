import { PrismaClient } from '../lib/generated/prisma';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function verifyAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@webdesino.com';
    
    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail },
      select: {
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    
    if (admin) {
      console.log('✅ Admin account found in database:');
      console.log(`   Email: ${admin.email}`);
      console.log(`   Name: ${admin.name}`);
      console.log(`   Last Updated: ${admin.updatedAt}`);
      console.log('\n✅ You can now login with:');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
    } else {
      console.log('❌ Admin account not found');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAdmin();
