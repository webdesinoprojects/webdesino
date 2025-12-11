const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../locations_seed.json');
const tsPath = path.join(__dirname, '../lib/locations-data.ts');

const locations = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

// The original file exported `footerLocations`.
// We'll just overwrite the whole file.

const tsContent = `export const footerLocations = ${JSON.stringify(locations, null, 2)};`;

fs.writeFileSync(tsPath, tsContent);
//console.log('Updated lib/locations-data.ts');
