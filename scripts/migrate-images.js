const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImages() {
  const publicDir = path.join(__dirname, '../public');
  
  if (!fs.existsSync(publicDir)) {
    console.error('Public directory not found');
    return;
  }

  const files = fs.readdirSync(publicDir);
  let uploadedCount = 0;

  //console.log(`Found ${files.length} files in public directory.`);

  for (const file of files) {
    if (['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'].includes(path.extname(file).toLowerCase())) {
      //console.log(`Uploading ${file}...`);
      const filePath = path.join(publicDir, file);
      const fileBuffer = fs.readFileSync(filePath);

      const { data, error } = await supabase.storage
        .from('images')
        .upload(file, fileBuffer, {
          contentType: getContentType(file),
          upsert: true
        });

      if (error) {
        console.error(`Error uploading ${file}:`, error.message);
      } else {
        //console.log(`Uploaded ${file}`);
        uploadedCount++;
      }
    }
  }
  //console.log(`Migration complete. Uploaded ${uploadedCount} images.`);
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.gif': return 'image/gif';
    case '.webp': return 'image/webp';
    default: return 'application/octet-stream';
  }
}

uploadImages();
