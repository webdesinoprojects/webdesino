"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const industry = formData.get("industry") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const results = formData.get("results") as string;

  await prisma.project.create({
    data: {
      title,
      slug,
      industry,
      description,
      image,
      fullDescription,
      results,
    },
  });

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const image = formData.get("image") as string;
  const content = formData.get("content") as string;

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      category,
      excerpt,
      image,
      content,
      date: new Date(), // Add current date
    },
  });

  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function createServiceCategory(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;

  await prisma.serviceCategory.create({
    data: {
      title,
      slug,
      description,
      icon,
    },
  });

  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function createServiceSubtype(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const icon = formData.get("icon") as string;
  
  // Handle array fields (features and benefits)
  // Expecting them as newline separated strings from textarea
  const featuresRaw = formData.get("features") as string;
  const benefitsRaw = formData.get("benefits") as string;

  const features = featuresRaw ? featuresRaw.split('\n').filter(line => line.trim() !== '') : [];
  const benefits = benefitsRaw ? benefitsRaw.split('\n').filter(line => line.trim() !== '') : [];

  await prisma.serviceSubtype.create({
    data: {
      title,
      slug,
      description,
      categoryId,
      icon,
      features,
      benefits,
    },
  });

  revalidatePath(`/admin/services/${categoryId}`);
  redirect(`/admin/services/${categoryId}`);
}

export async function createEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string;
  let message = formData.get("message") as string;
  const location = formData.get("location") as string;

  if (location) {
    message = `[Location: ${location}]\n\n${message}`;
  }

  try {
    await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        service,
        message,
      },
    });

    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"WebDesino Website" <no-reply@webdesino.com>',
        to: process.env.SMTP_TO || "info@webdesino.com",
        subject: `New Enquiry from ${name} - ${service || "General"} ${location ? `(${location})` : ""}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Service: ${service}
          Location: ${location || "N/A"}
          Message: ${message}
        `,
        html: `
          <h1>New Enquiry Received</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Location:</strong> ${location || "N/A"}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
    }

    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return { success: false, error: "Failed to submit enquiry" };
  }
}

export async function createLocation(formData: FormData) {
  const location = formData.get("location") as string;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.locationPage.create({
    data: {
      location,
      slug,
      title,
      description,
    },
  });

  revalidatePath("/admin/locations");
  redirect("/admin/locations");
}

export async function updateLocation(id: string, formData: FormData) {
  const location = formData.get("location") as string;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.locationPage.update({
    where: { id },
    data: {
      location,
      slug,
      title,
      description,
    },
  });

  revalidatePath("/admin/locations");
  revalidatePath(`/${slug}`);
  redirect("/admin/locations");
}

export async function deleteLocation(id: string) {
  await prisma.locationPage.delete({
    where: { id },
  });

  revalidatePath("/admin/locations");
  redirect("/admin/locations");
}

