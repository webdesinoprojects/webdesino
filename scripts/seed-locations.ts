import { PrismaClient } from '../lib/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// The 5 main services with their slug patterns
const MAIN_SERVICES = [
  { 
    slug: 'website-solutions', 
    title: 'Web Development',
    slugPattern: 'best-web-development-company-in'
  },
  { 
    slug: 'seo-services', 
    title: 'SEO Services',
    slugPattern: 'best-seo-services-in'
  },
  { 
    slug: 'digital-marketing', 
    title: 'Digital Marketing',
    slugPattern: 'best-digital-marketing-agency-in'
  },
  { 
    slug: 'content-writing', 
    title: 'Content Writing',
    slugPattern: 'best-content-writing-services-in'
  },
  { 
    slug: 'graphic-designing', 
    title: 'Graphic Designing',
    slugPattern: 'best-graphic-design-services-in'
  },
]

// Function to generate slug from location name following codebase convention
function generateLocationSlug(locationName: string, slugPattern: string): string {
  // Convert to lowercase and replace spaces with hyphens
  let slug = locationName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '') // Remove special characters except hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

  // Return slug with the service-specific pattern
  return `${slugPattern}-${slug}`
}

// Function to generate title for the service location page
function generateTitle(locationName: string, service: string): string {
  return `Best ${service} in ${locationName} | WebDesino`
}

// Function to generate description
function generateDescription(locationName: string, state: string, service: string): string {
  return `Get professional ${service.toLowerCase()} services in ${locationName}, ${state}. WebDesino offers expert solutions for your business growth.`
}

async function seedLocations() {
  try {
    console.log('🚀 Starting locations seed for all services...')

    // Read the JSON file
    const jsonPath = path.join(__dirname, '../data/all_locations_data.json')
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

    let totalLocations = 0
    let skippedLocations = 0
    let createdLocations = 0
    let startProcessing = false

    // Iterate through each state
    for (const [stateName, stateData] of Object.entries(jsonData)) {
      const state = stateData as any
      const locations = state.locations || []

      // Skip all states until we pass Bihar
      if (state.state.toLowerCase() === 'bihar') {
        console.log(`\n⏭️  Skipping ${stateName} (already completed)`)
        startProcessing = true
        continue
      }

      // Skip states before Bihar
      if (!startProcessing) {
        console.log(`\n⏭️  Skipping ${stateName} (already completed)`)
        continue
      }

      console.log(`\n📍 Processing ${stateName} (${locations.length} locations)`)

      for (const location of locations) {
        // For each location, create 5 pages - one for each service
        for (const service of MAIN_SERVICES) {
          totalLocations++

          try {
            // Generate slug with the service-specific pattern
            const slug = generateLocationSlug(location.name, service.slugPattern)
            const title = generateTitle(location.name, service.title)
            const description = generateDescription(location.name, state.state, service.title)
            
            // Create or update location page for this service
            const result = await prisma.locationPage.upsert({
              where: { slug },
              update: {
                location: location.name,
                state: state.state,
                title,
                description,
                serviceFocus: service.slug,
                content: {
                  service: service.slug,
                  serviceTitle: service.title,
                  createdAt: new Date().toISOString()
                }
              },
              create: {
                slug,
                location: location.name,
                state: state.state,
                title,
                description,
                serviceFocus: service.slug,
                content: {
                  service: service.slug,
                  serviceTitle: service.title,
                  createdAt: new Date().toISOString()
                }
              }
            })

            createdLocations++
          } catch (error: any) {
            skippedLocations++
            if (error.code === 'P2002') {
              // Unique constraint violation - location already exists
              // Silent skip for existing entries
            } else {
              console.error(`  ❌ ${location.name} (${service.title}) - Error: ${error.message}`)
            }
          }
        }

        // Print progress after all 5 services for this location
        console.log(`  ✅ ${location.name} (5 pages created for all services)`)
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 SEED SUMMARY')
    console.log('='.repeat(60))
    console.log(`Total Service Pages Processed: ${totalLocations}`)
    console.log(`Successfully Created: ${createdLocations}`)
    console.log(`Skipped/Updated: ${skippedLocations}`)
    console.log('='.repeat(60))
    console.log('✨ Location seeding completed successfully!')
    console.log('\n📌 Services with dedicated pages:')
    MAIN_SERVICES.forEach(s => console.log(`   • ${s.title} (${s.slugPattern}-{location})`))
    console.log('\n📌 States added (excluding Bihar): All Indian states from JSON')
  } catch (error) {
    console.error('💥 Error seeding locations:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed
seedLocations()
