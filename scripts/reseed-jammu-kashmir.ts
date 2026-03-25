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
  let slug = locationName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

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

async function reseedJK() {
  try {
    console.log('🚀 Re-seeding Jammu & Kashmir locations...')

    // Read the JSON file
    const jsonPath = path.join(__dirname, '../data/all_locations_data.json')
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

    // Get only Jammu & Kashmir data
    const jkData = jsonData['Jammu & Kashmir']
    if (!jkData) {
      console.error('❌ Jammu & Kashmir not found in JSON')
      process.exit(1)
    }

    const locations = jkData.locations || []
    console.log(`\n📍 Processing Jammu & Kashmir (${locations.length} locations)`)

    let totalCreated = 0
    let totalSkipped = 0

    for (const location of locations) {
      // For each location, create 5 pages - one for each service
      for (const service of MAIN_SERVICES) {
        try {
          const slug = generateLocationSlug(location.name, service.slugPattern)
          const title = generateTitle(location.name, service.title)
          const description = generateDescription(location.name, 'Jammu & Kashmir', service.title)
          
          const result = await prisma.locationPage.upsert({
            where: { slug },
            update: {
              location: location.name,
              state: 'Jammu & Kashmir',
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
              state: 'Jammu & Kashmir',
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

          totalCreated++
        } catch (error: any) {
          totalSkipped++
          if (error.code !== 'P2002') {
            console.error(`  ❌ ${location.name} (${service.title}) - Error: ${error.message}`)
          }
        }
      }

      console.log(`  ✅ ${location.name} (5 pages created for all services)`)
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 RE-SEED SUMMARY')
    console.log('='.repeat(60))
    console.log(`Total Service Pages Created: ${totalCreated}`)
    console.log(`Errors/Skipped: ${totalSkipped}`)
    console.log('='.repeat(60))
    console.log('✨ Jammu & Kashmir re-seeding completed successfully!')

  } catch (error) {
    console.error('💥 Error re-seeding Jammu & Kashmir:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

reseedJK()
