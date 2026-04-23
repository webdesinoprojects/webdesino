#!/usr/bin/env node

/**
 * Database Connection Test
 */

const { PrismaClient } = require('@prisma/client');

console.log('🔍 Testing database connection...\n');

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('⏳ Connecting to database...');
    
    // Set a timeout to avoid hanging indefinitely
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
    );
    
    const connection = Promise.race([
      prisma.$queryRaw`SELECT 1 as health_check`,
      timeout
    ]);
    
    await connection;
    console.log('✅ Database connection successful!\n');
    
    // Check for admin user
    const adminCount = await prisma.admin.count();
    console.log(`📊 Admin users in database: ${adminCount}\n`);
    
    if (adminCount > 0) {
      const admin = await prisma.admin.findFirst({
        select: {
          email: true,
          name: true,
          createdAt: true
        }
      });
      console.log('✅ Found admin:');
      console.log(`   Email: ${admin.email}`);
      console.log(`   Name: ${admin.name}`);
      console.log(`   Created: ${admin.createdAt}`);
    } else {
      console.log('ℹ️  No admin users found - you may need to create one');
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Check your DATABASE_URL in .env');
    console.log('   2. Ensure your Supabase database is accessible');
    console.log('   3. Check your internet connection');
    console.log('   4. Try running: npx prisma migrate dev');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

test();
