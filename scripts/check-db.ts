
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const locations = await prisma.locationPage.count();
  const services = await prisma.serviceCategory.count();
  const projects = await prisma.project.count();
  const media = await prisma.media.count();
  const blogs = await prisma.blogPost.count();
  const clients = await prisma.client.count();
  const faqs = await prisma.faq.count();
  const testimonials = await prisma.testimonial.count();
  const teamMembers = await prisma.teamMember.count();
  const pages = await prisma.page.count();

  console.log({ locations, services, projects, media, blogs, clients, faqs, testimonials, teamMembers, pages });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
