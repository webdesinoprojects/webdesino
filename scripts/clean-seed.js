const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../locations_seed.json');
const rawData = fs.readFileSync(seedPath, 'utf8');
const locations = JSON.parse(rawData);

let fixedCount = 0;

const cleanedLocations = locations.map(loc => {
  let name = loc.name;
  let href = loc.href;
  let wasFixed = false;
  
  // Fix Name if it contains date or is weird
  if (name.match(/\d{2}\/\d{2}\/\d{4}/) || name.includes('\t')) {
    // Extract from slug
    // slug: "best-web-development-company-in-moti-nagar"
    // name: "Moti Nagar"
    const slugParts = loc.slug.replace('best-web-development-company-in-', '').split('-');
    name = slugParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    wasFixed = true;
  }

  // Fix href if it contains tab or extra text
  if (href.includes('\t') || !href.startsWith('http')) {
     // Extract url
     const match = href.match(/https?:\/\/[^\s]+/);
     if (match) {
       href = match[0];
       wasFixed = true;
     }
  }

  if (wasFixed) fixedCount++;

  return {
    ...loc,
    name,
    href
  };
});

fs.writeFileSync(seedPath, JSON.stringify(cleanedLocations, null, 2));
//console.log(`Cleaned locations_seed.json. Fixed ${fixedCount} entries.`);
