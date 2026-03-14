import { PrismaClient } from '../lib/generated/prisma';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const testimonialData = {
  name: 'Team Gravolite',
  company: 'Gravolite',
  location: 'UAE',
  text:
    'Before WebDesino worked on our website, it was taking nearly 20 seconds to open and that was creating a terrible first impression for our customers. People were dropping off before pages could fully load, the mobile experience felt heavy, and the site overall did not reflect the quality of our brand. Their team identified the performance bottlenecks properly, optimized the website from end to end, and now it loads in less than a second. The difference has been huge. The site feels smoother, more stable, and much more professional, and our customers can actually browse without frustration now.',
};

async function addGravoliteTestimonial() {
  try {
    const existing = await prisma.testimonial.findFirst({
      where: {
        company: testimonialData.company,
        name: testimonialData.name,
      },
    });

    if (existing) {
      const updated = await prisma.testimonial.update({
        where: { id: existing.id },
        data: testimonialData,
      });

      console.log('Updated existing Gravolite testimonial.');
      console.log(`ID: ${updated.id}`);
      return;
    }

    const created = await prisma.testimonial.create({
      data: testimonialData,
    });

    console.log('Created Gravolite testimonial successfully.');
    console.log(`ID: ${created.id}`);
  } catch (error) {
    console.error('Failed to add Gravolite testimonial:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void addGravoliteTestimonial();