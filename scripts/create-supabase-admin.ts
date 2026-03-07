import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@webdesino.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'WEBDESINO@2026';

    console.log(`Creating/Updating Supabase admin user: ${adminEmail}`);

    // First, try to get existing user
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users.find(u => u.email === adminEmail);

    if (existingUser) {
      console.log('User already exists, updating password...');
      
      // Update existing user's password
      const { data, error } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { password: adminPassword }
      );

      if (error) {
        console.error('❌ Error updating user:', error.message);
        return;
      }

      console.log('✅ Admin password updated successfully!');
    } else {
      console.log('Creating new admin user...');
      
      // Create new user
      const { data, error } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });

      if (error) {
        console.error('❌ Error creating user:', error.message);
        return;
      }

      console.log('✅ Admin user created successfully!');
    }

    console.log('\n✅ You can now login at http://localhost:3000/admin with:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createAdmin();
