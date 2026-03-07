import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function updateAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@webdesino.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'WEBDESINO@2026';
    
    console.log(`Updating admin credentials for: ${adminEmail}`);
    
    const hashedPassword = await hash(adminPassword, 12);
    
    const admin = await prisma.admin.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
      },
      create: {
        email: adminEmail,
        name: 'Admin',
        password: hashedPassword,
      },
    });
    
    console.log('✅ Admin credentials updated successfully!');
    console.log(`Email: ${admin.email}`);
    console.log('Password: (hashed and stored securely)');
  } catch (error) {
    console.error('❌ Error updating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdmin();
