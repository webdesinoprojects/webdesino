"use server";

import prisma from "@/lib/prisma";
import { DEFAULT_LOCATION_STATE } from "@/lib/location-states";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendEnquiryEmail } from "@/lib/email";
import { logEmployeeAction } from "@/lib/employee-logger";
import { getHeroShowcaseItems } from "@/lib/data";
import { getHomepageHeroContent, HOMEPAGE_HERO_PAGE_SLUG } from "@/lib/homepage-hero";
import { getTrustedSectionContent, TRUSTED_SECTION_PAGE_SLUG } from "@/lib/trusted-section";
import { getTrustedBrandsContent, TRUSTED_BRANDS_PAGE_SLUG } from "@/lib/trusted-brands";
import { getWhyChooseContent, WHY_CHOOSE_PAGE_SLUG } from "@/lib/why-choose";
import { getIndustriesContent, INDUSTRIES_PAGE_SLUG } from "@/lib/industries-section";
import { getMaximizeSectionContent, MAXIMIZE_SECTION_PAGE_SLUG } from "@/lib/maximize-section";
import { getLocalAreasContent, LOCAL_AREAS_PAGE_SLUG } from "@/lib/local-areas-section";
import { AWARDS_SECTION_PAGE_SLUG, getAwardsSectionContent } from "@/lib/awards-section";
import { getSaasSectionContent, SAAS_SECTION_PAGE_SLUG } from "@/lib/saas-section";
import { z } from "zod";

/** Safely read a return-path from FormData. Only allows known internal prefixes. */
function safeReturnPath(formData: FormData, defaultPath: string): string {
  const path = formData.get("_returnPath") as string | null;
  if (path && (path.startsWith("/admin/") || path.startsWith("/employee/dashboard/"))) {
    return path;
  }
  return defaultPath;
}

export async function createProject(data: any) {
  await prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      industry: data.industry,
      description: data.description,
      image: data.image,
      fullDescription: data.fullDescription,
      results: data.results,
      metrics: data.metrics,
      faqs: data.faqs,
    },
  });

  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  revalidatePath("/portfolio");
}

export async function updateProject(id: string, data: any) {
  await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      industry: data.industry,
      description: data.description,
      image: data.image,
      fullDescription: data.fullDescription,
      results: data.results,
      metrics: data.metrics,
      faqs: data.faqs,
    },
  });

  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${data.slug}`);
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${data.slug}`);
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  revalidatePath("/portfolio");
}

export async function createService(data: any) {
  await prisma.serviceSubtype.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      categoryId: data.categoryId,
      icon: data.icon,
      features: data.features,
      benefits: data.benefits,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function updateService(id: string, data: any) {
  await prisma.serviceSubtype.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      categoryId: data.categoryId,
      icon: data.icon,
      features: data.features,
      benefits: data.benefits,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${data.slug}`); // Note: URL structure might be different
}

export async function deleteService(id: string) {
  await prisma.serviceSubtype.delete({
    where: { id },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  await logEmployeeAction("services", `Deleted service (id: ${id})`);
}

export async function createFAQ(data: any) {
  await prisma.faq.create({
    data: {
      question: data.question,
      answer: data.answer,
      category: data.category,
      order: parseInt(data.order) || 0,
    },
  });

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  await logEmployeeAction("faqs", `Created FAQ: "${data.question}"`);
}

export async function updateFAQ(id: string, data: any) {
  await prisma.faq.update({
    where: { id },
    data: {
      question: data.question,
      answer: data.answer,
      category: data.category,
      order: parseInt(data.order) || 0,
    },
  });

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  await logEmployeeAction("faqs", `Updated FAQ: "${data.question}"`);
}

export async function deleteFAQ(id: string) {
  await prisma.faq.delete({
    where: { id },
  });

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  await logEmployeeAction("faqs", `Deleted FAQ (id: ${id})`);
}

export async function createBlogPost(data: any) {
  await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      excerpt: data.excerpt,
      image: data.image,
      content: data.content,
      date: new Date(),
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/"); // Revalidate homepage to show new blog
  await logEmployeeAction("blogs", `Created blog post: "${data.title}"`);
}

export async function updateBlogPost(id: string, data: any) {
  await prisma.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      excerpt: data.excerpt,
      image: data.image,
      content: data.content,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/"); // Revalidate homepage to show updated blog
  await logEmployeeAction("blogs", `Updated blog post: "${data.title}"`);
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/"); // Revalidate homepage after deleting blog
  await logEmployeeAction("blogs", `Deleted blog post (id: ${id})`);
}

const blogCommentSchema = z.object({
  blogPostId: z.string().trim().min(1),
  postSlug: z.string().trim().min(1).max(220),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
  comment: z
    .string()
    .trim()
    .min(5, "Comment must be at least 5 characters")
    .max(1500, "Comment must be 1500 characters or less"),
  website: z.string().optional(),
});

export async function createBlogComment(formData: FormData) {
  const parsed = blogCommentSchema.safeParse({
    blogPostId: formData.get("blogPostId"),
    postSlug: formData.get("postSlug"),
    name: formData.get("name"),
    email: formData.get("email"),
    comment: formData.get("comment"),
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Please check your comment details.",
    };
  }

  const data = parsed.data;

  if (data.website?.trim()) {
    return { success: true };
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: data.blogPostId },
    select: { id: true, slug: true, title: true },
  });

  if (!post || post.slug !== data.postSlug) {
    return { success: false, error: "This blog post is no longer available." };
  }

  try {
    await prisma.blogComment.create({
      data: {
        blogPostId: post.id,
        postSlug: post.slug,
        postTitle: post.title,
        name: data.name,
        email: data.email.toLowerCase(),
        comment: data.comment,
        status: "pending",
      },
    });

    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Error creating blog comment:", error);
    return { success: false, error: "Failed to post comment. Please try again later." };
  }
}

export async function updateBlogCommentStatus(id: string, status: string) {
  const allowedStatuses = ["pending", "approved", "rejected"];
  if (!allowedStatuses.includes(status)) {
    return { success: false, error: "Invalid comment status." };
  }

  try {
    const updated = await prisma.blogComment.update({
      where: { id },
      data: { status },
    });

    if (updated?.postSlug) {
      revalidatePath(`/blog/${updated.postSlug}`);
    }
    revalidatePath("/blog");
    revalidatePath("/admin/blog-comments");
    return { success: true };
  } catch (error) {
    console.error("Error updating blog comment:", error);
    return { success: false, error: "Failed to update comment." };
  }
}

export async function deleteBlogComment(id: string) {
  try {
    const deleted = await prisma.blogComment.delete({ where: { id } });

    if (deleted?.postSlug) {
      revalidatePath(`/blog/${deleted.postSlug}`);
    }
    revalidatePath("/blog");
    revalidatePath("/admin/blog-comments");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog comment:", error);
    return { success: false, error: "Failed to delete comment." };
  }
}

export async function createTestimonial(data: any) {
  await prisma.testimonial.create({
    data: {
      name: data.name,
      text: data.text,
      company: data.company,
      location: data.location,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/"); // Testimonials might be on home page
  await logEmployeeAction("testimonials", `Created testimonial from "${data.name}"`);
}

export async function updateTestimonial(id: string, data: any) {
  await prisma.testimonial.update({
    where: { id },
    data: {
      name: data.name,
      text: data.text,
      company: data.company,
      location: data.location,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  await logEmployeeAction("testimonials", `Updated testimonial from "${data.name}"`);
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({
    where: { id },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  await logEmployeeAction("testimonials", `Deleted testimonial (id: ${id})`);
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
  redirect(safeReturnPath(formData, "/admin/services"));
}



const ADS_LANDING_SERVICES = [
  "web-development",
  "google-ads",
  "meta-ads",
  "seo-optimization",
  "general",
] as const;

export async function createEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string;
  let message = formData.get("message") as string;
  const location = formData.get("location") as string;
  const source = formData.get("source");
  const landingService = formData.get("landingService");

  const hasClassificationInput = source !== null || landingService !== null;
  const isAdsLandingEnquiry =
    source === "ads-landing" &&
    typeof landingService === "string" &&
    ADS_LANDING_SERVICES.includes(landingService as (typeof ADS_LANDING_SERVICES)[number]);

  if (hasClassificationInput && !isAdsLandingEnquiry) {
    return { success: false, error: "Invalid enquiry source." };
  }

  // Validation
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Name must be at least 2 characters long" };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please provide a valid email address" };
  }

  if (!message || message.trim().length < 10) {
    return { success: false, error: "Message must be at least 10 characters long" };
  }

  // Sanitize inputs
  const sanitizedName = name.trim().substring(0, 200);
  const sanitizedEmail = email.trim().toLowerCase().substring(0, 255);
  const sanitizedPhone = phone ? phone.trim().substring(0, 50) : null;
  const sanitizedService = service ? service.trim().substring(0, 100) : null;
  const sanitizedMessage = message.trim().substring(0, 5000);
  
  // Validate and sanitize location
  let sanitizedLocation: string | null = null;
  if (location) {
    const trimmedLocation = location.trim();
    // Validate location length (reasonable limit for location names)
    if (trimmedLocation.length > 0 && trimmedLocation.length <= 200) {
      // Sanitize location: remove potentially dangerous characters, keep alphanumeric, spaces, hyphens, commas, and common location characters
      sanitizedLocation = trimmedLocation
        .replace(/[<>\"'&]/g, "") // Remove HTML/script injection characters
        .replace(/\n\r\t/g, " ") // Replace newlines/tabs with spaces
        .replace(/\s+/g, " ") // Normalize whitespace
        .substring(0, 200); // Enforce max length
    } else if (trimmedLocation.length > 200) {
      return { success: false, error: "Location name is too long (maximum 200 characters)" };
    }
  }

  if (sanitizedLocation) {
    message = `[Location: ${sanitizedLocation}]\n\n${sanitizedMessage}`;
  } else {
    message = sanitizedMessage;
  }

  try {
    await prisma.enquiry.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        service: sanitizedService,
        message,
        ...(isAdsLandingEnquiry
          ? {
              source: "ads-landing",
              landingService,
            }
          : {}),
      },
    });

    // Send email (non-blocking - don't fail if email fails)
    try {
      await sendEnquiryEmail(sanitizedName, sanitizedEmail, sanitizedPhone || "", sanitizedService || "", message, sanitizedLocation || undefined);
    } catch (emailError) {
      console.error("Error sending enquiry email:", emailError);
      // Continue even if email fails
    }

    revalidatePath(isAdsLandingEnquiry ? "/admin/enquiries/ads" : "/admin/enquiries");
    return { success: true };
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return { success: false, error: "Failed to submit enquiry. Please try again later." };
  }
}

export async function createCallEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const issue = formData.get("issue") as string;
  const email = formData.get("email") as string;

  if (!name || name.trim().length < 2) {
    return { success: false, error: "Name must be at least 2 characters long" };
  }

  if (!phone || phone.trim().length < 7) {
    return { success: false, error: "Please provide a valid phone number" };
  }

  if (!issue || issue.trim().length < 10) {
    return { success: false, error: "Please share a bit more about the issue (minimum 10 characters)" };
  }

  const sanitizedName = name.trim().substring(0, 200);
  const sanitizedPhone = phone.trim().substring(0, 50);
  const sanitizedIssue = issue.trim().substring(0, 2000);
  const sanitizedEmail = email && email.trim().length > 0
    ? email.trim().toLowerCase().substring(0, 255)
    : "not-provided@webdesino.local";

  const message = `[CALL ENQUIRY]\n\nLikely issue: ${sanitizedIssue}`;
  const service = "15-minute Intro Call";

  try {
    await prisma.enquiry.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        service,
        message,
      },
    });

    try {
      await sendEnquiryEmail(
        sanitizedName,
        sanitizedEmail,
        sanitizedPhone,
        service,
        message
      );
    } catch (emailError) {
      console.error("Error sending call enquiry email:", emailError);
    }

    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error) {
    console.error("Error creating call enquiry:", error);
    return { success: false, error: "Failed to submit request. Please try again later." };
  }
}

export async function updateEnquiryStatus(id: string, status: string) {
  const allowed = ["new", "contacted", "closed"];
  if (!allowed.includes(status)) return { success: false, error: "Invalid status." };

  await prisma.enquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
  revalidatePath("/admin/enquiries/ads");
  revalidatePath(`/admin/enquiries/ads/${id}`);
  revalidatePath("/employee/dashboard/enquiries");
  revalidatePath(`/employee/dashboard/enquiries/${id}`);
  revalidatePath("/employee/dashboard/ads-enquiries");
  revalidatePath(`/employee/dashboard/ads-enquiries/${id}`);
  await logEmployeeAction("enquiries", `Updated enquiry status to ${status.toUpperCase()} (id: ${id})`);
  return { success: true };
}

export async function createLocation(formData: FormData) {
  const location = formData.get("location") as string;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const serviceFocus = formData.get("serviceFocus") as string;
  const stateRaw = formData.get("state") as string | null;
  const contentRaw = formData.get("content") as string;
  
  let content = {};
  try {
    content = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (e) {
    console.error("Error parsing content JSON", e);
  }

  const state = stateRaw?.trim() || DEFAULT_LOCATION_STATE;

  await prisma.locationPage.create({
    data: {
      location,
      slug,
      title,
      description,
      serviceFocus,
      state,
      content,
    },
  });

  revalidatePath("/admin/locations");
  revalidatePath("/", "layout");
  await logEmployeeAction("locations", `Created location page: "${title}"`);
  redirect(safeReturnPath(formData, "/admin/locations"));
}

export async function updateLocation(id: string, formData: FormData) {
  const location = formData.get("location") as string;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const serviceFocus = formData.get("serviceFocus") as string;
  const stateRaw = formData.get("state") as string | null;
  const contentRaw = formData.get("content") as string;

  let content = {};
  try {
    content = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (e) {
    console.error("Error parsing content JSON", e);
  }

  const state = stateRaw?.trim() || DEFAULT_LOCATION_STATE;

  await prisma.locationPage.update({
    where: { id },
    data: {
      location,
      slug,
      title,
      description,
      serviceFocus,
      state,
      content,
    },
  });

  revalidatePath("/admin/locations");
  revalidatePath(`/${slug}`);
  revalidatePath("/", "layout");
  await logEmployeeAction("locations", `Updated location page: "${title}"`);
  redirect(safeReturnPath(formData, "/admin/locations"));
}

export async function deleteLocation(id: string) {
  await prisma.locationPage.delete({
    where: { id },
  });

  revalidatePath("/admin/locations");
  revalidatePath("/", "layout");
  await logEmployeeAction("locations", `Deleted location page (id: ${id})`);
  redirect("/admin/locations");
}

// --- Page Actions ---

export async function createPage(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const contentRaw = formData.get("content") as string;

  let content = {};
  try {
    content = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (e) {
    console.error("Error parsing content JSON", e);
  }

  await prisma.page.create({
    data: {
      title,
      slug,
      description,
      content,
    },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/${slug}`);
  await logEmployeeAction("pages", `Created page: "${title}"`);
  redirect(safeReturnPath(formData, "/admin/pages"));
}

export async function updatePage(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const contentRaw = formData.get("content") as string;

  let content = {};
  try {
    content = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (e) {
    console.error("Error parsing content JSON", e);
  }

  await prisma.page.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      content,
    },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/${slug}`); // Revalidate the page itself
  await logEmployeeAction("pages", `Updated page: "${title}"`);
  redirect(safeReturnPath(formData, "/admin/pages"));
}

export async function deletePage(id: string) {
  const existingPage = await prisma.page.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (
    existingPage?.slug === HOMEPAGE_HERO_PAGE_SLUG ||
    existingPage?.slug === TRUSTED_SECTION_PAGE_SLUG ||
    existingPage?.slug === TRUSTED_BRANDS_PAGE_SLUG ||
    existingPage?.slug === WHY_CHOOSE_PAGE_SLUG ||
    existingPage?.slug === INDUSTRIES_PAGE_SLUG ||
    existingPage?.slug === MAXIMIZE_SECTION_PAGE_SLUG ||
    existingPage?.slug === LOCAL_AREAS_PAGE_SLUG ||
    existingPage?.slug === AWARDS_SECTION_PAGE_SLUG ||
    existingPage?.slug === SAAS_SECTION_PAGE_SLUG
  ) {
    throw new Error("This protected CMS page cannot be deleted from the generic pages table.");
  }

  await prisma.page.delete({
    where: { id },
  });

  revalidatePath("/admin/pages");
  if (existingPage?.slug) {
    revalidatePath(`/${existingPage.slug}`);
  }
  redirect("/admin/pages");
}

export async function updateHomepageHero(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing homepage hero content JSON", error);
  }

  const hero = getHomepageHeroContent(parsedContent, getHeroShowcaseItems());

  await prisma.page.upsert({
    where: { slug: HOMEPAGE_HERO_PAGE_SLUG },
    update: {
      title: "Homepage Hero",
      description: "Homepage hero section content and showcase configuration.",
      content: { hero },
    },
    create: {
      title: "Homepage Hero",
      slug: HOMEPAGE_HERO_PAGE_SLUG,
      description: "Homepage hero section content and showcase configuration.",
      content: { hero },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/home-hero");
  await logEmployeeAction("pages", "Updated homepage hero section");
  redirect("/admin/pages/home-hero?saved=1");
}

export async function updateTrustedSection(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing trusted section content JSON", error);
  }

  const trustedSection = getTrustedSectionContent(parsedContent);

  await prisma.page.upsert({
    where: { slug: TRUSTED_SECTION_PAGE_SLUG },
    update: {
      title: "Trusted Section",
      description: "Homepage trusted company stats and certified partner content.",
      content: { trustedSection },
    },
    create: {
      title: "Trusted Section",
      slug: TRUSTED_SECTION_PAGE_SLUG,
      description: "Homepage trusted company stats and certified partner content.",
      content: { trustedSection },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/trusted-section");
  await logEmployeeAction("pages", "Updated trusted section content");
  redirect("/admin/pages/trusted-section?saved=1");
}

export async function updateTrustedBrands(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing trusted brands content JSON", error);
  }

  const trustedBrands = getTrustedBrandsContent(parsedContent);

  await prisma.page.upsert({
    where: { slug: TRUSTED_BRANDS_PAGE_SLUG },
    update: {
      title: "Trusted Brands",
      description: "Homepage trusted brand carousel content.",
      content: { trustedBrands },
    },
    create: {
      title: "Trusted Brands",
      slug: TRUSTED_BRANDS_PAGE_SLUG,
      description: "Homepage trusted brand carousel content.",
      content: { trustedBrands },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/trusted-brands");
  await logEmployeeAction("pages", "Updated trusted brand carousel content");
  redirect("/admin/pages/trusted-brands?saved=1");
}

export async function updateWhyChoose(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing why choose content JSON", error);
  }

  const whyChoose = getWhyChooseContent(parsedContent);

  await prisma.page.upsert({
    where: { slug: WHY_CHOOSE_PAGE_SLUG },
    update: {
      title: "Why Choose WebDesino",
      description: "Homepage why choose section content and vision card image.",
      content: { whyChoose },
    },
    create: {
      title: "Why Choose WebDesino",
      slug: WHY_CHOOSE_PAGE_SLUG,
      description: "Homepage why choose section content and vision card image.",
      content: { whyChoose },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/why-choose");
  await logEmployeeAction("pages", "Updated why choose section content");
  redirect("/admin/pages/why-choose?saved=1");
}

export async function updateIndustriesSection(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing industries content JSON", error);
  }

  const industries = getIndustriesContent(parsedContent);

  await prisma.page.upsert({
    where: { slug: INDUSTRIES_PAGE_SLUG },
    update: {
      title: "Industries Section",
      description: "Homepage industries section content, icons, and example links.",
      content: { industries },
    },
    create: {
      title: "Industries Section",
      slug: INDUSTRIES_PAGE_SLUG,
      description: "Homepage industries section content, icons, and example links.",
      content: { industries },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/industries");
  await logEmployeeAction("pages", "Updated industries section content");
  redirect("/admin/pages/industries?saved=1");
}

export async function updateMaximizeSection(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing maximize section content JSON", error);
  }

  const maximizeSection = getMaximizeSectionContent(parsedContent);

  await prisma.page.upsert({
    where: { slug: MAXIMIZE_SECTION_PAGE_SLUG },
    update: {
      title: "Maximize Section",
      description: "Homepage web design and development CTA section content.",
      content: { maximizeSection },
    },
    create: {
      title: "Maximize Section",
      slug: MAXIMIZE_SECTION_PAGE_SLUG,
      description: "Homepage web design and development CTA section content.",
      content: { maximizeSection },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/maximize-section");
  await logEmployeeAction("pages", "Updated maximize section content");
  redirect("/admin/pages/maximize-section?saved=1");
}

export async function updateLocalAreasSection(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing local areas content JSON", error);
  }

  const localAreas = getLocalAreasContent(parsedContent);

  await prisma.page.upsert({
    where: { slug: LOCAL_AREAS_PAGE_SLUG },
    update: {
      title: "Local Areas Section",
      description: "Homepage local area copy, map embed, location links, and CTA.",
      content: { localAreas },
    },
    create: {
      title: "Local Areas Section",
      slug: LOCAL_AREAS_PAGE_SLUG,
      description: "Homepage local area copy, map embed, location links, and CTA.",
      content: { localAreas },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/local-areas");
  await logEmployeeAction("pages", "Updated local areas section content");
  redirect("/admin/pages/local-areas?saved=1");
}

export async function updateAwardsSection(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing awards section content JSON", error);
  }

  const awardsSection = getAwardsSectionContent(parsedContent);

  await prisma.page.upsert({
    where: { slug: AWARDS_SECTION_PAGE_SLUG },
    update: {
      title: "Awards Section",
      description: "Homepage awards heading, background ticker word, and award cards.",
      content: { awardsSection },
    },
    create: {
      title: "Awards Section",
      slug: AWARDS_SECTION_PAGE_SLUG,
      description: "Homepage awards heading, background ticker word, and award cards.",
      content: { awardsSection },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/awards-section");
  await logEmployeeAction("pages", "Updated awards section content");
  redirect("/admin/pages/awards-section?saved=1");
}

export async function updateSaasSection(formData: FormData) {
  const contentRaw = formData.get("content") as string;

  let parsedContent = {};
  try {
    parsedContent = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (error) {
    console.error("Error parsing SaaS section content JSON", error);
  }

  const saasSection = getSaasSectionContent(parsedContent);

  await prisma.page.upsert({
    where: { slug: SAAS_SECTION_PAGE_SLUG },
    update: {
      title: "SaaS Section",
      description: "Homepage SaaS/process copy, CTA, and process cards.",
      content: { saasSection },
    },
    create: {
      title: "SaaS Section",
      slug: SAAS_SECTION_PAGE_SLUG,
      description: "Homepage SaaS/process copy, CTA, and process cards.",
      content: { saasSection },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/saas-section");
  await logEmployeeAction("pages", "Updated SaaS section content");
  redirect("/admin/pages/saas-section?saved=1");
}

export async function createTeamMember(data: any) {
  await prisma.teamMember.create({
    data: {
      name: data.name,
      role: data.role,
      image: data.image,
      order: parseInt(data.order) || 0,
    },
  });

  revalidatePath("/admin/team");
  revalidatePath("/about");
  await logEmployeeAction("team", `Added team member: "${data.name}"`);
}

export async function updateTeamMember(id: string, data: any) {
  await prisma.teamMember.update({
    where: { id },
    data: {
      name: data.name,
      role: data.role,
      image: data.image,
      order: parseInt(data.order) || 0,
    },
  });

  revalidatePath("/admin/team");
  revalidatePath("/about");
  await logEmployeeAction("team", `Updated team member: "${data.name}"`);
}

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({
    where: { id },
  });

  revalidatePath("/admin/team");
  revalidatePath("/about");
  await logEmployeeAction("team", `Removed team member (id: ${id})`);
}

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;

  await prisma.client.create({
    data: {
      name,
      url,
      image,
      category,
    },
  });

  revalidatePath("/admin/clients");
  revalidatePath("/our-clients");
  await logEmployeeAction("clients", `Added client: "${name}"`);
  redirect(safeReturnPath(formData, "/admin/clients"));
}

export async function updateClient(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;

  await prisma.client.update({
    where: { id },
    data: {
      name,
      url,
      image,
      category,
    },
  });

  revalidatePath("/admin/clients");
  revalidatePath("/our-clients");
  await logEmployeeAction("clients", `Updated client: "${name}"`);
  redirect(safeReturnPath(formData, "/admin/clients"));
}

export async function deleteClient(id: string) {
  await prisma.client.delete({
    where: { id },
  });

  revalidatePath("/admin/clients");
  revalidatePath("/our-clients");
  await logEmployeeAction("clients", `Deleted client (id: ${id})`);
}


