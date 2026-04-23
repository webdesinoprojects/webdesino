#!/usr/bin/env node

/**
 * Admin Credentials Check Script
 * Helps verify admin credentials and manage admin user account
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

async function checkAdminExists() {
  try {
    const admin = await prisma.admin.findFirst();
    
    if (!admin) {
      console.log('❌ No admin user found in database');
      return null;
    }
    
    console.log('\n✅ Admin user found:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Created: ${admin.createdAt}`);
    console.log(`   Updated: ${admin.updatedAt}`);
    
    return admin;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return null;
  }
}

async function resetAdminPassword() {
  try {
    const email = await question('\nEnter admin email: ');
    const newPassword = await question('Enter new password (min 8 characters): ');
    
    if (newPassword.length < 8) {
      console.log('❌ Password must be at least 8 characters');
      return;
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    const admin = await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    console.log('\n✅ Password updated successfully!');
    console.log(`   Admin Email: ${admin.email}`);
    console.log(`   Updated at: ${admin.updatedAt}`);
    
  } catch (error) {
    if (error.code === 'P2025') {
      console.log('❌ Admin user not found with that email');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

async function createAdminUser() {
  try {
    const email = await question('\nEnter admin email: ');
    const password = await question('Enter admin password (min 8 characters): ');
    const name = await question('Enter admin name: ');
    
    if (password.length < 8) {
      console.log('❌ Password must be at least 8 characters');
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });
    
    console.log('\n✅ Admin user created successfully!');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('❌ Email already exists');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

async function listAllAdmins() {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (admins.length === 0) {
      console.log('\n❌ No admin users found');
      return;
    }
    
    console.log(`\n✅ Found ${admins.length} admin user(s):\n`);
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. Email: ${admin.email}`);
      console.log(`   Name: ${admin.name}`);
      console.log(`   Created: ${admin.createdAt}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function showEnvFileInfo() {
  console.log('\n📋 Environment Variables (from .env or .env.local):');
  console.log('   ADMIN_EMAIL=your-email@example.com');
  console.log('   ADMIN_PASSWORD=your-password');
  console.log('\n💡 Tip: You can set these and run "npm run seed" to create/update admin');
}

async function showMenu() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║     Admin Credentials Check Tool       ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('\n1. Check current admin user');
  console.log('2. List all admins');
  console.log('3. Reset admin password');
  console.log('4. Create new admin user');
  console.log('5. Show environment variables info');
  console.log('6. Exit');
  
  const choice = await question('\nSelect option (1-6): ');
  return choice;
}

async function main() {
  try {
    let continueMenu = true;
    
    while (continueMenu) {
      const choice = await showMenu();
      
      switch (choice) {
        case '1':
          await checkAdminExists();
          break;
        case '2':
          await listAllAdmins();
          break;
        case '3':
          await resetAdminPassword();
          break;
        case '4':
          await createAdminUser();
          break;
        case '5':
          showEnvFileInfo();
          break;
        case '6':
          continueMenu = false;
          break;
        default:
          console.log('❌ Invalid option. Please select 1-6');
      }
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await prisma.$disconnect();
    rl.close();
    console.log('\n👋 Goodbye!');
    process.exit(0);
  }
}

main();
