"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
