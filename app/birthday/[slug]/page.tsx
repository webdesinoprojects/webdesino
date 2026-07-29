import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DogScrapbookBirthdayExperience from "@/components/birthday/DogScrapbookBirthdayExperience";
import HeartYearBirthdayExperience from "@/components/birthday/HeartYearBirthdayExperience";
import KawaiiBirthdayExperience from "@/components/birthday/KawaiiBirthdayExperience";
import RomanticBirthdayExperience from "@/components/birthday/RomanticBirthdayExperience";
import { getBirthdayWish } from "@/lib/birthday";

type BirthdayWishPageProps = {
  params: {
    slug: string;
  };
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BirthdayWishPageProps): Promise<Metadata> {
  const wish = await getBirthdayWish(params.slug);

  return {
    title: wish ? `Birthday surprise for ${wish.recipientName}` : "Birthday surprise",
    description: "A private birthday surprise page.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function BirthdayWishPage({ params }: BirthdayWishPageProps) {
  const wish = await getBirthdayWish(params.slug);

  if (!wish) {
    notFound();
  }

  if (wish.templateId === "romantic-puzzle") {
    return <RomanticBirthdayExperience wish={wish} />;
  }

  if (wish.templateId === "heart-year") {
    return <HeartYearBirthdayExperience wish={wish} />;
  }

  if (wish.templateId === "dog-scrapbook") {
    return <DogScrapbookBirthdayExperience wish={wish} />;
  }

  return <KawaiiBirthdayExperience wish={wish} />;
}
