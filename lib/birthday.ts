import { connectToMongo } from "@/lib/mongo/connection";
import { BirthdayWishModel } from "@/lib/mongo/models/birthday-wish.model";
import type { BirthdayWish } from "@/lib/birthday-actions";

export async function getBirthdayWish(slug: string): Promise<BirthdayWish | null> {
  const safeSlug = slug.trim().toLowerCase();
  if (!/^[a-z0-9-]{3,64}$/.test(safeSlug)) return null;

  await connectToMongo();
  const wish = (await BirthdayWishModel.findOne({ slug: safeSlug })
    .select({
      passcode: 0,
    })
    .lean()) as any;

  if (!wish) return null;

  return {
    id: wish._id?.toString?.() || safeSlug,
    slug: wish.slug,
    templateId: wish.templateId,
    recipientName: wish.recipientName,
    senderName: wish.senderName,
    message: wish.message,
    revealPhoto: wish.revealPhoto || null,
    memories: Array.isArray(wish.memories) ? wish.memories : [],
    music: wish.music || null,
    voiceRecording: wish.voiceRecording || null,
    cakeTheme: wish.cakeTheme || "strawberry",
    finalMessage: wish.finalMessage || "Thank you for celebrating with me!",
    photos: Array.isArray(wish.photos) ? wish.photos : [],
    createdAt: wish.createdAt,
  };
}
