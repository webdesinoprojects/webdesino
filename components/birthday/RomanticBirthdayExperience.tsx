"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, Download, Heart, RefreshCcw } from "lucide-react";
import type { BirthdayWish } from "@/lib/birthday-actions";

const ASSET = "/birthday/assets/template2";

type Step = "intro" | "gift" | "jar" | "puzzle" | "award" | "gallery";

type DragPosition = {
  x: number;
  y: number;
};

type PuzzlePiece = {
  id: number;
  pos: DragPosition;
  target: DragPosition;
  snapped: boolean;
};

type PuzzleDragFrame = {
  baseLeft: number;
  baseTop: number;
  offsetX: number;
  offsetY: number;
};

export default function RomanticBirthdayExperience({ wish }: { wish: BirthdayWish }) {
  const [step, setStep] = useState<Step>("intro");
  const [revealedJarItems, setRevealedJarItems] = useState<Set<number>>(() => new Set());
  const audioRef = useRef<HTMLAudioElement>(null);

  const memories = wish.memories?.length ? wish.memories : wish.photos.slice(1);
  const revealPhoto = wish.revealPhoto?.url || wish.photos[0]?.url || "";
  const text = (key: string, fallback: string) => getCopyText(wish, key, fallback);
  const list = (key: string, fallback: string[]) => getCopyList(wish, key, fallback);
  const jarTitle = text("romanticJarTitle", "Everything I love about you");
  const certificateDate = formatCertificateDate(wish.createdAt);
  const certificateSignature =
    wish.senderName && wish.senderName !== "Someone" && wish.senderName !== wish.recipientName ? wish.senderName : "With love";

  function playAudio() {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio.play().catch(() => undefined);
  }

  return (
    <main className="romantic-birthday min-h-screen overflow-hidden bg-[#fff0f3] text-[#641d2c]">
      {wish.music?.url ? <audio ref={audioRef} src={wish.music.url} loop /> : null}

      {step === "intro" && (
        <RomanticScreen className="bg-[radial-gradient(circle_at_center,#ffe2e9_0%,#ffffff_72%)]">
          <div className="romantic-card intro-card">
            <h1>{text("romanticSurpriseTitle", "SURPRISE AWAITING")}</h1>
            <img src={`${ASSET}/img-1.png`} alt="" className="intro-cat" />
            <button
              type="button"
              className="romantic-button red"
              onClick={() => {
                playAudio();
                setStep("gift");
              }}
            >
              {text("romanticSurpriseButton", "Open Surprise")}
            </button>
          </div>
        </RomanticScreen>
      )}

      {step === "gift" && (
        <GiftDragScreen
          wish={wish}
          memories={memories}
          onComplete={() => setStep("jar")}
          playAudio={playAudio}
        />
      )}

      {step === "jar" && (
        <RomanticScreen className="jar-screen">
          <div className="flower-border" />
          <div className="jar-layout">
            <div className="love-jar">
              <span className="jar-lid" />
              <span className="jar-bow" />
              {list("romanticLoveItems", [
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
              ]).map((item, index) => {
                const revealed = revealedJarItems.has(index);

                return (
                  <button
                    type="button"
                    key={`${item}-${index}`}
                    className={`jar-heart shape-${index % 5} ${revealed ? "revealed" : ""}`}
                    style={{ transform: `rotate(${index % 2 ? -10 : 9}deg)` }}
                    aria-label={revealed ? item : `Reveal reason ${index + 1}`}
                    onClick={() => {
                      setRevealedJarItems((current) => {
                        const next = new Set(current);
                        next.add(index);
                        return next;
                      });
                    }}
                  >
                    <span>{revealed ? item : "?"}</span>
                  </button>
                );
              })}
            </div>

            <div className="jar-copy">
              <div className="jar-copy-main">
                <h1>
                  {jarTitle.trim().toLowerCase() === "everything i love about you" ? (
                    <>
                      Everything I
                      <br />
                      love about
                      <br />
                      you
                    </>
                  ) : (
                    jarTitle
                  )}
                </h1>
                <p>{text("romanticJarSubtitle", "A tiny jar filled with the sweetest little reasons.")}</p>
              </div>
              <button type="button" className="romantic-button white" onClick={() => setStep("puzzle")}>
                {text("romanticJarButton", "Next")} <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </RomanticScreen>
      )}

      {step === "puzzle" && (
        <LetterPuzzleScreen
          wish={wish}
          onComplete={() => setStep("award")}
          text={text}
        />
      )}

      {step === "award" && (
        <RomanticScreen className="award-screen">
          <div className="award-stage">
            <button
              type="button"
              className="award-card"
              aria-label={text("romanticAwardButton", "Open Gallery")}
              onClick={() => setStep("gallery")}
            >
              <span className="award-recipient">{wish.recipientName}</span>
              <span className="award-date">{certificateDate}</span>
              <span className="award-signature">{certificateSignature}</span>
              <span className="award-next" aria-hidden="true">
                <ArrowRight className="h-6 w-6" />
              </span>
            </button>
            <button
              type="button"
              className="award-download"
              aria-label="Download certificate"
              onClick={() => downloadCertificate(wish.recipientName, certificateDate, certificateSignature)}
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </RomanticScreen>
      )}

      {step === "gallery" && (
        <RomanticGallery
          wish={wish}
          memories={memories}
          revealPhoto={revealPhoto}
          onRestart={() => {
            setStep("intro");
          }}
          text={text}
        />
      )}

      <RomanticStyles />
    </main>
  );
}

function GiftDragScreen({
  wish,
  memories,
  onComplete,
  playAudio,
}: {
  wish: BirthdayWish;
  memories: BirthdayWish["memories"];
  onComplete: () => void;
  playAudio: () => void;
}) {
  const [dragPos, setDragPos] = useState<DragPosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const signRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<DragPosition>({ x: 0, y: 0 });
  const text = (key: string, fallback: string) => getCopyText(wish, key, fallback);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (isExploding) return;
    playAudio();
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    startPos.current = {
      x: event.clientX - dragPos.x,
      y: event.clientY - dragPos.y,
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDragPos({
      x: event.clientX - startPos.current.x,
      y: event.clientY - startPos.current.y,
    });
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);

    if (!signRef.current || !heartRef.current) return;
    const signRect = signRef.current.getBoundingClientRect();
    const heartRect = heartRef.current.getBoundingClientRect();
    const signX = signRect.left + signRect.width / 2;
    const signY = signRect.top + signRect.height / 2;
    const heartX = heartRect.left + heartRect.width / 2;
    const heartY = heartRect.top + heartRect.height / 2;
    const distance = Math.hypot(signX - heartX, signY - heartY);

    if (distance < heartRect.width / 2 + 70) {
      setIsExploding(true);
      launchSoftConfetti("romantic-explosion-layer", memories);
      window.setTimeout(onComplete, 2600);
      return;
    }

    setDragPos({ x: 0, y: 0 });
  }

  return (
    <RomanticScreen className="gift-drag-screen">
      <h1 className="gift-title">{text("romanticDragTitle", "Drag the CUTE banner to the gift!")}</h1>
      <div
        ref={signRef}
        className={`cute-sign ${isDragging ? "dragging" : ""} ${isExploding ? "hidden" : ""}`}
        style={{ transform: `translate(${dragPos.x}px, ${dragPos.y}px) rotate(-5deg)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <span>{text("romanticCuteBanner", "CUTE")}</span>
        <i />
      </div>

      <div ref={heartRef} className={`heart-gift ${isExploding ? "explode" : ""}`}>
        <img src={`${ASSET}/img-2.webp`} alt="" />
      </div>
    </RomanticScreen>
  );
}

function getInitialPuzzlePieces(isCompact: boolean): PuzzlePiece[] {
  if (isCompact) {
    return [
      { id: 1, pos: { x: -112, y: -218 }, target: { x: -58, y: -58 }, snapped: false },
      { id: 2, pos: { x: 112, y: -218 }, target: { x: 58, y: -58 }, snapped: false },
      { id: 3, pos: { x: -112, y: 214 }, target: { x: -58, y: 58 }, snapped: false },
      { id: 4, pos: { x: 112, y: 214 }, target: { x: 58, y: 58 }, snapped: false },
    ];
  }

  return [
    { id: 1, pos: { x: 70, y: 255 }, target: { x: -85, y: -85 }, snapped: false },
    { id: 2, pos: { x: -315, y: 190 }, target: { x: 85, y: -85 }, snapped: false },
    { id: 3, pos: { x: 310, y: -120 }, target: { x: -85, y: 85 }, snapped: false },
    { id: 4, pos: { x: -330, y: -70 }, target: { x: 85, y: 85 }, snapped: false },
  ];
}

function LetterPuzzleScreen({
  wish,
  onComplete,
  text,
}: {
  wish: BirthdayWish;
  onComplete: () => void;
  text: (key: string, fallback: string) => string;
}) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>(() =>
    getInitialPuzzlePieces(typeof window !== "undefined" && window.matchMedia("(max-width: 780px)").matches)
  );
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const dragFrameRef = useRef<PuzzleDragFrame | null>(null);
  const messageParts = splitIntoParts(wish.message, 4);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>, id: number) {
    if (done) return;
    const piece = pieces.find((item) => item.id === id);
    if (!piece || piece.snapped) return;

    setDraggingId(id);
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = event.currentTarget.getBoundingClientRect();
    dragFrameRef.current = {
      baseLeft: rect.left - piece.pos.x,
      baseTop: rect.top - piece.pos.y,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (draggingId == null) return;
    const dragFrame = dragFrameRef.current;
    if (!dragFrame) return;
    setPieces((current) =>
      current.map((piece) =>
        piece.id === draggingId
          ? {
              ...piece,
              pos: {
                x: event.clientX - dragFrame.baseLeft - dragFrame.offsetX,
                y: event.clientY - dragFrame.baseTop - dragFrame.offsetY,
              },
            }
          : piece
      )
    );
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>, id: number) {
    if (draggingId == null) return;
    setDraggingId(null);
    dragFrameRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);

    setPieces((current) => {
      const next = current.map((piece) => {
        if (piece.id !== id) return piece;
        const distance = Math.hypot(piece.pos.x - piece.target.x, piece.pos.y - piece.target.y);
        if (distance < 85) return { ...piece, pos: piece.target, snapped: true };
        return piece;
      });

      if (!done && next.every((piece) => piece.snapped)) {
        setDone(true);
        launchSoftConfetti("romantic-puzzle-confetti", []);
      }

      return next;
    });
  }

  return (
    <RomanticScreen className="puzzle-screen">
      <h1 className="puzzle-title">{text("romanticPuzzleTitle", "Assemble the letter")}</h1>
      <p className="puzzle-hint">{text("romanticPuzzleHint", "Drag each piece into the dotted letter box.")}</p>

      <div ref={boardRef} className="puzzle-board">
        <div className="puzzle-target">
          <span>{text("romanticPuzzleTarget", "Letter goes here")}</span>
        </div>

        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            className={`letter-piece ${piece.snapped ? "snapped" : ""}`}
            style={{
              transform: `translate(${piece.pos.x}px, ${piece.pos.y}px) rotate(${
                piece.snapped ? 0 : piece.id * 15 - 30
              }deg)`,
              zIndex: draggingId === piece.id ? 30 : piece.snapped ? 8 : 12,
              borderRadius: piece.id === 1 ? '15px 5px 5px 5px' : piece.id === 2 ? '5px 15px 5px 5px' : piece.id === 3 ? '5px 5px 5px 15px' : '5px 5px 15px 5px',
            }}
            onPointerDown={(event) => handlePointerDown(event, piece.id)}
            onPointerMove={handlePointerMove}
            onPointerUp={(event) => handlePointerUp(event, piece.id)}
          >
            {messageParts[index]}
          </div>
        ))}

        <img src={`${ASSET}/image-4.png`} alt="" className="puzzle-dino" />
      </div>

      {done ? (
        <button type="button" className="romantic-button red puzzle-next" onClick={onComplete}>
          {text("romanticPuzzleButton", "Open Award")} <ArrowRight className="h-5 w-5" />
        </button>
      ) : null}
    </RomanticScreen>
  );
}

function RomanticGallery({
  wish,
  memories,
  revealPhoto,
  onRestart,
  text,
}: {
  wish: BirthdayWish;
  memories: BirthdayWish["memories"];
  revealPhoto: string;
  onRestart: () => void;
  text: (key: string, fallback: string) => string;
}) {
  const photos = useMemo(
    () =>
      [
        revealPhoto
          ? {
              url: revealPhoto,
              caption: text("romanticGalleryRevealCaption", "The first little surprise"),
            }
          : null,
        ...memories.map((memory, index) => ({
          url: memory.url,
          caption: memory.message?.trim() || `Memory ${index + 1}`,
        })),
      ]
        .filter((photo): photo is { url: string; caption: string } => Boolean(photo?.url))
        .slice(0, 15),
    [memories, revealPhoto, text]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ url: string; caption: string } | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const wheelLockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const planeLayout = useMemo(
    () =>
      photos.map((_, index) => ({
        x: ((index % 3) - 1) * 118,
        y: index % 2 === 0 ? -28 : 34,
        rotate: ((index % 5) - 2) * 2.5,
      })),
    [photos]
  );

  const moveGallery = (direction: number) => {
    setActiveIndex((current) => {
      if (!photos.length) return 0;
      return Math.min(Math.max(current + direction, 0), photos.length - 1);
    });
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (photos.length < 2) return;
    event.preventDefault();
    if (wheelLockRef.current) return;
    wheelLockRef.current = true;
    moveGallery(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 520);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartYRef.current === null) return;
    const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
    const diff = touchStartYRef.current - endY;
    if (Math.abs(diff) > 36) moveGallery(diff > 0 ? 1 : -1);
    touchStartYRef.current = null;
  };

  return (
    <RomanticScreen className="gallery-screen">
      <div
        className="depth-gallery-shell"
        tabIndex={0}
        onWheel={handleWheel}
        onPointerMove={handlePointerMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={(event) => {
          if (event.key === "Escape") setLightboxPhoto(null);
          if (event.key === "ArrowDown" || event.key === "ArrowRight") moveGallery(1);
          if (event.key === "ArrowUp" || event.key === "ArrowLeft") moveGallery(-1);
        }}
      >
        <div className="depth-gallery-copy">
          <div className="gallery-hearts">
            <span>{"\u2661"}</span>
            <span>{"\u2661"}</span>
            <span>{"\u2661"}</span>
          </div>
          <h1>{text("romanticGalleryTitle", "Your little memory wall")}</h1>
          <p>{wish.finalMessage || text("romanticGallerySubtitle", "Here is a tiny reminder of how loved you are.")}</p>
        </div>

        {photos.length ? (
          <div className="depth-gallery-stage" aria-label="Birthday memory gallery">
            {photos.map((photo, index) => {
              const offset = index - activeIndex;
              const depth = Math.min(Math.abs(offset), 5);
              const isActive = offset === 0;
              const layout = planeLayout[index];
              const x = offset * 340 + layout.x + pointer.x * (isActive ? 12 : 26);
              const y = layout.y + pointer.y * (isActive ? 8 : 20);
              const rotateY = -offset * 15 + pointer.x * (isActive ? 4 : 8);
              const rotateX = -pointer.y * (isActive ? 3 : 6);
              const z = -depth * 150;
              const scale = Math.max(0.58, 1 - depth * 0.09);

              return (
                <button
                  key={`${photo.url}-${index}`}
                  type="button"
                  className={`depth-photo-plane ${isActive ? "active" : ""}`}
                  style={{
                    opacity: depth > 4 ? 0 : Math.max(0.24, 1 - depth * 0.17),
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${layout.rotate}deg) scale(${scale})`,
                    zIndex: photos.length - depth,
                  }}
                  onClick={() => {
                    setActiveIndex(index);
                    setLightboxPhoto(photo);
                  }}
                  aria-label={`View memory ${index + 1}`}
                >
                  <img src={photo.url} alt="" draggable={false} />
                  <span className="depth-photo-caption">{photo.caption}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="empty-gallery">No photos added</div>
        )}

        <div className="depth-gallery-controls" aria-label="Gallery controls">
          <button
            type="button"
            className="depth-nav"
            onClick={() => moveGallery(-1)}
            disabled={activeIndex === 0}
            aria-label="Previous memory"
          >
            {"<"}
          </button>
          <div className="depth-dots" aria-label="Gallery position">
            {photos.map((photo, index) => (
              <button
                key={`${photo.url}-dot-${index}`}
                type="button"
                className={index === activeIndex ? "active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to memory ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="depth-nav"
            onClick={() => moveGallery(1)}
            disabled={activeIndex === photos.length - 1}
            aria-label="Next memory"
          >
            {">"}
          </button>
        </div>

        <button type="button" className="romantic-button white restart depth-restart" onClick={onRestart}>
          {text("romanticRestartButton", "Play Again")} <RefreshCcw className="h-5 w-5" />
        </button>

        {lightboxPhoto ? (
          <div className="depth-lightbox" role="dialog" aria-modal="true" onClick={() => setLightboxPhoto(null)}>
            <button
              type="button"
              className="depth-lightbox-close"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxPhoto(null);
              }}
              aria-label="Close full screen memory"
            >
              {"\u00d7"}
            </button>
            <img src={lightboxPhoto.url} alt="" onClick={(event) => event.stopPropagation()} />
            <p onClick={(event) => event.stopPropagation()}>{lightboxPhoto.caption}</p>
          </div>
        ) : null}
      </div>
    </RomanticScreen>
  );
}

function RomanticGalleryOld({
  wish,
  memories,
  revealPhoto,
  onRestart,
  text,
}: {
  wish: BirthdayWish;
  memories: BirthdayWish["memories"];
  revealPhoto: string;
  onRestart: () => void;
  text: (key: string, fallback: string) => string;
}) {
  const photos = [revealPhoto, ...memories.map((memory) => memory.url)].filter(Boolean).slice(0, 6);

  return (
    <RomanticScreen className="gallery-screen">
      <div className="gallery-hearts">
        <span>♡</span>
        <span>♡</span>
        <span>♡</span>
      </div>
      <h1>{text("romanticGalleryTitle", "Your little memory wall")}</h1>
      <p>{wish.finalMessage || text("romanticGallerySubtitle", "Here is a tiny reminder of how loved you are.")}</p>

      <div className="romantic-gallery-grid">
        {photos.length ? (
          photos.map((photo, index) => (
            <div key={`${photo}-${index}`} className="romantic-photo-card">
              <img src={photo} alt="" />
            </div>
          ))
        ) : (
          <div className="empty-gallery">No photos added</div>
        )}
      </div>

      <button type="button" className="romantic-button white restart" onClick={onRestart}>
        {text("romanticRestartButton", "Play Again")} <RefreshCcw className="h-5 w-5" />
      </button>
    </RomanticScreen>
  );
}

function RomanticScreen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`romantic-screen ${className}`}>
      <div className="romantic-slide">{children}</div>
    </section>
  );
}

function getCopyText(wish: BirthdayWish, key: string, fallback: string) {
  const value = wish.copy?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function getCopyList(wish: BirthdayWish, key: string, fallback: string[]) {
  const value = wish.copy?.[key];
  return Array.isArray(value) && value.length ? value.filter(Boolean) : fallback;
}

function formatCertificateDate(value?: Date | string) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function downloadCertificate(recipientName: string, date: string, signature: string) {
  if (typeof window === "undefined") return;

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 1414;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.fillStyle = "#4c0019";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.font = "700 italic 96px Georgia, serif";
    context.fillText(recipientName, 1000, 745, 900);

    context.font = "700 34px Georgia, serif";
    context.fillText(date, 465, 1140, 360);
    context.fillText(signature, 1455, 1140, 360);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${recipientName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "birthday"}-certificate.png`;
    link.click();
  };
  image.src = "/birthday/assets/template2/birthday-certificate-bg.png";
}

function splitIntoParts(value: string, count: number) {
  const words = value.split(/\s+/).filter(Boolean);
  const size = Math.ceil(words.length / count);
  return Array.from({ length: count }, (_, index) => words.slice(index * size, (index + 1) * size).join(" "));
}

function launchSoftConfetti(className: string, memories: BirthdayWish["memories"]) {
  if (typeof document === "undefined") return;

  const layer = document.createElement("div");
  layer.className = className;
  document.body.appendChild(layer);

  const symbols = ["♥", "♡", "*", "+"];
  for (let index = 0; index < 80; index += 1) {
    const item = document.createElement("span");
    const memory = memories.length && Math.random() > 0.82 ? memories[Math.floor(Math.random() * memories.length)] : null;

    if (memory?.url) {
      item.style.backgroundImage = `url(${memory.url})`;
      item.style.backgroundSize = "cover";
      item.style.backgroundPosition = "center";
      item.className = "photo-confetti";
    } else {
      item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }

    item.style.left = "50%";
    item.style.top = "50%";
    item.style.setProperty("--tx", `${(Math.random() - 0.5) * window.innerWidth * 1.4}px`);
    item.style.setProperty("--ty", `${(Math.random() - 0.5) * window.innerHeight * 1.2}px`);
    item.style.setProperty("--rot", `${(Math.random() - 0.5) * 720}deg`);
    item.style.animationDelay = `${Math.random() * 0.2}s`;
    layer.appendChild(item);
  }

  window.setTimeout(() => layer.remove(), 3600);
}

function RomanticStyles() {
  return (
    <style jsx global>{`
      .romantic-birthday {
        font-family: "Comic Sans MS", "Trebuchet MS", "Arial Rounded MT Bold", system-ui, sans-serif;
      }

      .romantic-birthday button,
      .romantic-birthday h1,
      .romantic-birthday h2,
      .romantic-birthday h3 {
        letter-spacing: 0;
      }

      .romantic-screen {
        position: fixed;
        inset: 0;
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 24px;
      }

      .romantic-slide {
        position: relative;
        z-index: 2;
        display: flex;
        min-height: min(760px, calc(100vh - 48px));
        width: min(1180px, 100%);
        animation: romantic-enter 0.6s ease both;
        align-items: center;
        justify-content: center;
      }

      .romantic-card {
        display: flex;
        width: min(620px, 100%);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 34px;
        border: 2px solid rgba(255, 143, 164, 0.32);
        background: rgba(255, 255, 255, 0.72);
        padding: 48px 28px;
        text-align: center;
        box-shadow: 0 24px 70px rgba(116, 33, 54, 0.16);
        backdrop-filter: blur(10px);
      }

      .intro-card h1,
      .wrong-card h1 {
        margin: 0;
        color: #1f1f1f;
        font-size: clamp(2.4rem, 8vw, 4.4rem);
        font-weight: 900;
        line-height: 1;
        text-shadow: 3px 3px 0 #fff;
      }

      .romantic-card.intro-card {
        border: 0;
        background: transparent;
        box-shadow: none;
        backdrop-filter: none;
      }

      .intro-cat {
        height: min(42vh, 360px);
        width: min(72vw, 420px);
        object-fit: contain;
        filter: none;
      }

      .wrong-cat {
        height: min(42vh, 330px);
        width: min(72vw, 390px);
        object-fit: contain;
      }

      .romantic-button {
        display: inline-flex;
        min-height: 54px;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border: 0;
        border-radius: 999px;
        padding: 14px 34px;
        font-size: 1.05rem;
        font-weight: 900;
        box-shadow: 0 12px 24px rgba(116, 33, 54, 0.18);
        transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
      }

      .romantic-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 16px 30px rgba(116, 33, 54, 0.22);
      }

      .romantic-button:disabled {
        cursor: not-allowed;
        opacity: 0.55;
      }

      .romantic-button.red {
        background: #c9184a;
        color: #fff;
      }

      .romantic-button.white {
        border: 2px solid rgba(201, 24, 74, 0.14);
        background: #fff;
        color: #c9184a;
      }

      .passcode-card {
        display: grid;
        width: min(980px, 100%);
        overflow: hidden;
        border: 14px solid #8a1538;
        border-radius: 30px;
        background: #fff8e8;
        box-shadow: 0 28px 70px rgba(100, 29, 44, 0.22);
        grid-template-columns: 1fr 1fr;
      }

      .passcode-photo-wrap,
      .passcode-panel {
        min-height: 540px;
        padding: 32px;
      }

      .passcode-photo-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at center, rgba(255, 143, 164, 0.18), transparent 65%);
      }

      .passcode-photo {
        height: min(390px, 55vh);
        width: min(390px, 80%);
        border-radius: 999px;
        border: 8px solid #fff;
        object-fit: cover;
        box-shadow: 0 18px 38px rgba(100, 29, 44, 0.16);
      }

      .passcode-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 4px solid #8a1538;
        text-align: center;
      }

      .passcode-panel h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3.1rem);
        font-weight: 900;
        line-height: 1.04;
      }

      .passcode-panel p {
        margin: 12px 0 0;
        max-width: 360px;
        color: rgba(100, 29, 44, 0.75);
        font-weight: 800;
      }

      .heart-code {
        display: flex;
        gap: 12px;
        margin-top: 28px;
      }

      .heart-code span {
        display: flex;
        height: 54px;
        width: 54px;
        align-items: center;
        justify-content: center;
        border: 3px solid #8a1538;
        border-radius: 12px;
        color: #c9184a;
        font-size: 2rem;
        font-weight: 900;
      }

      .romantic-keypad {
        display: grid;
        grid-template-columns: repeat(3, 62px);
        gap: 12px;
        margin-top: 28px;
      }

      .romantic-keypad button {
        display: flex;
        height: 62px;
        width: 62px;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 999px;
        background: #c9184a;
        color: #fff;
        font-size: 1.25rem;
        font-weight: 900;
        box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.13);
      }

      .unlock {
        margin-top: 24px;
      }

      .gift-drag-screen {
        background: url("/birthday/assets/template2/generated-glow.jpg") center / cover no-repeat;
      }

      .gift-drag-screen::before,
      .gift-drag-screen::after {
        content: none;
      }

      .gift-title {
        position: absolute;
        top: 18%;
        left: 50%;
        z-index: 10;
        margin: 0;
        width: min(560px, calc(100% - 32px));
        transform: translateX(-50%);
        color: #ff4b72;
        font-family: Georgia, serif;
        font-size: clamp(1.7rem, 4.2vw, 3.05rem);
        font-style: italic;
        font-weight: 900;
        line-height: 1.08;
        text-align: center;
        text-shadow: 3px 3px 0 #fff, -3px -3px 0 #fff, 0 10px 22px rgba(116, 33, 54, 0.16);
      }

      .cute-sign {
        position: absolute;
        left: 13%;
        bottom: 19%;
        z-index: 40;
        display: flex;
        cursor: grab;
        touch-action: none;
        flex-direction: column;
        align-items: center;
        transition: transform 0.35s cubic-bezier(0.2, 1, 0.2, 1), opacity 0.2s ease;
      }

      .cute-sign.dragging {
        cursor: grabbing;
        transition: none;
      }

      .cute-sign.hidden {
        opacity: 0;
        transform: scale(0) !important;
      }

      .cute-sign span {
        border: 3px solid #8d6e63;
        border-radius: 10px;
        background: #d7ccc8;
        padding: 10px 24px;
        color: #5d4037;
        font-size: 1.2rem;
        font-weight: 900;
        letter-spacing: 1px;
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.16);
        pointer-events: none;
      }

      .cute-sign i {
        height: 28px;
        width: 8px;
        margin-top: -2px;
        background: #8d6e63;
        pointer-events: none;
      }

      .heart-gift {
        position: relative;
        z-index: 20;
        margin-top: 120px;
        transition: transform 0.2s ease;
      }

      .heart-gift.explode {
        animation: gift-pop 0.35s ease both;
      }

      .heart-gift img {
        height: min(52vh, 430px);
        width: min(82vw, 460px);
        object-fit: contain;
        filter: drop-shadow(0 22px 32px rgba(116, 33, 54, 0.24));
      }

      .jar-screen {
        background: url("/birthday/assets/template2/kitty-bg.jpg") center / cover no-repeat;
      }

      .flower-border {
        position: absolute;
        bottom: -24px;
        left: 0;
        z-index: 1;
        height: 132px;
        width: 100%;
        background: url("/birthday/assets/template2/image-5.png") bottom / contain repeat-x;
        pointer-events: none;
      }

      .jar-layout {
        display: grid;
        width: min(1050px, 100%);
        align-items: center;
        gap: clamp(32px, 7vw, 90px);
        grid-template-columns: minmax(260px, 360px) 1fr;
      }

      .jar-copy {
        position: relative;
        z-index: 2;
      }

      .jar-copy-main {
        transform: translateY(-104px);
      }

      .jar-copy .romantic-button {
        position: relative;
        top: -58px;
      }

      .love-jar {
        position: relative;
        display: flex;
        min-height: 420px;
        flex-wrap: wrap;
        align-content: flex-end;
        justify-content: center;
        gap: 12px;
        border: 5px solid #fff;
        border-radius: 52px 52px 34px 34px;
        background: rgba(255, 255, 255, 0.66);
        padding: 80px 24px 34px;
        box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.9), 0 20px 50px rgba(116, 33, 54, 0.12);
        backdrop-filter: blur(4px);
      }

      .jar-lid {
        position: absolute;
        top: -46px;
        left: 50%;
        height: 44px;
        width: 145px;
        transform: translateX(-50%);
        border: 3px solid #b5835a;
        border-radius: 10px 10px 0 0;
        background: #d4a373;
      }

      .jar-bow {
        position: absolute;
        top: 18px;
        left: 50%;
        height: 46px;
        width: 90px;
        transform: translateX(-50%);
        background:
          radial-gradient(ellipse at 28% 42%, transparent 0 35%, #4a2d25 36% 42%, transparent 43%),
          radial-gradient(ellipse at 72% 42%, transparent 0 35%, #4a2d25 36% 42%, transparent 43%);
      }

      .jar-heart {
        display: flex;
        height: 46px;
        width: 52px;
        align-items: center;
        justify-content: center;
        border: 0;
        clip-path: path("M26 46 C26 46 1 29 1 13 C1 -2 23 2 26 14 C29 2 51 -2 51 13 C51 29 26 46 26 46 Z");
        background: #ff758f;
        color: #fff;
        cursor: pointer;
        font-size: 0.58rem;
        font-weight: 900;
        line-height: 1.08;
        text-align: center;
        transform-origin: center;
        transition: transform 0.2s ease, background 0.2s ease, filter 0.2s ease;
      }

      .jar-heart span {
        display: block;
        transform: scale(1);
        transition: transform 0.22s ease, opacity 0.22s ease;
      }

      .jar-heart:hover,
      .jar-heart:focus-visible {
        filter: brightness(1.05);
      }

      .jar-heart.revealed {
        animation: jar-reveal 0.42s ease both;
      }

      .jar-heart.revealed span {
        animation: jar-text-pop 0.34s ease both;
      }

      .jar-heart.shape-1 {
        width: 58px;
        clip-path: none;
        border-radius: 999px 999px 42px 42px;
        background: #ff8fab;
      }

      .jar-heart.shape-2 {
        clip-path: polygon(50% 0%, 62% 32%, 96% 32%, 69% 52%, 80% 88%, 50% 66%, 20% 88%, 31% 52%, 4% 32%, 38% 32%);
        background: #ffb3c1;
        color: #9b123d;
      }

      .jar-heart.shape-3 {
        width: 60px;
        clip-path: none;
        border-radius: 18px 30px 20px 32px;
        background: #f783ac;
      }

      .jar-heart.shape-4 {
        width: 62px;
        clip-path: polygon(8% 0, 92% 0, 100% 50%, 92% 100%, 8% 100%, 0 50%);
        background: #ffccd5;
        color: #9b123d;
      }

      .jar-copy h1 {
        margin: 0;
        color: #fff;
        font-family: Georgia, serif;
        font-size: clamp(2.5rem, 5.3vw, 4.9rem);
        font-style: italic;
        font-weight: 900;
        line-height: 1;
        text-shadow: 3px 3px 0 #ff9db3, 0 14px 30px rgba(116, 33, 54, 0.18);
      }

      .jar-copy p {
        margin-top: 24px;
        max-width: 460px;
        color: #fff;
        font-size: 1.15rem;
        font-weight: 900;
        text-shadow: 0 2px 8px rgba(116, 33, 54, 0.2);
      }

      .puzzle-screen {
        background: #fff0f3;
      }

      .puzzle-title {
        position: absolute;
        top: 34px;
        left: 50%;
        z-index: 20;
        margin: 0;
        width: min(760px, calc(100% - 32px));
        transform: translateX(-50%);
        color: #ff4d6d;
        font-family: Georgia, serif;
        font-size: clamp(2.05rem, 5vw, 3.8rem);
        font-style: italic;
        font-weight: 900;
        line-height: 0.98;
        text-align: center;
        text-shadow: 3px 3px 0 #fff;
      }

      .puzzle-hint {
        position: absolute;
        top: 132px;
        left: 50%;
        z-index: 20;
        width: min(600px, calc(100% - 32px));
        transform: translateX(-50%);
        color: rgba(100, 29, 44, 0.72);
        font-weight: 900;
        text-align: center;
      }

      .puzzle-board {
        position: relative;
        height: min(700px, 100%);
        width: min(1120px, 100%);
        margin-top: 82px;
      }

      .puzzle-target {
        position: absolute;
        left: 40%;
        top: 52%;
        display: flex;
        height: 360px;
        width: 360px;
        transform: translate(-50%, -50%);
        align-items: center;
        justify-content: center;
        border: 5px dashed rgba(255, 77, 109, 0.28);
        border-radius: 28px;
        color: rgba(255, 77, 109, 0.42);
        font-size: 1.2rem;
        font-weight: 900;
        text-align: center;
      }

      .letter-piece {
        position: absolute;
        left: calc(40% - 88px);
        top: calc(52% - 88px);
        display: flex;
        height: 176px;
        width: 176px;
        touch-action: none;
        cursor: grab;
        align-items: center;
        justify-content: center;
        border: 1px solid #ffe1e8;
        background: rgba(255, 255, 255, 0.96);
        padding: 18px;
        color: #ff4d6d;
        font-family: Georgia, serif;
        font-size: 1rem;
        font-style: italic;
        font-weight: 800;
        line-height: 1.28;
        text-align: center;
        box-shadow: 0 12px 24px rgba(116, 33, 54, 0.12);
      }

      .letter-piece.snapped {
        cursor: default;
        box-shadow: none;
      }

      .puzzle-dino {
        position: absolute;
        right: 2%;
        top: 50%;
        height: min(64vh, 560px);
        width: min(36vw, 440px);
        transform: translateY(-50%);
        object-fit: contain;
        pointer-events: none;
      }

      .puzzle-next {
        position: absolute;
        bottom: 7%;
        left: 50%;
        z-index: 80;
        transform: translateX(-50%);
      }

      .award-screen {
        background: #fff0f3;
      }

      .award-screen::before,
      .award-screen::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 0;
        width: clamp(70px, 10vw, 170px);
        opacity: 0.78;
        pointer-events: none;
        background-image: url("/birthday/assets/template2/image-5.png");
        background-position: center;
        background-repeat: repeat-y;
        background-size: 210px auto;
      }

      .award-screen::before {
        left: 0;
      }

      .award-screen::after {
        right: 0;
        transform: scaleX(-1);
      }

      .award-screen .romantic-slide {
        z-index: 1;
      }

      .award-stage {
        position: relative;
        height: 100vh;
        width: 100vw;
      }

      .award-card {
        position: relative;
        display: block;
        height: 100%;
        width: 100%;
        overflow: hidden;
        border: 0;
        border-radius: 0;
        background: url("/birthday/assets/template2/birthday-certificate-bg.png") center / cover no-repeat;
        padding: 0;
        text-align: center;
        box-shadow: none;
      }

      .award-card::before {
        content: none;
      }

      .award-card::after {
        content: none;
      }

      .award-heart-bg {
        position: absolute;
        left: 50%;
        top: 47%;
        height: 164px;
        width: 164px;
        transform: translate(-50%, -50%);
        opacity: 0.44;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(255, 204, 213, 0.98), rgba(255, 204, 213, 0.22) 64%, transparent 65%);
      }

      .award-overline {
        position: relative;
        z-index: 1;
        margin: 0;
        color: rgba(100, 29, 44, 0.68);
        font-size: 1.05rem;
        font-weight: 900;
      }

      .award-card h1 {
        position: relative;
        z-index: 1;
        margin: 26px 0 0;
        color: #4c1b24;
        font-family: Georgia, serif;
        font-size: clamp(2rem, 5.2vw, 3.25rem);
        font-weight: 900;
        letter-spacing: 2px;
        line-height: 1.18;
        text-transform: uppercase;
      }

      .award-card h2 {
        position: relative;
        z-index: 1;
        display: inline-block;
        margin: 34px 0 24px;
        border-bottom: 2px solid rgba(100, 29, 44, 0.25);
        padding: 0 28px 8px;
        color: #111;
        font-family: Georgia, serif;
        font-size: clamp(3rem, 9vw, 5.4rem);
        font-style: italic;
        font-weight: 900;
      }

      .award-card p:last-of-type {
        position: relative;
        z-index: 1;
        max-width: 680px;
        margin: 0 auto 86px;
        color: rgba(100, 29, 44, 0.78);
        font-size: 1.08rem;
        font-style: italic;
        font-weight: 800;
        line-height: 1.75;
      }

      .award-ribbon {
        position: absolute;
        bottom: 44px;
        left: 50%;
        display: flex;
        height: 96px;
        width: 96px;
        transform: translateX(-50%);
        align-items: center;
        justify-content: center;
        border: 5px solid #fff;
        border-radius: 999px;
        background:
          radial-gradient(circle, #ff6f8c 0 45%, #d81b54 46% 100%);
        color: #fff;
        font-size: 0;
        font-weight: 900;
        box-shadow: 0 10px 20px rgba(116, 33, 54, 0.22);
      }

      .award-ribbon::before {
        content: "CERTIFIED";
        position: absolute;
        height: 68px;
        width: 68px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed rgba(255, 255, 255, 0.9);
        border-radius: 999px;
        font-size: 0.52rem;
        letter-spacing: 0.08em;
      }

      .award-ribbon::after {
        content: "";
        position: absolute;
        bottom: -30px;
        left: 50%;
        height: 44px;
        width: 58px;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #c9184a 0 48%, transparent 49% 51%, #c9184a 52% 100%);
        clip-path: polygon(0 0, 100% 0, 80% 100%, 50% 72%, 20% 100%);
        z-index: -1;
      }

      .award-recipient {
        position: absolute;
        left: 50%;
        top: 52.5%;
        width: 56%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        color: #4c0019;
        font-family: Georgia, serif;
        font-size: clamp(2.1rem, 5vw, 4.8rem);
        font-style: italic;
        font-weight: 700;
        line-height: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .award-date,
      .award-signature {
        position: absolute;
        top: 69.9%;
        transform: translateX(-50%);
        width: 22%;
        overflow: hidden;
        color: #4c0019;
        font-family: Georgia, serif;
        font-size: clamp(0.82rem, 1.6vw, 1.45rem);
        font-weight: 700;
        letter-spacing: 0.02em;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .award-date {
        left: 23%;
      }

      .award-signature {
        left: 73%;
        top: 68.8%;
        font-family: "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive;
        font-size: clamp(1.05rem, 2.2vw, 2rem);
        font-weight: 700;
      }

      .award-next {
        position: absolute;
        right: 4.2%;
        bottom: 4.2%;
        display: flex;
        height: 52px;
        width: 52px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.84);
        padding: 0;
        color: #c9184a;
        font-weight: 900;
        box-shadow: 0 8px 20px rgba(116, 33, 54, 0.15);
      }

      .award-download {
        position: absolute;
        right: 18px;
        top: 18px;
        z-index: 10;
        display: flex;
        height: 48px;
        width: 48px;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 999px;
        background: #c9184a;
        padding: 0;
        color: #fff;
        box-shadow: 0 12px 24px rgba(116, 33, 54, 0.22);
      }

      .award-download:hover {
        transform: translateY(-2px);
      }

      .gallery-screen {
        padding: 0;
        background: #ffe7ef;
      }

      .gallery-screen .romantic-slide {
        min-height: 100vh;
        width: 100vw;
        text-align: center;
      }

      .depth-gallery-shell {
        position: relative;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        touch-action: none;
        outline: none;
        color: #641d2c;
        background:
          radial-gradient(circle at 50% 36%, rgba(255, 255, 255, 0.84) 0 26%, rgba(255, 255, 255, 0) 46%),
          radial-gradient(circle at 14% 18%, rgba(255, 143, 164, 0.42), transparent 24%),
          radial-gradient(circle at 86% 72%, rgba(255, 204, 213, 0.52), transparent 30%),
          linear-gradient(135deg, #ffe0eb, #fff8fb 48%, #ffd1df);
      }

      .depth-gallery-shell::before,
      .depth-gallery-shell::after {
        position: absolute;
        inset: auto;
        z-index: 1;
        display: block;
        color: rgba(255, 77, 109, 0.2);
        font-size: clamp(9rem, 24vw, 28rem);
        font-weight: 900;
        line-height: 1;
        pointer-events: none;
      }

      .depth-gallery-shell::before {
        content: "\\2661";
        left: -4vw;
        top: 18vh;
        transform: rotate(-18deg);
      }

      .depth-gallery-shell::after {
        content: "\\2661";
        right: -3vw;
        bottom: 9vh;
        transform: rotate(14deg);
      }

      .depth-gallery-copy {
        position: absolute;
        left: 50%;
        top: clamp(16px, 3.2vh, 34px);
        z-index: 80;
        width: min(620px, calc(100% - 32px));
        transform: translateX(-50%);
        pointer-events: none;
      }

      .gallery-hearts {
        display: flex;
        justify-content: center;
        gap: 12px;
        color: #ff8fab;
        font-size: clamp(1.5rem, 4vw, 2.6rem);
        font-weight: 900;
      }

      .gallery-screen h1 {
        margin: 0;
        color: #ff4d6d;
        font-family: Georgia, serif;
        font-size: clamp(1.9rem, 4.9vw, 3.35rem);
        font-style: italic;
        font-weight: 900;
        line-height: 0.95;
        text-shadow: 0 8px 24px rgba(255, 143, 164, 0.35);
      }

      .gallery-screen p {
        max-width: 560px;
        margin: 9px auto 0;
        color: rgba(100, 29, 44, 0.72);
        font-size: clamp(0.86rem, 1.5vw, 1.05rem);
        font-weight: 900;
        line-height: 1.25;
      }

      .depth-gallery-stage {
        position: absolute;
        inset: 0;
        z-index: 3;
        display: block;
        perspective: 1200px;
        transform-style: preserve-3d;
      }

      .depth-photo-plane {
        position: absolute;
        left: 50%;
        top: 62%;
        display: block;
        height: min(44vh, 480px);
        width: min(30vw, 420px);
        border: 0;
        background: transparent;
        padding: 0;
        cursor: pointer;
        transform-style: preserve-3d;
        transition:
          transform 0.72s cubic-bezier(0.2, 0.8, 0.2, 1),
          opacity 0.55s ease,
          filter 0.55s ease;
        will-change: transform, opacity;
      }

      .depth-photo-plane img {
        height: 100%;
        width: 100%;
        border: 8px solid rgba(255, 255, 255, 0.9);
        border-radius: 24px;
        background: #fff;
        box-shadow: 0 32px 82px rgba(116, 33, 54, 0.22);
        object-fit: cover;
        user-select: none;
      }

      .depth-photo-plane:not(.active) {
        filter: saturate(0.84) blur(0.25px);
      }

      .depth-photo-caption {
        position: absolute;
        right: 18px;
        bottom: 18px;
        left: 18px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.84);
        padding: 10px 12px;
        color: #641d2c;
        font-size: 0.9rem;
        font-weight: 900;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.28s ease, transform 0.28s ease;
      }

      .depth-photo-plane.active .depth-photo-caption {
        opacity: 1;
        transform: translateY(0);
      }

      .depth-gallery-controls {
        position: absolute;
        left: 50%;
        bottom: 28px;
        z-index: 100;
        display: flex;
        max-width: min(640px, calc(100% - 32px));
        align-items: center;
        gap: 14px;
        transform: translateX(-50%);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.74);
        padding: 10px 14px;
        box-shadow: 0 18px 44px rgba(116, 33, 54, 0.16);
        backdrop-filter: blur(12px);
      }

      .depth-nav {
        display: flex;
        height: 42px;
        width: 42px;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 999px;
        background: #c9184a;
        color: #fff;
        font-size: 1.8rem;
        font-weight: 900;
        line-height: 1;
        box-shadow: 0 12px 24px rgba(201, 24, 74, 0.22);
      }

      .depth-nav:disabled {
        cursor: not-allowed;
        opacity: 0.35;
      }

      .depth-dots {
        display: flex;
        max-width: min(46vw, 380px);
        gap: 8px;
        overflow: hidden;
      }

      .depth-dots button {
        height: 9px;
        width: 9px;
        flex: 0 0 auto;
        border: 0;
        border-radius: 999px;
        background: rgba(201, 24, 74, 0.24);
        padding: 0;
        transition: width 0.24s ease, background 0.24s ease;
      }

      .depth-dots button.active {
        width: 28px;
        background: #c9184a;
      }

      .depth-restart {
        position: absolute;
        right: 24px;
        bottom: 28px;
        z-index: 100;
        margin: 0;
      }

      .empty-gallery {
        position: absolute;
        left: 50%;
        top: 52%;
        z-index: 10;
        width: min(420px, calc(100% - 48px));
        transform: translate(-50%, -50%);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.78);
        padding: 60px 24px;
        font-weight: 900;
        box-shadow: 0 18px 44px rgba(116, 33, 54, 0.12);
      }

      .restart:not(.depth-restart) {
        margin-top: 28px;
      }

      .depth-lightbox {
        position: fixed;
        inset: 0;
        z-index: 20000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        background: rgba(43, 13, 25, 0.74);
        padding: 24px;
        backdrop-filter: blur(16px);
      }

      .depth-lightbox img {
        max-height: 82vh;
        max-width: min(92vw, 1120px);
        border: 8px solid rgba(255, 255, 255, 0.94);
        border-radius: 24px;
        background: #fff;
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
        object-fit: contain;
      }

      .depth-lightbox p {
        margin: 0;
        max-width: min(780px, 92vw);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.88);
        padding: 10px 18px;
        color: #641d2c;
        font-size: 0.98rem;
        font-weight: 900;
      }

      .depth-lightbox-close {
        position: absolute;
        top: 22px;
        right: 22px;
        display: flex;
        height: 48px;
        width: 48px;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 999px;
        background: #c9184a;
        color: #fff;
        font-size: 2rem;
        font-weight: 900;
        line-height: 1;
        box-shadow: 0 14px 34px rgba(0, 0, 0, 0.2);
      }

      .romantic-explosion-layer,
      .romantic-puzzle-confetti {
        position: fixed;
        inset: 0;
        z-index: 10000;
        pointer-events: none;
        overflow: hidden;
      }

      .romantic-explosion-layer span,
      .romantic-puzzle-confetti span {
        position: absolute;
        display: block;
        height: 42px;
        width: 42px;
        color: #ff4d6d;
        font-size: 2.2rem;
        font-weight: 900;
        animation: romantic-confetti 3.3s ease-out forwards;
        filter: drop-shadow(0 8px 18px rgba(116, 33, 54, 0.18));
      }

      .romantic-explosion-layer .photo-confetti,
      .romantic-puzzle-confetti .photo-confetti {
        border-radius: 14px;
        border: 3px solid #fff;
      }

      @keyframes romantic-enter {
        from {
          opacity: 0;
          transform: translateX(40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes gift-pop {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.16);
        }
        100% {
          transform: scale(0);
          opacity: 0;
        }
      }

      @keyframes jar-reveal {
        0% {
          filter: brightness(1);
        }
        45% {
          filter: brightness(1.16);
        }
        100% {
          filter: brightness(1);
        }
      }

      @keyframes jar-text-pop {
        0% {
          opacity: 0;
          transform: scale(0.45) rotate(-8deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      @keyframes romantic-confetti {
        from {
          opacity: 1;
          transform: translate(-50%, -50%) scale(0.35) rotate(0deg);
        }
        to {
          opacity: 0;
          transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.65) rotate(var(--rot));
        }
      }

      @media (max-width: 780px) {
        .romantic-screen {
          padding: 14px;
        }

        .romantic-slide {
          min-height: calc(100vh - 28px);
        }

        .passcode-card {
          grid-template-columns: 1fr;
          border-width: 9px;
        }

        .passcode-photo-wrap,
        .passcode-panel {
          min-height: auto;
          padding: 18px;
        }

        .passcode-panel {
          border-left: 0;
          border-top: 4px solid #8a1538;
        }

        .passcode-photo {
          height: min(230px, 34vh);
          width: min(230px, 72vw);
        }

        .romantic-keypad {
          grid-template-columns: repeat(3, 54px);
          gap: 10px;
        }

        .romantic-keypad button {
          height: 54px;
          width: 54px;
        }

        .gift-title {
          top: 13.5%;
          width: min(340px, calc(100% - 36px));
          font-size: clamp(1.28rem, 6.8vw, 1.9rem);
          line-height: 1.05;
        }

        .gift-drag-screen {
          background: url("/birthday/assets/template2/generated-glow-mobile.png") center / cover no-repeat;
        }

        .gift-drag-screen::before,
        .gift-drag-screen::after {
          content: none;
        }

        .cute-sign {
          left: 12%;
          bottom: 17%;
          z-index: 45;
          transform-origin: center bottom;
        }

        .cute-sign span {
          padding: 8px 18px;
          font-size: 1rem;
        }

        .heart-gift {
          z-index: 18;
          margin-top: 128px;
        }

        .heart-gift img {
          height: min(40vh, 320px);
          width: min(72vw, 320px);
        }

        .jar-layout {
          width: min(360px, 100%);
          grid-template-columns: 1fr;
          gap: 12px;
          text-align: center;
        }

        .jar-copy {
          transform: none;
        }

        .jar-copy-main {
          transform: none;
        }

        .jar-copy .romantic-button {
          top: 0;
          min-height: 46px;
          padding: 11px 28px;
        }

        .love-jar {
          min-height: 250px;
          width: min(290px, 82vw);
          margin: 0 auto;
          gap: 8px;
          border-width: 4px;
          border-radius: 38px 38px 28px 28px;
          padding: 70px 18px 24px;
        }

        .jar-lid {
          top: -40px;
          height: 38px;
          width: 124px;
        }

        .jar-bow {
          top: 14px;
          height: 38px;
          width: 76px;
        }

        .jar-heart {
          height: 30px;
          width: 36px;
          font-size: 0.48rem;
        }

        .jar-heart.shape-1,
        .jar-heart.shape-3,
        .jar-heart.shape-4 {
          width: 42px;
        }

        .jar-copy h1 {
          font-size: clamp(1.85rem, 9vw, 2.55rem);
          line-height: 0.96;
        }

        .jar-copy p {
          max-width: 300px;
          margin: 14px auto 0;
          font-size: 0.92rem;
          line-height: 1.35;
        }

        .flower-border {
          bottom: -10px;
          height: 82px;
        }

        .puzzle-title {
          top: 24px;
          width: min(330px, calc(100% - 28px));
          font-size: clamp(1.7rem, 8.5vw, 2.25rem);
          line-height: 0.94;
        }

        .puzzle-hint {
          top: 104px;
          width: min(300px, calc(100% - 28px));
          font-size: 0.86rem;
          line-height: 1.25;
        }

        .puzzle-board {
          height: 100vh;
          width: 100vw;
          margin-top: 0;
        }

        .puzzle-target {
          left: 50%;
          top: 54%;
          height: min(34vh, 250px);
          width: min(66vw, 250px);
          border-width: 4px;
          border-radius: 22px;
          font-size: 0.9rem;
          z-index: 7;
        }

        .letter-piece {
          left: calc(50% - 46px);
          top: calc(54% - 46px);
          height: 92px;
          width: 92px;
          padding: 9px;
          font-size: 0.58rem;
          line-height: 1.18;
        }

        .puzzle-dino {
          right: 4%;
          top: 35%;
          bottom: auto;
          z-index: 5;
          height: min(16vh, 124px);
          width: min(30vw, 118px);
          opacity: 0.72;
          transform: none;
        }

        .puzzle-next {
          bottom: 28px;
          min-height: 46px;
          padding: 11px 24px;
          font-size: 0.9rem;
        }

        .award-stage {
          display: flex;
          height: 100vh;
          width: 100vw;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 14px;
        }

        .award-stage::before,
        .award-stage::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          z-index: 0;
          height: min(26vh, 170px);
          pointer-events: none;
          background-image: url("/birthday/assets/template2/tulip-bed.png");
          background-position: center bottom;
          background-repeat: repeat-x;
          background-size: auto clamp(74px, 18vw, 112px);
          opacity: 0.82;
        }

        .award-stage::before {
          top: 0;
          transform: rotate(180deg);
        }

        .award-stage::after {
          bottom: 0;
        }

        .award-card {
          aspect-ratio: 16 / 9;
          height: auto;
          width: min(96vw, 720px);
          z-index: 1;
          border-radius: 18px;
          background-size: cover;
          padding: 0;
          box-shadow: 0 18px 44px rgba(116, 33, 54, 0.14);
        }

        .award-screen::before,
        .award-screen::after {
          display: none;
        }

        .award-recipient {
          font-size: clamp(0.86rem, 5.8vw, 2.1rem);
        }

        .award-date,
        .award-signature {
          top: 69.9%;
          font-size: clamp(0.36rem, 1.8vw, 0.72rem);
        }

        .award-signature {
          top: 68.8%;
          font-size: clamp(0.5rem, 2.6vw, 1.05rem);
        }

        .award-next {
          right: 3.6%;
          bottom: 3.8%;
          height: 34px;
          width: 34px;
          padding: 0;
          text-align: center;
        }

        .award-download {
          right: calc(50% - min(48vw, 360px) + 10px);
          top: calc(50% - min(27vw, 202.5px) + 10px);
          height: 36px;
          width: 36px;
          padding: 0;
        }

        .depth-gallery-copy {
          top: 14px;
          width: calc(100% - 28px);
        }

        .gallery-screen h1 {
          font-size: clamp(1.7rem, 8.5vw, 2.35rem);
        }

        .gallery-screen p {
          max-width: 320px;
          margin-top: 6px;
          font-size: 0.78rem;
        }

        .depth-gallery-shell::before {
          left: -24vw;
          top: 26vh;
        }

        .depth-gallery-shell::after {
          right: -22vw;
          bottom: 18vh;
        }

        .depth-photo-plane {
          top: 63%;
          height: min(47vh, 360px);
          width: min(78vw, 320px);
        }

        .depth-photo-plane img {
          border-width: 6px;
          border-radius: 20px;
        }

        .depth-photo-caption {
          right: 12px;
          bottom: 12px;
          left: 12px;
          font-size: 0.78rem;
        }

        .depth-gallery-controls {
          bottom: 16px;
          gap: 10px;
          padding: 8px 10px;
        }

        .depth-nav {
          height: 38px;
          width: 38px;
        }

        .depth-dots {
          max-width: 46vw;
        }

        .depth-restart {
          right: 14px;
          bottom: 78px;
          padding: 10px 15px;
          font-size: 0.82rem;
        }

        .depth-lightbox {
          padding: 14px;
        }

        .depth-lightbox img {
          max-height: 76vh;
          border-width: 5px;
          border-radius: 18px;
        }

        .depth-lightbox-close {
          top: 12px;
          right: 12px;
          height: 42px;
          width: 42px;
        }
      }
    `}</style>
  );
}
