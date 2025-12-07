import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { footerLocations } from '../lib/locations-data'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('admin123', 12)
  const admin = await prisma.admin.upsert({
    where: { email: 'webdesino.com@gmail.com' },
    update: {
      password: password, // Force update password to ensure it's hashed correctly
    },
    create: {
      email: 'webdesino.com@gmail.com',
      name: 'Admin',
      password,
    },
  })
  console.log({ admin })

  console.log('Seeding locations...')
  for (const loc of footerLocations) {
    // Extract slug from href
    // href format: "https://webdesino.com/slug/" or "/slug/"
    // Remove trailing slash if present
    const cleanHref = loc.href.endsWith('/') ? loc.href.slice(0, -1) : loc.href
    const urlParts = cleanHref.split('/')
    const slug = urlParts[urlParts.length - 1]

    if (!slug) {
        console.warn(`Skipping invalid href: ${loc.href}`)
        continue
    }

    // Default title logic based on the user's pattern
    // Most are "Best Web Development Company in [Location]"
    // But some have specific titles in the href or name.
    // For now, we'll use a generic title if we can't derive it better, 
    // but the user's data has "name" which is the location name.
    // We can construct a default title.
    
    const title = `Best Web Development Company in ${loc.name}`

    await prisma.locationPage.upsert({
      where: { slug },
      update: {
        location: loc.name,
        // Only update title if it doesn't exist? No, let's update it to ensure consistency.
        // But maybe we want to preserve manual edits? 
        // For now, let's update it.
        title: title,
      },
      create: {
        slug,
        location: loc.name,
        title: title,
        description: `Looking for the ${title}? We provide top-notch web design and development services in ${loc.name}. Contact us today!`,
      },
    })
  }
  console.log('Locations seeded.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
