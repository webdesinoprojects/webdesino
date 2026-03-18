require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const TARGET_EMAIL = process.env.ADMIN_EMAIL || 'admin@webdesino.com';
const NEW_PASSWORD = 'WEBDESINO@2026';

async function resetSupabaseAdminPassword() {
  console.log('Looking up Supabase user:', TARGET_EMAIL);

  const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) { console.error('Error listing users:', listErr.message); return; }

  const user = users.find(u => u.email === TARGET_EMAIL);
  if (!user) {
    console.log('No Supabase Auth user found for', TARGET_EMAIL);
    return;
  }

  console.log('Found user ID:', user.id);

  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    password: NEW_PASSWORD,
  });

  if (error) {
    console.error('Failed to update password:', error.message);
  } else {
    console.log('\n✅ Supabase Auth password reset to:', NEW_PASSWORD);
    console.log('   You can now login with:');
    console.log('   Email   :', TARGET_EMAIL);
    console.log('   Password:', NEW_PASSWORD);
  }
}

resetSupabaseAdminPassword().catch(console.error);
