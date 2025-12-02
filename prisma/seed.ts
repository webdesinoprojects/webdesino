import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

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
