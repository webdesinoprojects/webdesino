import * as dotenv from "dotenv";
import { disconnectMongo, connectToMongo } from "../lib/mongo/connection";
import { BirthdayWishModel } from "../lib/mongo/models/birthday-wish.model";

dotenv.config({ path: ".env.local" });
dotenv.config();

const localPhoto = (url: string, message: string) => ({
  url,
  name: url.split("/").pop() || "birthday-demo.png",
  size: null,
  mimeType: "image/png",
  storageProvider: "local",
  fileId: null,
  filePath: url,
  message,
});

const localMusic = (url: string, name: string) => ({
  url,
  name,
  size: null,
  mimeType: "audio/mpeg",
  storageProvider: "local",
  fileId: null,
  filePath: url,
});

const kawaiiMemories = [
  localPhoto("/birthday/assets/happy-cat.png", "A smile worth celebrating every day."),
  localPhoto("/birthday/assets/balloons.png", "For every colorful memory still to come."),
  localPhoto("/birthday/assets/birthday-cake.png", "Make a wish and keep it close."),
  localPhoto("/birthday/assets/starry-eyed-cat.png", "You make ordinary moments feel magical."),
];

const romanticMemories = [
  localPhoto("/birthday/assets/template2/cat-surprise.png", "The sweetest surprises are the ones shared with you."),
  localPhoto("/birthday/assets/template2/rapunzel.png", "A little fairytale moment for your special day."),
  localPhoto("/birthday/assets/template2/tulip-bed.png", "Every memory with you deserves a place here."),
  localPhoto("/birthday/assets/template2/tulip-bouquet.jpg", "Flowers for someone who makes life brighter."),
  localPhoto("/birthday/assets/template2/dino.png", "You are loved more than this tiny note can say."),
  localPhoto("/birthday/assets/template2/kitty-bg.jpg", "One more reason to smile today."),
];

const heartMemories = [
  localPhoto("/birthday/assets/template3/img-11.png", "A little birthday surprise."),
  localPhoto("/birthday/assets/template3/img-13.png", "A wish made especially for you."),
  localPhoto("/birthday/assets/template3/img-16.png", "Here is to every universe we share."),
];

const dogMemories = [
  localPhoto("/birthday/assets/template4/dog-out-of-box.png", "The day the surprise finally escaped the box."),
  localPhoto("/birthday/assets/template4/dog-holding-cake.png", "Cake, candles, and a very happy birthday."),
  localPhoto("/birthday/assets/template4/dog-holding-balloon.png", "A balloon for every wonderful memory."),
  localPhoto("/birthday/assets/template4/dog-blowing-horn.png", "The celebration would not be complete without you."),
  localPhoto("/birthday/assets/template4/bouquet-corner.png", "A bouquet collected just for your special day."),
];

const demos = [
  {
    slug: "demo-kawaii-unlock",
    templateId: "kawaii-unlock",
    recipientName: "Mia",
    senderName: "Aarav",
    passcode: "1807",
    message:
      "Happy birthday, Mia. May this year bring you gentle mornings, loud laughter, beautiful surprises, and every little thing your heart has been waiting for.",
    copy: {
      entryTitle: "A tiny birthday surprise!",
      entryQuestion: "Ready to open something made for you?",
      revealTitle: "Happy Birthday,",
      letterTitle: "My wish for you",
      finaleTitle: "The happiest birthday to you!",
    },
    revealPhoto: localPhoto("/birthday/assets/happy-cat.png", "The birthday star"),
    memories: kawaiiMemories,
    photos: kawaiiMemories,
    music: localMusic(
      "/birthday/music/happy-birthday-my-kitty.mp3",
      "Happy Birthday, My Kitty"
    ),
    voiceRecording: null,
    cakeTheme: "strawberry",
    finalMessage: "Thank you for celebrating this little birthday adventure!",
  },
  {
    slug: "demo-romantic-puzzle",
    templateId: "romantic-puzzle",
    recipientName: "Priya",
    senderName: "Rohan",
    passcode: null,
    message:
      "You make every ordinary day warmer just by being there. I hope this birthday reminds you how deeply appreciated, admired, and loved you are.",
    copy: {
      romanticSurpriseTitle: "SURPRISE AWAITING",
      romanticDragTitle: "Drag the CUTE banner to the gift!",
      romanticJarTitle: "Everything I love about you",
      romanticJarSubtitle: "A tiny jar filled with the sweetest little reasons.",
      romanticPuzzleTitle: "Assemble the letter",
      romanticAwardTitle: "Best Birthday Person Award",
      romanticGalleryTitle: "Your little memory wall",
      romanticGallerySubtitle: "A reminder of how loved you are.",
      romanticLoveItems: [
        "your smile",
        "your laugh",
        "your kindness",
        "your voice",
        "your hugs",
        "your heart",
        "your energy",
        "your care",
        "your jokes",
        "your eyes",
        "your warmth",
        "everything",
      ],
    },
    revealPhoto: null,
    memories: romanticMemories,
    photos: romanticMemories,
    music: localMusic(
      "/birthday/music/the-mountain-happy-birthday.mp3",
      "Happy Birthday Celebration"
    ),
    voiceRecording: null,
    cakeTheme: "strawberry",
    finalMessage: "Here is a little reminder of how loved you are.",
  },
  {
    slug: "demo-heart-year",
    templateId: "heart-year",
    recipientName: "Anaya",
    senderName: "Kabir",
    passcode: null,
    message:
      "I hope your birthday is filled with peaceful moments, sweet surprises, and the kind of happiness that stays with you long after today.",
    copy: {
      heartIntroTitle: "I made something special for u\ndo u wanna see it?",
      heartBirthdayTitle: "HAPPY BIRTHDAY",
      heartBirthdayCaption: "You are the gift",
      heartWishTitle: "MY WISH FOR U",
      heartHugTitle: "Virtual hug for ya!",
      heartHugCaption: "I MISS YOU",
      heartFinalTitle: "Have a beautiful year ahead",
      heartFinalDate: "30.07.2026",
    },
    revealPhoto: null,
    memories: heartMemories,
    photos: heartMemories,
    music: localMusic(
      "/birthday/music/ikoliks-happy-birthday.mp3",
      "Cheerful Happy Birthday"
    ),
    voiceRecording: null,
    cakeTheme: "strawberry",
    finalMessage: "Have a beautiful year ahead.",
  },
  {
    slug: "demo-dog-scrapbook",
    templateId: "dog-scrapbook",
    recipientName: "Aarohi",
    senderName: "Vihaan",
    passcode: "2026",
    message:
      "Happy birthday, Aarohi. You are one of a kind, and life is brighter, funnier, and far more meaningful with you in it. Never forget how special you are.",
    copy: {
      dogGiftTitle: "I MADE SOMETHING SPECIAL FOR YOU\nDO YOU WANNA SEE IT?",
      dogBirthdayTitle: "HAPPY BIRTHDAY",
      dogBirthdaySubtitle: "A little celebration made just for you",
      dogMemoriesTitle: "Memories",
      dogMemoriesSubtitle: "Moments of us",
      dogFactsTitle: "FUN FACTS ABOUT YOU",
      dogLetterTitle: "WITH LOVE",
      dogFinalTitle: "YOU ARE ONE IN YOUR OWN KIND",
      dogFacts: [
        "You make ordinary days feel special",
        "Your smile can fix almost anything",
        "You always know how to make me laugh",
        "You are kinder than you realize",
        "Life is brighter with you in it",
      ],
    },
    revealPhoto: localPhoto(
      "/birthday/assets/template4/dog-out-of-box.png",
      "The birthday surprise"
    ),
    memories: dogMemories,
    photos: dogMemories,
    music: localMusic(
      "/birthday/music/saavane-happy-birthday.mp3",
      "Happy Birthday Wishes"
    ),
    voiceRecording: null,
    cakeTheme: "strawberry",
    finalMessage: "You are one in your own kind.",
  },
] as const;

async function main() {
  await connectToMongo();

  for (const demo of demos) {
    await BirthdayWishModel.findOneAndUpdate(
      { slug: demo.slug },
      { $set: demo },
      {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  console.log(`Seeded ${demos.length} birthday demos.`);
  console.log(`Builder: ${siteUrl}/birthday`);
  for (const demo of demos) {
    const passcode = demo.passcode ? ` (passcode: ${demo.passcode})` : "";
    console.log(`${demo.templateId}: ${siteUrl}/birthday/${demo.slug}${passcode}`);
  }
}

main()
  .catch((error) => {
    console.error("Failed to seed birthday demos:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectMongo();
  });
