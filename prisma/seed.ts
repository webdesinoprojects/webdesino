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

    // Heuristic to determine if the name is a full title or just a location
    let title = `Best Web Development Company in ${loc.name}`;
    let locationName = loc.name;

    const keywords = ["Agency", "Services", "Company", "Developer", "Consultant", "Management", "Designer", "Campaign"];
    if (keywords.some(k => loc.name.includes(k))) {
        title = loc.name;
        // Try to extract location
        if (loc.name.includes(" in ")) {
            locationName = loc.name.split(" in ").pop()!;
        } else if (loc.name.includes(" near ")) {
            locationName = loc.name.split(" near ").pop()!;
        } else if (loc.name.includes(" For ")) {
             locationName = loc.name.split(" For ")[0].split(" in ").pop() || "Delhi";
        } else {
             if (loc.name.includes("Delhi")) locationName = "Delhi";
             else if (loc.name.includes("Noida")) locationName = "Noida";
             else if (loc.name.includes("Gurgaon")) locationName = "Gurgaon";
        }
    }

    await prisma.locationPage.upsert({
      where: { slug },
      update: {
        location: locationName,
        title: title,
      },
      create: {
        slug,
        location: locationName,
        title: title,
        description: `Looking for ${title}? We provide top-notch web design and development services in ${locationName}. Contact us today!`,
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
