const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pages = [
  {
    slug: "about",
    title: "About Us",
    description: "Learn about Webdesino - A leading web development and digital marketing company in Delhi NCR.",
    content: {
      hero: {
        title: "About Webdesino",
        subtitle: "Building Your Online Presence. Find a team of Web Developers you can rely on. Every day, we build trust through communication, transparency, and results.",
        image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/rohittiwaribanner.png"
      },
      sections: [
        {
          title: "Our Mission",
          content: "To provide affordable and high-quality web development services to small businesses."
        }
      ]
    }
  },
  {
    slug: "contact",
    title: "Contact Us",
    description: "Get in touch with WebDesino for your web development needs.",
    content: {
      hero: {
        title: "Contact Us",
        subtitle: "We are here to help you grow your business online. Reach out to us for a free quote or consultation."
      }
    }
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    description: "Terms and Conditions for WebDesino.",
    content: {
      hero: { title: "Terms & Conditions", subtitle: "Last Updated: December 2025" },
      sections: [{ title: "Introduction", content: "Welcome to WebDesino..." }]
    }
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "Privacy Policy for WebDesino.",
    content: {
      hero: { title: "Privacy Policy", subtitle: "Your privacy is important to us." },
      sections: [{ title: "Data Collection", content: "We collect..." }]
    }
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    description: "Refund Policy for WebDesino.",
    content: {
      hero: { title: "Refund Policy", subtitle: "Our refund policy." },
      sections: [{ title: "Refunds", content: "We offer refunds..." }]
    }
  }
];

async function main() {
  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {}, // Don't overwrite if exists
      create: page
    });
    console.log(`Seeded page: ${page.slug}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
