/**
 * Test Script: Verify Location Content Generation
 * 
 * This script tests the location content generation without touching the database.
 * Use this to verify the output before running the bulk creation script.
 * 
 * Usage: ts-node --compiler-options {"module":"CommonJS"} scripts/test-location-generation.ts
 */

import { generateLocationContent, SERVICE_FOCUS_OPTIONS } from "../lib/location-templates";

// Test with a few sample locations
const TEST_LOCATIONS = ["Delhi", "Mumbai", "Bangalore"];
const TEST_SERVICES = SERVICE_FOCUS_OPTIONS.map(opt => opt.value);

console.log("=".repeat(60));
console.log("Location Content Generation Test");
console.log("=".repeat(60));
console.log();

for (const location of TEST_LOCATIONS) {
  console.log(`\n📍 Location: ${location}`);
  console.log("-".repeat(60));
  
  for (const service of TEST_SERVICES) {
    const content = generateLocationContent(location, service);
    
    console.log(`\n  Service: ${service}`);
    console.log(`  Slug: ${content.slug}`);
    console.log(`  Title: ${content.title}`);
    console.log(`  Description: ${content.description.substring(0, 100)}...`);
    console.log(`  Hero Subtitle: ${content.hero.subtitle.substring(0, 80)}...`);
  }
}

console.log("\n" + "=".repeat(60));
console.log("✅ Content generation test completed successfully!");
console.log("=".repeat(60));
