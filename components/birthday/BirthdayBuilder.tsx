"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  CheckCircle,
  Copy,
  Cake,
  ExternalLink,
  ImageIcon,
  Loader2,
  Mic,
  Music,
  Sparkles,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import { createBirthdayWish } from "@/lib/birthday-actions";

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

export default function BirthdayBuilder() {
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
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedState | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const memoryInputRef = useRef<HTMLInputElement>(null);

  const revealPreview = useObjectUrl(revealPhoto);
  const musicName = music?.name || "";
  const voiceName = voiceRecording?.name || "";
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
    if (file.size > MAX_AUDIO_MB * 1024 * 1024) return `Music file must be under ${MAX_AUDIO_MB} MB.`;
    return null;
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
    setMemories((current) => [...current, ...accepted].slice(0, MAX_MEMORIES));
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(null);

    if (!revealPhoto) {
      setError("Main reveal photo is required.");
      return;
    }

    const formData = new FormData();
    formData.append("templateId", "kawaii-unlock");
    formData.append("recipientName", recipientName);
    formData.append("senderName", senderName);
    formData.append("passcode", passcode);
    formData.append("message", message);
    formData.append("cakeTheme", cakeTheme);
    formData.append("finalMessage", finalMessage);
    formData.append("revealPhoto", revealPhoto);
    memories.forEach((memory) => {
      formData.append("memories", memory.file);
      formData.append("memoryMessages", memory.message);
    });
    if (music) formData.append("music", music);
    if (voiceRecording) formData.append("voiceRecording", voiceRecording);

    startTransition(async () => {
      const result = await createBirthdayWish(formData);
      if (!result.success || !result.slug) {
        setError(result.error || "Could not create the birthday page.");
        return;
      }

      const shareUrl = `${window.location.origin}/birthday/${result.slug}`;
      setSaved({ slug: result.slug, shareUrl });
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
      setFinalMessage("Thank you for celebrating with me!");
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

      <section className="relative mx-auto grid min-h-screen w-full max-w-[1400px] gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="flex flex-col justify-start pt-2 lg:pt-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#ffb7c5]/60 bg-white/60 px-4 py-2 text-sm font-black text-[#d35c82] shadow-sm">
            <Sparkles className="h-4 w-4 fill-[#d35c82]" />
            Make a tiny birthday surprise
          </div>

          <h1 className="mt-5 text-[clamp(3rem,9vw,4.5rem)] font-black leading-none text-[#5c3a21]">
            Build a cute <br />
            birthday page <br />
            in minutes
          </h1>

          <p className="mt-5 max-w-[450px] text-lg font-semibold leading-7 text-[#5c3a21]/90">
            Add names, a secret 4 digit code, a sweet note, and photos. We make a shareable
            kawaii birthday page with a gift reveal, passcode unlock, letter, and memories.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {["Passcode", "Letter", "Memories"].map((pill) => (
              <div
                key={pill}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#5c3a21] shadow-[0_4px_10px_rgba(92,58,33,0.05)]"
              >
                {pill}
              </div>
            ))}
          </div>

          <div className="relative mt-10 hidden max-w-[450px] sm:block">
            <div className="relative z-[2] overflow-hidden rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(92,58,33,0.08)]">
              <div className="absolute inset-0 bg-[#ffb7c5]/15" />
              <div className="relative z-[3]">
                <p className="mb-2 text-sm font-black uppercase tracking-[0.12em] text-[#d35c82]">
                  Template 01
                </p>
                <h2 className="mb-2 text-2xl font-black">Kawaii Birthday Unlock</h2>
                <p className="text-sm font-semibold leading-6 text-[#5c3a21]/80">
                  Soft pink cards, cats, gift surprise, secret code, and scrapbook memories.
                </p>
              </div>
            </div>
            <img
              src={`${ASSET}/happy-cat.png`}
              alt=""
              className="birthday-float sticker absolute -right-10 top-2 z-10 h-[110px] w-[110px] object-contain"
            />
          </div>
        </div>

        <div className="w-full">
          {saved ? (
            <div className="flex min-h-[640px] flex-col items-center justify-center rounded-[32px] bg-white p-6 text-center shadow-[0_20px_50px_rgba(92,58,33,0.08)] sm:p-12">
              <img src={`${ASSET}/open-gift.png`} alt="" className="sticker h-44 w-44 object-contain" />
              <h2 className="mt-4 text-4xl font-black text-[#9d3b5b]">Birthday page is ready</h2>
              <p className="mt-3 max-w-md text-base font-semibold leading-7 text-[#5c3a21]/80">
                Share this link. The URL now uses the birthday name plus a short unique number.
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
              className="rounded-[32px] bg-white p-5 shadow-[0_20px_50px_rgba(92,58,33,0.08)] sm:p-8 lg:p-12"
            >
              <div className="mb-8 flex items-center gap-4 border-b-2 border-black/5 pb-6">
                <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl bg-[#ffb7c5]/20 text-[#d35c82]">
                  <Wand2 className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#d35c82]">
                    Kawaii Birthday Unlock
                  </p>
                  <h2 className="m-0 text-3xl font-black">Create the surprise</h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <KawaiiField
                  label="Birthday person's name"
                  value={recipientName}
                  onChange={setRecipientName}
                  placeholder="e.g. Priya"
                  required
                />
                <KawaiiField
                  label="From"
                  value={senderName}
                  onChange={setSenderName}
                  placeholder="e.g. Aniket"
                  required
                />
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-5">
                  <KawaiiField
                    label="Secret 4 digit code"
                    value={passcode}
                    onChange={(value) => setPasscode(value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="1807"
                    required
                    inputMode="numeric"
                    maxLength={4}
                  />

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
                        {musicName ? `Music uploaded: ${musicName}` : "Click to add an mp3"}
                      </span>
                    </label>
                  </div>

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
                        {voiceName ? `Voice uploaded: ${voiceName}` : "Upload a final voice note"}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black text-[#5c3a21]">
                      Main Reveal Photo (required)
                    </label>
                    <label className="upload-zone min-h-24 border-[#a2d2ff]/80 bg-[#a2d2ff]/10">
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
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-[#5c3a21]">Birthday letter</label>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.currentTarget.value)}
                    required
                    maxLength={1200}
                    rows={8}
                    placeholder="Write the sweet message they will read after unlocking..."
                    className="kawaii-input min-h-[224px] resize-none"
                  />

                  <label className="mb-2 mt-5 block text-sm font-black text-[#5c3a21]">
                    Final goodbye message
                  </label>
                  <textarea
                    value={finalMessage}
                    onChange={(event) => setFinalMessage(event.currentTarget.value.slice(0, 240))}
                    maxLength={240}
                    rows={3}
                    placeholder="Thank you for celebrating with me!"
                    className="kawaii-input resize-none"
                  />
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-3 flex items-center justify-center gap-2 text-center text-lg font-black text-[#5c3a21]">
                  <Cake className="h-5 w-5 text-[#d35c82]" />
                  Choose the finale cake
                </div>
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
                        className={`rounded-2xl border-2 p-3 text-center transition ${
                          selected
                            ? "scale-[1.03] border-[#ff8da1] bg-[#ffb7c5] text-white shadow-[0_10px_20px_rgba(157,59,91,0.18)]"
                            : "border-black/5 bg-white text-[#5c3a21] hover:border-[#ffb7c5]"
                        }`}
                      >
                        <img
                          src={`${ASSET}/birthday-cake.png`}
                          alt=""
                          className="mx-auto h-20 w-20 object-contain"
                          style={{ filter: cake.filter }}
                        />
                        <span className="mt-2 block text-sm font-black">{cake.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
                  <label className="text-sm font-black text-[#5c3a21]">
                    Memory photos
                  </label>
                  <span className="text-xs font-bold text-[#5c3a21]/65">
                    Max {MAX_MEMORIES} images. JPG, PNG, WebP.
                  </span>
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
                    <span className="text-xs font-black text-[#2d9c5f]">
                      {memories.length} images uploaded
                    </span>
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
              </div>

              {memoryPreviews.length > 0 && (
                <div className="mt-6 flex max-h-[320px] flex-col gap-3 overflow-y-auto pr-1">
                  <label className="text-sm font-black text-[#5c3a21]">
                    Add a sweet message for each memory
                  </label>
                  {memoryPreviews.map((preview: PreviewItem, index) => (
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
    </main>
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

      .birthday-kawaii .birthday-float {
        animation: birthday-float 2.5s ease-in-out infinite alternate;
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

      @keyframes birthday-float {
        from {
          transform: translateY(0) rotate(-2deg);
        }
        to {
          transform: translateY(-10px) rotate(3deg);
        }
      }

      @media (max-width: 640px) {
        .birthday-kawaii .kawaii-btn {
          width: 100%;
        }
      }
    `}</style>
  );
}
