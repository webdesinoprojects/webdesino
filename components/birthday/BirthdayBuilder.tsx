"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  Award,
  Cake,
  CheckCircle,
  Copy,
  ExternalLink,
  Gift,
  Heart,
  ImageIcon,
  Loader2,
  Mic,
  Music,
  Sparkles,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import { createBirthdayWish, type BirthdayTemplateId } from "@/lib/birthday-actions";

const MAX_MEMORIES = 15;
const MAX_IMAGE_MB = 3;
const MAX_AUDIO_MB = 8;
const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const AUDIO_TYPES = [
  "audio/aac",
  "audio/mpeg",
  "audio/mp3",
  "audio/mp4",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
  "audio/x-wav",
];
const ASSET = "/birthday/assets";

const KAWAII_COPY_DEFAULTS = {
  entryTitle: "A Special Surprise!",
  entryQuestion: "Are you ready to see it?",
  yesButton: "Yes, open it!",
  noButton: "No, go away",
  noButtonMessage: "Don't be mean. The gift is waiting.",
  passcodeTitle: "Enter the passcode",
  passcodeSubtitle: "Prove it is really you",
  unlockButton: "Unlock",
  wrongPasscodeTitle: "Oops! Wrong Code!",
  tryAgainButton: "Try Again",
  giftTitle: "Unwrap your gift!",
  giftSubtitle: "Keep tapping to open it.",
  magicTitle: "Casting birthday magic...",
  revealTitle: "Happy Birthday,",
  continueButton: "Continue",
  preLetterTitle: "Are you ready to cry from happiness?",
  preLetterYes: "Yes, absolutely!",
  preLetterAlt: "I already am!",
  letterTitle: "My wish for you",
  memoriesButton: "See Memories",
  cakePromptTitle: "Blow out the candle",
  cakePromptSubtitle: "Click the cake",
  finaleTitle: "Happy Birthday to youuuuuuuuuu",
  nextButton: "Next",
  playAgainButton: "Play Again",
};

const ROMANTIC_COPY_DEFAULTS = {
  romanticSurpriseTitle: "SURPRISE AWAITING",
  romanticSurpriseButton: "Open Surprise",
  romanticDragTitle: "Drag the CUTE banner to the gift!",
  romanticCuteBanner: "CUTE",
  romanticJarTitle: "Everything I love about you",
  romanticJarSubtitle: "A tiny jar filled with the sweetest little reasons.",
  romanticJarButton: "Next",
  romanticPuzzleTitle: "Assemble the letter",
  romanticPuzzleHint: "Drag each piece into the dotted letter box.",
  romanticPuzzleTarget: "Letter goes here",
  romanticPuzzleButton: "Open Award",
  romanticAwardOverline: "This award is presented to",
  romanticAwardTitle: "Best Birthday Person Award",
  romanticAwardBody:
    "You are one of the most precious people in my life. Thank you for being you and making ordinary days feel special.",
  romanticAwardButton: "Open Gallery",
  romanticGalleryTitle: "Your little memory wall",
  romanticGallerySubtitle: "Here is a tiny reminder of how loved you are.",
  romanticRestartButton: "Play Again",
};

const HEART_COPY_DEFAULTS = {
  heartIntroTitle: "I made something special for u\ndo u wanna see it?",
  heartYesButton: "YES",
  heartNoButton: "NO",
  heartWrongTitle: "Why did u click no!?",
  heartTryAgainButton: "TRY AGAIN",
  heartBirthdayTitle: "HAPPY BIRTHDAY",
  heartBirthdayCaption: "I am ur gift",
  heartBirthdayButton: "CLICK ME!",
  heartWishTitle: "MY WISH FOR U",
  heartWishButton: "CLICK ME!",
  heartHugTitle: "Virtual hug for ya!",
  heartHugCaption: "I MISS YOU",
  heartHugButton: "CLICK ME!",
  heartFinalTitle: "Have a great year ahead",
  heartFinalDate: "02.03.2026",
};

const DOG_COPY_DEFAULTS = {
  dogGiftTitle: "I made something for you\ndo you wanna see it?",
  dogYesButton: "YES",
  dogNoButton: "NO",
  dogWrongChoiceTitle: "WHY DID YOU CLICK NO!?",
  dogTryAgainButton: "TRY AGAIN",
  dogBirthdayTitle: "HAPPY BIRTHDAY",
  dogBirthdaySubtitle: "A little celebration made just for you",
  dogMemoriesTitle: "Memories",
  dogMemoriesSubtitle: "Moments of us",
  dogFactsTitle: "Fun facts about you",
  dogLetterTitle: "With Love",
  dogFinalTitle: "You are one in your own kind",
  dogRestartButton: "Play Again",
};

const DOG_FACTS_DEFAULTS = [
  "You make ordinary days feel special",
  "Your smile can fix almost anything",
  "You always know how to make me laugh",
  "You are kinder than you realize",
  "Life is brighter with you in it",
].join("\n");

const ROMANTIC_LOVE_ITEMS = [
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
].join("\n");

type MemoryFile = {
  file: File;
  message: string;
};

type SavedState = {
  slug: string;
  shareUrl: string;
};

type PreviewItem = {
  file: File;
  url: string;
};

type CopyState = Record<string, string>;

function getTemplateCopyDefaults(templateId: BirthdayTemplateId): CopyState {
  if (templateId === "romantic-puzzle") return ROMANTIC_COPY_DEFAULTS;
  if (templateId === "heart-year") return HEART_COPY_DEFAULTS;
  if (templateId === "dog-scrapbook") return DOG_COPY_DEFAULTS;
  return KAWAII_COPY_DEFAULTS;
}

function getTemplateFinalMessage(templateId: BirthdayTemplateId) {
  if (templateId === "kawaii-unlock") return "Thank you for celebrating with me!";
  if (templateId === "heart-year") return "Have a great year ahead.";
  if (templateId === "dog-scrapbook") return "You are one in your own kind.";
  return "Here's a little reminder of how loved you are.";
}

function getTemplateLabel(templateId: BirthdayTemplateId) {
  if (templateId === "romantic-puzzle") return "Romantic Puzzle Birthday";
  if (templateId === "heart-year") return "Heart Year Birthday";
  if (templateId === "dog-scrapbook") return "Dog Scrapbook Birthday";
  return "Kawaii Birthday Unlock";
}

export default function BirthdayBuilder() {
  const [templateId, setTemplateId] = useState<BirthdayTemplateId>("kawaii-unlock");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const [revealPhoto, setRevealPhoto] = useState<File | null>(null);
  const [memories, setMemories] = useState<MemoryFile[]>([]);
  const [music, setMusic] = useState<File | null>(null);
  const [voiceRecording, setVoiceRecording] = useState<File | null>(null);
  const [cakeTheme, setCakeTheme] = useState("strawberry");
  const [finalMessage, setFinalMessage] = useState("Thank you for celebrating with me!");
  const [copy, setCopy] = useState<CopyState>(KAWAII_COPY_DEFAULTS);
  const [loveItems, setLoveItems] = useState(ROMANTIC_LOVE_ITEMS);
  const [dogFacts, setDogFacts] = useState(DOG_FACTS_DEFAULTS);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedState | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const memoryInputRef = useRef<HTMLInputElement>(null);

  const revealPreview = useObjectUrl(revealPhoto);
  const memoryPreviews = useMemo(
    () =>
      memories.map((memory) => ({
        file: memory.file,
        url: URL.createObjectURL(memory.file),
      })),
    [memories]
  );

  useEffect(() => {
    return () => {
      memoryPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [memoryPreviews]);

  function validateImage(file: File) {
    if (!IMAGE_TYPES.includes(file.type)) return "Only JPG, PNG, and WebP images are allowed.";
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return `Each image must be under ${MAX_IMAGE_MB} MB.`;
    return null;
  }

  function validateAudio(file: File) {
    if (!AUDIO_TYPES.includes(file.type)) return "Only common audio files are allowed.";
    if (file.size > MAX_AUDIO_MB * 1024 * 1024) return `Audio file must be under ${MAX_AUDIO_MB} MB.`;
    return null;
  }

  function setTemplate(nextTemplate: BirthdayTemplateId) {
    setTemplateId(nextTemplate);
    setError(null);
    setSaved(null);
    setCopy(getTemplateCopyDefaults(nextTemplate));
    setFinalMessage(getTemplateFinalMessage(nextTemplate));
  }

  function updateCopy(key: string, value: string) {
    setCopy((current) => ({ ...current, [key]: value.slice(0, 400) }));
  }

  function addMemories(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    const accepted: MemoryFile[] = [];

    for (const file of incoming) {
      const imageError = validateImage(file);
      if (imageError) {
        setError(imageError);
        continue;
      }
      accepted.push({ file, message: "" });
    }

    if (!accepted.length) return;
    setError(null);
    setMemories((current) => {
      const maxFiles = templateId === "heart-year" ? 3 : MAX_MEMORIES;
      return [...current, ...accepted].slice(0, maxFiles);
    });
  }

  function handleRevealFile(file: File | undefined) {
    if (!file) return;
    const imageError = validateImage(file);
    if (imageError) {
      setError(imageError);
      return;
    }
    setError(null);
    setRevealPhoto(file);
  }

  function handleMusicFile(file: File | undefined) {
    if (!file) return;
    const audioError = validateAudio(file);
    if (audioError) {
      setError(audioError);
      return;
    }
    setError(null);
    setMusic(file);
  }

  function handleVoiceFile(file: File | undefined) {
    if (!file) return;
    const audioError = validateAudio(file);
    if (audioError) {
      setError(audioError);
      return;
    }
    setError(null);
    setVoiceRecording(file);
  }

  function updateMemoryMessage(index: number, value: string) {
    setMemories((current) =>
      current.map((memory, itemIndex) =>
        itemIndex === index ? { ...memory, message: value.slice(0, 180) } : memory
      )
    );
  }

  function removeMemory(index: number) {
    setMemories((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  function buildCopyPayload() {
    if (templateId === "romantic-puzzle") {
      return {
        ...copy,
        romanticLoveItems: loveItems
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean)
          .slice(0, 24),
      };
    }

    if (templateId === "dog-scrapbook") {
      return {
        ...copy,
        dogFacts: dogFacts
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean)
          .slice(0, 12),
      };
    }

    return copy;
  }

  function resetAfterSave() {
    formRef.current?.reset();
    setRecipientName("");
    setSenderName("");
    setPasscode("");
    setMessage("");
    setRevealPhoto(null);
    setMemories([]);
    setMusic(null);
    setVoiceRecording(null);
    setCakeTheme("strawberry");
    setLoveItems(ROMANTIC_LOVE_ITEMS);
    setDogFacts(DOG_FACTS_DEFAULTS);
    setCopy(getTemplateCopyDefaults(templateId));
    setFinalMessage(getTemplateFinalMessage(templateId));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(null);

    if (templateId === "kawaii-unlock" && !revealPhoto) {
      setError("Main reveal photo is required.");
      return;
    }

    if (templateId === "romantic-puzzle" && memories.length < 4) {
      setError("Please upload at least 4 photos for the romantic template.");
      return;
    }

    if (templateId === "heart-year" && memories.length !== 3) {
      setError("Please upload exactly 3 photos for the heart template.");
      return;
    }


    if (templateId === "dog-scrapbook" && !revealPhoto) {
      setError("Main birthday photo is required for the dog scrapbook template.");
      return;
    }

    if (templateId === "dog-scrapbook" && memories.length < 4) {
      setError("Please upload at least 4 memory photos for the dog scrapbook template.");
      return;
    }

    const formData = new FormData();
    formData.append("templateId", templateId);
    formData.append("recipientName", recipientName);
    formData.append("senderName", senderName);
    if (templateId === "kawaii-unlock" || templateId === "dog-scrapbook") {
      formData.append("passcode", passcode);
    }
    formData.append("message", message);
    formData.append("cakeTheme", templateId === "kawaii-unlock" ? cakeTheme : "strawberry");
    formData.append("finalMessage", finalMessage);
    formData.append("copy", JSON.stringify(buildCopyPayload()));
    if ((templateId === "kawaii-unlock" || templateId === "dog-scrapbook") && revealPhoto) {
      formData.append("revealPhoto", revealPhoto);
    }
    memories.forEach((memory) => {
      formData.append("memories", memory.file);
      if (templateId === "kawaii-unlock" || templateId === "dog-scrapbook") {
        formData.append("memoryMessages", memory.message);
      }
    });
    if (music) formData.append("music", music);
    if (templateId === "kawaii-unlock" && voiceRecording) {
      formData.append("voiceRecording", voiceRecording);
    }

    startTransition(async () => {
      try {
        const result = await createBirthdayWish(formData);
        if (!result?.success || !result.slug) {
          setError(result?.error || "Could not create the birthday page.");
          return;
        }

        const shareUrl = `${window.location.origin}/birthday/${result.slug}`;
        setSaved({ slug: result.slug, shareUrl });
        resetAfterSave();
      } catch {
        setError("Could not create the birthday page. Please try again.");
        return;
      }
    });
  }

  async function copyShareUrl() {
    if (!saved) return;
    await navigator.clipboard.writeText(saved.shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="birthday-kawaii min-h-screen overflow-x-hidden bg-[#ffdae0] text-[#5c3a21]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,183,197,0.8)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,rgba(162,210,255,0.6)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(255,243,176,0.5)_0%,transparent_60%)]" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-[1420px] gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[0.85fr_1.25fr] lg:px-8">
        <aside className="flex flex-col justify-start pt-2 lg:sticky lg:top-0 lg:h-screen lg:pt-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#ffb7c5]/60 bg-white/60 px-4 py-2 text-sm font-black text-[#d35c82] shadow-sm">
            <Sparkles className="h-4 w-4 fill-[#d35c82]" />
            Build a birthday surprise
          </div>

          <h1 className="mt-5 text-[clamp(3rem,9vw,4.6rem)] font-black leading-none text-[#5c3a21]">
            Pick a cute <br />
            template and <br />
            make it yours
          </h1>

          <p className="mt-5 max-w-[470px] text-lg font-semibold leading-7 text-[#5c3a21]/90">
            Each template has its own form, text controls, photos, audio, and shareable route.
            The generated page is saved in the database and can be opened with its private link.
          </p>

          <div className="mt-7 grid gap-3">
            <TemplateCard
              active={templateId === "kawaii-unlock"}
              title="Kawaii Birthday Unlock"
              description="Cats, passcode, gift reveal, 3D memories, cake finale."
              icon={<Gift className="h-5 w-5" />}
              onClick={() => setTemplate("kawaii-unlock")}
            />
            <TemplateCard
              active={templateId === "romantic-puzzle"}
              title="Romantic Puzzle Birthday"
              description="Drag gift, love jar, letter puzzle, award, and gallery."
              icon={<Award className="h-5 w-5" />}
              onClick={() => setTemplate("romantic-puzzle")}
            />
            <TemplateCard
              active={templateId === "heart-year"}
              title="Heart Year Birthday"
              description="Milk-and-Mocha style screens with a 3-photo final heart."
              icon={<Heart className="h-5 w-5" />}
              onClick={() => setTemplate("heart-year")}
            />
            <TemplateCard
              active={templateId === "dog-scrapbook"}
              title="Dog Scrapbook Birthday"
              description="Secret code, gift choice, birthday reveal, memories, facts, and letter."
              icon={<Cake className="h-5 w-5" />}
              onClick={() => setTemplate("dog-scrapbook")}
            />
          </div>
        </aside>

        <div className="w-full">
          {saved ? (
            <div className="flex min-h-[640px] flex-col items-center justify-center rounded-[32px] bg-white p-6 text-center shadow-[0_20px_50px_rgba(92,58,33,0.08)] sm:p-12">
              <img src={`${ASSET}/open-gift.png`} alt="" className="sticker h-44 w-44 object-contain" />
              <h2 className="mt-4 text-4xl font-black text-[#9d3b5b]">Birthday page is ready</h2>
              <p className="mt-3 max-w-md text-base font-semibold leading-7 text-[#5c3a21]/80">
                Share this link. The URL uses the birthday name plus a short unique number.
              </p>
              <div className="mt-6 w-full max-w-lg break-all rounded-2xl border-2 border-[#ffb7c5]/40 bg-[#fff8fb] px-4 py-3 text-left text-sm font-bold text-[#5c3a21]">
                {saved.shareUrl}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={copyShareUrl} className="kawaii-btn mint">
                  <Copy className="h-5 w-5" />
                  {copied ? "Copied" : "Copy link"}
                </button>
                <a href={saved.shareUrl} target="_blank" rel="noreferrer" className="kawaii-btn blue">
                  <ExternalLink className="h-5 w-5" />
                  Open page
                </a>
                <button type="button" onClick={() => setSaved(null)} className="kawaii-btn purple">
                  Make another
                </button>
              </div>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-[32px] bg-white p-5 shadow-[0_20px_50px_rgba(92,58,33,0.08)] sm:p-8 lg:p-10"
            >
              <div className="mb-8 flex items-center gap-4 border-b-2 border-black/5 pb-6">
                <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl bg-[#ffb7c5]/20 text-[#d35c82]">
                  <Wand2 className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#d35c82]">
                    {getTemplateLabel(templateId)}
                  </p>
                  <h2 className="m-0 text-3xl font-black">Create the surprise</h2>
                </div>
              </div>

              <SectionTitle title="Basic details" />
              <div className="grid gap-5 md:grid-cols-2">
                <KawaiiField
                  label="Birthday person's name"
                  value={recipientName}
                  onChange={setRecipientName}
                  placeholder="e.g. Priya"
                  required
                />
                <KawaiiField
                  label={templateId === "kawaii-unlock" || templateId === "dog-scrapbook" ? "From" : "Your name / signature"}
                  value={senderName}
                  onChange={setSenderName}
                  placeholder={templateId === "heart-year" ? "e.g. Your name" : templateId === "kawaii-unlock" ? "e.g. Aniket" : "e.g. Rahul"}
                  required
                />
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {templateId === "kawaii-unlock" || templateId === "dog-scrapbook" ? (
                  <KawaiiField
                    label="Secret 4 digit code"
                    value={passcode}
                    onChange={(value) => setPasscode(value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="1807"
                    required
                    inputMode="numeric"
                    maxLength={4}
                  />
                ) : null}
                <KawaiiField
                  label={
                    templateId === "kawaii-unlock"
                      ? "Final goodbye message"
                      : templateId === "dog-scrapbook"
                        ? "Final collage message"
                      : templateId === "heart-year"
                        ? "Closing note"
                        : "Final gallery message"
                  }
                  value={finalMessage}
                  onChange={(value) => setFinalMessage(value.slice(0, 240))}
                  placeholder={
                    templateId === "heart-year"
                      ? "Have a great year ahead."
                      : "Here's a little reminder of how loved you are."
                  }
                  required
                  maxLength={240}
                />
              </div>

              {templateId === "kawaii-unlock" || templateId === "heart-year" || templateId === "dog-scrapbook" ? (
                <div className="mt-6">
                <label className="mb-2 block text-sm font-black text-[#5c3a21]">
                  {templateId === "heart-year"
                    ? "Wish message"
                    : templateId === "dog-scrapbook"
                      ? "With Love letter"
                      : "Main letter / birthday message"}
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.currentTarget.value)}
                  required
                  maxLength={1200}
                  rows={7}
                  placeholder={
                    templateId === "kawaii-unlock"
                      ? "Write the sweet message they will read after unlocking..."
                      : templateId === "dog-scrapbook"
                        ? "Write the longer birthday letter shown on the With Love screen..."
                      : "Write the birthday wish shown on the MY WISH FOR U screen..."
                  }
                  className="kawaii-input resize-none"
                />
                </div>
              ) : null}

              <SectionTitle title="Photos and audio" className="mt-8" />
              <div className={templateId === "kawaii-unlock" || templateId === "dog-scrapbook" ? "grid gap-5 md:grid-cols-2" : "grid gap-5"}>
                {templateId === "kawaii-unlock" || templateId === "dog-scrapbook" ? (
                  <div>
                    <label className="mb-2 block text-sm font-black text-[#5c3a21]">
                      {templateId === "dog-scrapbook" ? "Main Birthday Photo (required)" : "Main Reveal Photo (required)"}
                    </label>
                    <label className="upload-zone min-h-32 border-[#a2d2ff]/80 bg-[#a2d2ff]/10">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={(event) => handleRevealFile(event.currentTarget.files?.[0])}
                      />
                      {revealPreview ? (
                        <img src={revealPreview} alt="" className="h-24 w-24 rounded-2xl object-cover" />
                      ) : (
                        <Upload className="h-6 w-6 text-[#6daee9]" />
                      )}
                      <span className="text-sm font-bold">
                        {revealPhoto ? "Main photo uploaded" : "Click to upload main photo"}
                      </span>
                    </label>
                  </div>
                ) : null}

                <div className="grid gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-black text-[#5c3a21]">
                      Background Music (optional)
                    </label>
                    <label className="upload-zone border-[#c8b6ff]/60 bg-[#c8b6ff]/10">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(event) => handleMusicFile(event.currentTarget.files?.[0])}
                      />
                      <Music className="h-6 w-6 text-[#9b7cf3]" />
                      <span className="text-sm font-bold">
                        {music ? `Music uploaded: ${music.name}` : "Click to add music"}
                      </span>
                    </label>
                  </div>

                  {templateId === "kawaii-unlock" ? (
                    <div>
                      <label className="mb-2 block text-sm font-black text-[#5c3a21]">
                        Voice Message / HBD Song (optional)
                      </label>
                      <label className="upload-zone border-[#a2d2ff]/70 bg-[#a2d2ff]/10">
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(event) => handleVoiceFile(event.currentTarget.files?.[0])}
                        />
                        <Mic className="h-6 w-6 text-[#6daee9]" />
                        <span className="text-sm font-bold">
                          {voiceRecording ? `Voice uploaded: ${voiceRecording.name}` : "Upload a final voice note"}
                        </span>
                      </label>
                    </div>
                  ) : null}
                </div>
              </div>

              <MemoryUploader
                memories={memories}
                memoryPreviews={memoryPreviews}
                memoryInputRef={memoryInputRef}
                addMemories={addMemories}
                updateMemoryMessage={updateMemoryMessage}
                removeMemory={removeMemory}
                showMessages={templateId === "kawaii-unlock" || templateId === "dog-scrapbook"}
                title={
                  templateId === "kawaii-unlock"
                    ? "Memory photos"
                    : templateId === "heart-year"
                      ? "Final heart photos"
                      : templateId === "dog-scrapbook"
                        ? "Memory and final collage photos"
                      : "Photos for Explosion & Gallery"
                }
                helper={
                  templateId === "kawaii-unlock"
                    ? `Max ${MAX_MEMORIES} images. JPG, PNG, WebP.`
                    : templateId === "heart-year"
                      ? "Exactly 3 images. They fill the three heart pieces."
                      : templateId === "dog-scrapbook"
                        ? "At least 4, max 15 images. Add a caption to each memory."
                      : "At least 4, max 15 images. JPG, PNG, WebP."
                }
              />

              {templateId === "kawaii-unlock" ? (
                <KawaiiTemplateFields
                  copy={copy}
                  updateCopy={updateCopy}
                  cakeTheme={cakeTheme}
                  setCakeTheme={setCakeTheme}
                />
              ) : templateId === "romantic-puzzle" ? (
                <RomanticTemplateFields
                  copy={copy}
                  updateCopy={updateCopy}
                  loveItems={loveItems}
                  setLoveItems={setLoveItems}
                />
              ) : templateId === "heart-year" ? (
                <HeartTemplateFields copy={copy} updateCopy={updateCopy} />
              ) : (
                <DogTemplateFields
                  copy={copy}
                  updateCopy={updateCopy}
                  dogFacts={dogFacts}
                  setDogFacts={setDogFacts}
                />
              )}

              {revealPhoto && (
                <div className="mt-5 flex items-center gap-2 text-sm font-black text-[#2d9c5f]">
                  <CheckCircle className="h-5 w-5 fill-[#2d9c5f]" />
                  Main Reveal Photo uploaded
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl border-2 border-[#ffb7c5] bg-[#fff4f7] px-4 py-3 text-sm font-black text-[#9d3b5b]">
                  {error}
                </div>
              )}

              <button type="submit" className="kawaii-btn-solid mt-7" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Create birthday page"
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <KawaiiStyles />
      <BuilderStyles />
    </main>
  );
}

function TemplateCard({
  active,
  title,
  description,
  icon,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`template-card ${active ? "active" : ""}`}
    >
      <span>{icon}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </button>
  );
}

function SectionTitle({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`mb-4 flex items-center gap-2 text-lg font-black text-[#5c3a21] ${className}`}>
      <Heart className="h-5 w-5 fill-[#d35c82] text-[#d35c82]" />
      {title}
    </div>
  );
}

function MemoryUploader({
  memories,
  memoryPreviews,
  memoryInputRef,
  addMemories,
  updateMemoryMessage,
  removeMemory,
  showMessages,
  title,
  helper,
}: {
  memories: MemoryFile[];
  memoryPreviews: PreviewItem[];
  memoryInputRef: React.RefObject<HTMLInputElement>;
  addMemories: (files: FileList | File[]) => void;
  updateMemoryMessage: (index: number, value: string) => void;
  removeMemory: (index: number) => void;
  showMessages: boolean;
  title: string;
  helper: string;
}) {
  return (
    <div className="mt-7">
      <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
        <label className="text-sm font-black text-[#5c3a21]">{title}</label>
        <span className="text-xs font-bold text-[#5c3a21]/65">{helper}</span>
      </div>

      <button
        type="button"
        onClick={() => memoryInputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          addMemories(event.dataTransfer.files);
        }}
        className="upload-zone min-h-[120px]"
      >
        <ImageIcon className="h-8 w-8 text-[#d35c82]" />
        <span className="text-base font-black">Drag photos here or click to upload</span>
        {memories.length > 0 && (
          <span className="text-xs font-black text-[#2d9c5f]">{memories.length} images uploaded</span>
        )}
      </button>
      <input
        ref={memoryInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(event) => {
          if (event.currentTarget.files) addMemories(event.currentTarget.files);
          event.currentTarget.value = "";
        }}
      />

      {showMessages && memoryPreviews.length > 0 && (
        <div className="mt-6 flex max-h-[320px] flex-col gap-3 overflow-y-auto pr-1">
          <label className="text-sm font-black text-[#5c3a21]">Add a sweet message for each memory</label>
          {memoryPreviews.map((preview, index) => (
            <div
              key={`${preview.file.name}-${index}`}
              className="flex gap-3 rounded-2xl border border-[#ffb7c5]/40 bg-[#ffb7c5]/10 p-2"
            >
              <img src={preview.url} alt="" className="h-[60px] w-[60px] rounded-xl object-cover" />
              <input
                value={memories[index]?.message || ""}
                onChange={(event) => updateMemoryMessage(index, event.currentTarget.value)}
                className="kawaii-input flex-1 px-3 py-2 text-sm"
                placeholder="e.g. Remember this day?"
              />
              <button
                type="button"
                onClick={() => removeMemory(index)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#9d3b5b] shadow-sm"
                aria-label="Remove memory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function KawaiiTemplateFields({
  copy,
  updateCopy,
  cakeTheme,
  setCakeTheme,
}: {
  copy: CopyState;
  updateCopy: (key: string, value: string) => void;
  cakeTheme: string;
  setCakeTheme: (value: string) => void;
}) {
  return (
    <>
      <SectionTitle title="Kawaii screen text" className="mt-8" />
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ["entryTitle", "Intro title"],
          ["entryQuestion", "Intro question"],
          ["yesButton", "Yes button"],
          ["noButton", "No button"],
          ["noButtonMessage", "No button message"],
          ["passcodeTitle", "Passcode title"],
          ["wrongPasscodeTitle", "Wrong passcode title"],
          ["giftTitle", "Gift tap title"],
          ["revealTitle", "Birthday reveal title"],
          ["letterTitle", "Letter title"],
          ["cakePromptTitle", "Cake prompt title"],
          ["finaleTitle", "Finale title"],
        ].map(([key, label]) => (
          <KawaiiField
            key={key}
            label={label}
            value={copy[key] || ""}
            onChange={(value) => updateCopy(key, value)}
            placeholder={KAWAII_COPY_DEFAULTS[key as keyof typeof KAWAII_COPY_DEFAULTS]}
          />
        ))}
      </div>

      <SectionTitle title="Cake finale" className="mt-8" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { id: "strawberry", name: "Strawberry", filter: "none" },
          {
            id: "chocolate",
            name: "Chocolate",
            filter: "sepia(0.8) saturate(1.5) hue-rotate(-20deg) brightness(0.65)",
          },
          {
            id: "matcha",
            name: "Matcha",
            filter: "sepia(0.5) hue-rotate(60deg) saturate(1.2)",
          },
          { id: "taro", name: "Taro", filter: "hue-rotate(-50deg) saturate(1.2)" },
        ].map((cake) => {
          const selected = cakeTheme === cake.id;

          return (
            <button
              key={cake.id}
              type="button"
              onClick={() => setCakeTheme(cake.id)}
              className={`cake-choice ${selected ? "selected" : ""}`}
            >
              <img
                src={`${ASSET}/birthday-cake.png`}
                alt=""
                className="mx-auto h-20 w-20 object-contain"
                style={{ filter: cake.filter }}
              />
              <span>{cake.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function RomanticTemplateFields({
  copy,
  updateCopy,
  loveItems,
  setLoveItems,
}: {
  copy: CopyState;
  updateCopy: (key: string, value: string) => void;
  loveItems: string;
  setLoveItems: (value: string) => void;
}) {
  return (
    <>
      <SectionTitle title="Romantic template screens" className="mt-8" />
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ["romanticSurpriseTitle", "Intro title"],
          ["romanticSurpriseButton", "Intro button"],
          ["romanticDragTitle", "Drag screen title"],
          ["romanticCuteBanner", "Drag banner text"],
          ["romanticJarTitle", "Love jar title"],
          ["romanticPuzzleTitle", "Puzzle title"],
          ["romanticPuzzleHint", "Puzzle hint"],
          ["romanticAwardTitle", "Award title"],
          ["romanticAwardButton", "Award button"],
          ["romanticGalleryTitle", "Gallery title"],
          ["romanticRestartButton", "Restart button"],
        ].map(([key, label]) => (
          <KawaiiField
            key={key}
            label={label}
            value={copy[key] || ""}
            onChange={(value) => updateCopy(key, value)}
            placeholder={ROMANTIC_COPY_DEFAULTS[key as keyof typeof ROMANTIC_COPY_DEFAULTS]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-black text-[#5c3a21]">
            Love jar items
          </label>
          <textarea
            value={loveItems}
            onChange={(event) => setLoveItems(event.currentTarget.value)}
            rows={8}
            className="kawaii-input resize-none"
            placeholder="One small item per line"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-black text-[#5c3a21]">
            Award body text
          </label>
          <textarea
            value={copy.romanticAwardBody || ""}
            onChange={(event) => updateCopy("romanticAwardBody", event.currentTarget.value)}
            rows={8}
            className="kawaii-input resize-none"
            placeholder={ROMANTIC_COPY_DEFAULTS.romanticAwardBody}
          />
        </div>
      </div>
    </>
  );
}

function HeartTemplateFields({
  copy,
  updateCopy,
}: {
  copy: CopyState;
  updateCopy: (key: string, value: string) => void;
}) {
  return (
    <>
      <SectionTitle title="Heart template screens" className="mt-8" />
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ["heartIntroTitle", "Intro title"],
          ["heartYesButton", "Yes button"],
          ["heartNoButton", "No button"],
          ["heartWrongTitle", "Wrong choice title"],
          ["heartTryAgainButton", "Try again button"],
          ["heartBirthdayTitle", "Birthday title"],
          ["heartBirthdayCaption", "Birthday caption"],
          ["heartBirthdayButton", "Birthday button"],
          ["heartWishTitle", "Wish screen title"],
          ["heartWishButton", "Wish button"],
          ["heartHugTitle", "Hug title"],
          ["heartHugCaption", "Hug caption"],
          ["heartHugButton", "Hug button"],
          ["heartFinalTitle", "Final heart title"],
          ["heartFinalDate", "Final date text"],
        ].map(([key, label]) => (
          <KawaiiField
            key={key}
            label={label}
            value={copy[key] || ""}
            onChange={(value) => updateCopy(key, value)}
            placeholder={HEART_COPY_DEFAULTS[key as keyof typeof HEART_COPY_DEFAULTS]}
          />
        ))}
      </div>
    </>
  );
}

function DogTemplateFields({
  copy,
  updateCopy,
  dogFacts,
  setDogFacts,
}: {
  copy: CopyState;
  updateCopy: (key: string, value: string) => void;
  dogFacts: string;
  setDogFacts: (value: string) => void;
}) {
  return (
    <>
      <SectionTitle title="Dog scrapbook screens" className="mt-8" />
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ["dogGiftTitle", "Gift question"],
          ["dogYesButton", "Yes button"],
          ["dogNoButton", "No button"],
          ["dogWrongChoiceTitle", "Wrong choice title"],
          ["dogTryAgainButton", "Try again button"],
          ["dogBirthdayTitle", "Birthday reveal title"],
          ["dogBirthdaySubtitle", "Birthday reveal subtitle"],
          ["dogMemoriesTitle", "Memories title"],
          ["dogMemoriesSubtitle", "Memories search text"],
          ["dogFactsTitle", "Facts title"],
          ["dogLetterTitle", "Letter title"],
          ["dogFinalTitle", "Final collage title"],
          ["dogRestartButton", "Restart button"],
        ].map(([key, label]) => (
          <KawaiiField
            key={key}
            label={label}
            value={copy[key] || ""}
            onChange={(value) => updateCopy(key, value)}
            placeholder={DOG_COPY_DEFAULTS[key as keyof typeof DOG_COPY_DEFAULTS]}
          />
        ))}
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-black text-[#5c3a21]">
          Fun facts about the birthday person
        </label>
        <textarea
          value={dogFacts}
          onChange={(event) => setDogFacts(event.currentTarget.value)}
          rows={8}
          maxLength={1000}
          className="kawaii-input resize-none"
          placeholder="One short fact per line"
        />
        <p className="mt-2 text-xs font-bold text-[#5c3a21]/65">One fact per line, up to 12 facts.</p>
      </div>
    </>
  );
}

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!file) {
      setUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
}

function KawaiiField({
  label,
  value,
  onChange,
  placeholder,
  required,
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-[#5c3a21]">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        required={required}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        className="kawaii-input"
      />
    </div>
  );
}

export function KawaiiStyles() {
  return (
    <style jsx global>{`
      .birthday-kawaii {
        --kawaii-pink: #ffb7c5;
        --kawaii-blue: #a2d2ff;
        --kawaii-yellow: #fff3b0;
        --kawaii-mint: #b9fbc0;
        --kawaii-purple: #c8b6ff;
        font-family: "Comic Sans MS", "Trebuchet MS", "Arial Rounded MT Bold", system-ui, sans-serif;
      }

      .birthday-kawaii h1,
      .birthday-kawaii h2,
      .birthday-kawaii h3,
      .birthday-kawaii button,
      .birthday-kawaii a {
        font-family: "Comic Sans MS", "Trebuchet MS", "Arial Rounded MT Bold", system-ui, sans-serif;
        letter-spacing: 0;
      }

      .birthday-kawaii .sticker {
        filter: drop-shadow(0 10px 15px rgba(92, 58, 33, 0.15));
        will-change: transform;
      }

      .birthday-kawaii .kawaii-input {
        width: 100%;
        border: 2px solid rgba(92, 58, 33, 0.08);
        border-radius: 16px;
        background: #fff;
        padding: 1rem 1.2rem;
        color: #5c3a21;
        font: inherit;
        font-size: 1rem;
        font-weight: 700;
        box-shadow: inset 0 2px 5px rgba(92, 58, 33, 0.03);
        transition: all 0.2s ease;
      }

      .birthday-kawaii .kawaii-input:focus {
        outline: none;
        border-color: var(--kawaii-pink);
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.22);
      }

      .birthday-kawaii .upload-zone {
        display: flex;
        width: 100%;
        cursor: pointer;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border: 2px dashed rgba(255, 183, 197, 0.85);
        border-radius: 20px;
        background: rgba(255, 183, 197, 0.08);
        padding: 1.5rem;
        text-align: center;
        color: #5c3a21;
        transition: all 0.2s ease;
      }

      .birthday-kawaii .upload-zone:hover {
        background: rgba(255, 183, 197, 0.16);
      }

      .birthday-kawaii .upload-zone input[type="file"] {
        display: none;
      }

      .birthday-kawaii .kawaii-btn {
        position: relative;
        display: inline-flex;
        min-height: 52px;
        align-items: center;
        justify-content: center;
        gap: 0.7rem;
        overflow: hidden;
        border: 0;
        border-radius: 999px;
        padding: 0.9rem 1.7rem;
        color: #5c3a21;
        font-size: 1rem;
        font-weight: 900;
        box-shadow: 0 8px 0 rgba(92, 58, 33, 0.1), 0 15px 20px rgba(92, 58, 33, 0.05);
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .birthday-kawaii .kawaii-btn::after {
        content: "";
        position: absolute;
        inset: 0 0 50%;
        border-radius: 999px 999px 0 0;
        background: linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0));
        pointer-events: none;
      }

      .birthday-kawaii .kawaii-btn:hover {
        transform: translateY(2px);
        box-shadow: 0 6px 0 rgba(92, 58, 33, 0.1), 0 10px 15px rgba(92, 58, 33, 0.05);
      }

      .birthday-kawaii .kawaii-btn:active {
        transform: translateY(8px);
        box-shadow: 0 0 0 rgba(92, 58, 33, 0.1);
      }

      .birthday-kawaii .kawaii-btn.blue {
        background: var(--kawaii-blue);
      }

      .birthday-kawaii .kawaii-btn.mint {
        background: var(--kawaii-mint);
      }

      .birthday-kawaii .kawaii-btn.purple {
        background: var(--kawaii-purple);
      }

      .birthday-kawaii .kawaii-btn-solid {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 0.7rem;
        border: 0;
        border-radius: 24px;
        background: #9d3b5b;
        padding: 1.2rem;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 900;
        box-shadow: 0 10px 20px rgba(157, 59, 91, 0.3);
        transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
      }

      .birthday-kawaii .kawaii-btn-solid:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 15px 25px rgba(157, 59, 91, 0.4);
      }

      .birthday-kawaii .kawaii-btn-solid:disabled {
        cursor: not-allowed;
        opacity: 0.65;
      }

      @media (max-width: 640px) {
        .birthday-kawaii .kawaii-btn {
          width: 100%;
        }
      }
    `}</style>
  );
}

function BuilderStyles() {
  return (
    <style jsx global>{`
      .birthday-kawaii .template-card {
        display: grid;
        grid-template-columns: 46px 1fr;
        gap: 4px 14px;
        align-items: center;
        border: 2px solid rgba(255, 255, 255, 0.72);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.6);
        padding: 16px;
        text-align: left;
        color: #5c3a21;
        box-shadow: 0 10px 24px rgba(92, 58, 33, 0.06);
        transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
      }

      .birthday-kawaii .template-card:hover,
      .birthday-kawaii .template-card.active {
        transform: translateY(-2px);
        border-color: #ff8da1;
        background: #fff;
      }

      .birthday-kawaii .template-card span {
        display: flex;
        grid-row: span 2;
        height: 46px;
        width: 46px;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        background: #ffb7c5;
        color: #9d3b5b;
      }

      .birthday-kawaii .template-card strong {
        font-size: 1rem;
        font-weight: 900;
      }

      .birthday-kawaii .template-card small {
        color: rgba(92, 58, 33, 0.72);
        font-weight: 800;
        line-height: 1.4;
      }

      .birthday-kawaii .cake-choice {
        border: 2px solid rgba(92, 58, 33, 0.06);
        border-radius: 18px;
        background: #fff;
        padding: 12px;
        color: #5c3a21;
        text-align: center;
        transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
      }

      .birthday-kawaii .cake-choice.selected {
        transform: translateY(-2px);
        border-color: #ff8da1;
        background: #ffb7c5;
        color: #fff;
        box-shadow: 0 12px 24px rgba(157, 59, 91, 0.18);
      }

      .birthday-kawaii .cake-choice span {
        margin-top: 8px;
        display: block;
        font-size: 0.9rem;
        font-weight: 900;
      }
    `}</style>
  );
}
