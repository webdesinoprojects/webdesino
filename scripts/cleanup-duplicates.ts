import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function cleanupDuplicates() {
  try {
    console.log('🧹 Cleaning up duplicate Jammu & Kashmir entries...')

    // Find all Jammu & Kashmir locations
    const jkLocations = await prisma.locationPage.findMany({
      where: {
        state: 'Jammu & Kashmir'
      },
      select: {
        id: true,
        slug: true,
        location: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`\nFound ${jkLocations.length} entries for Jammu & Kashmir`)
    console.log('\nAnalyzing for duplicates...\n')

    // Group by location and service
    const locationMap = new Map<string, any[]>()
    
    jkLocations.forEach(entry => {
      const key = `${entry.location}`
      if (!locationMap.has(key)) {
        locationMap.set(key, [])
      }
      locationMap.get(key)!.push(entry)
    })

    // Find duplicates (same location, multiple entries)
    let duplicateCount = 0
    const idsToDelete: string[] = []

    locationMap.forEach((entries, location) => {
      // Group by service
      const serviceMap = new Map<string, any[]>()
      
      entries.forEach(entry => {
        // Extract service from slug
        let service = 'unknown'
        if (entry.slug.includes('web-development')) service = 'web-development'
        else if (entry.slug.includes('seo-services')) service = 'seo-services'
        else if (entry.slug.includes('digital-marketing')) service = 'digital-marketing'
        else if (entry.slug.includes('content-writing')) service = 'content-writing'
        else if (entry.slug.includes('graphic-design')) service = 'graphic-design'

        const key = service
        if (!serviceMap.has(key)) {
          serviceMap.set(key, [])
        }
        serviceMap.get(key)!.push(entry)
      })

      // If same service appears multiple times for same location, it's a duplicate
      serviceMap.forEach((serviceEntries, service) => {
        if (serviceEntries.length > 1) {
          console.log(`🔴 DUPLICATE: ${location} - ${service}`)
          console.log(`   Total entries: ${serviceEntries.length}`)
          
          // Keep the first (oldest) one, mark rest for deletion
          for (let i = 1; i < serviceEntries.length; i++) {
            console.log(`   ❌ Deleting: ${serviceEntries[i].slug} (created: ${serviceEntries[i].createdAt})`)
            idsToDelete.push(serviceEntries[i].id)
            duplicateCount++
          }
        }
      })
    })

    if (idsToDelete.length === 0) {
      console.log('✅ No duplicates found!')
      console.log('\nNote: If you want to completely re-seed Jammu & Kashmir, use the re-seed script.')
    } else {
      console.log(`\n\n📊 Summary:`)
      console.log(`Duplicate entries found: ${duplicateCount}`)
      console.log(`Entries to delete: ${idsToDelete.length}`)
      console.log('\nDeleting duplicates...')

      // Delete the duplicate entries
      const deleteResult = await prisma.locationPage.deleteMany({
        where: {
          id: {
            in: idsToDelete
          }
        }
      })

      console.log(`\n✅ Deleted ${deleteResult.count} duplicate entries`)
      console.log(`\n🎉 Cleanup complete!`)
    }

  } catch (error) {
    console.error('💥 Error during cleanup:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

cleanupDuplicates()
