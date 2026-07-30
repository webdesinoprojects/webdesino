"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Camera, Mic, RotateCcw, Search, Volume2, VolumeX, X } from "lucide-react";
import { verifyBirthdayPasscode, type BirthdayWish } from "@/lib/birthday-actions";

const ASSET = "/birthday/assets/template4";

type DogStep =
  | "passcode"
  | "wrong-code"
  | "gift"
  | "wrong-choice"
  | "birthday"
  | "memories"
  | "facts"
  | "letter"
  | "finale";

export default function DogScrapbookBirthdayExperience({ wish }: { wish: BirthdayWish }) {
  const [step, setStep] = useState<DogStep>("passcode");
  const [attempt, setAttempt] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPending, startTransition] = useTransition();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function startAudio() {
    if (!isMuted) void audioRef.current?.play().catch(() => undefined);
  }

  function goTo(nextStep: DogStep) {
    startAudio();
    setStep(nextStep);
    if (nextStep === "birthday" || nextStep === "finale") {
      setShowConfetti(false);
      requestAnimationFrame(() => setShowConfetti(true));
      window.setTimeout(() => setShowConfetti(false), 4200);
    }
  }

  function enterDigit(value: string) {
    startAudio();
    if (value === "back") {
      setAttempt((current) => current.slice(0, -1));
      return;
    }
    if (value && attempt.length < 4) setAttempt((current) => `${current}${value}`);
  }

  function submitCode() {
    if (attempt.length !== 4 || isPending) return;
    startTransition(async () => {
      const result = await verifyBirthdayPasscode(wish.slug, attempt);
      if (result.success) {
        setAttempt("");
        goTo("gift");
      } else {
        setAttempt("");
        goTo("wrong-code");
      }
    });
  }

  function toggleAudio() {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      if (!nextMuted) void audioRef.current.play().catch(() => undefined);
    }
  }

  return (
    <main className="dog-book">
      {wish.music?.url ? <audio ref={audioRef} src={wish.music.url} loop preload="auto" /> : null}
      {showConfetti ? <Confetti /> : null}
      {wish.music?.url ? (
        <button className="dog-audio" type="button" onClick={toggleAudio} aria-label={isMuted ? "Play music" : "Mute music"}>
          {isMuted ? <VolumeX /> : <Volume2 />}
        </button>
      ) : null}

      {step === "passcode" ? <PasscodeScreen attempt={attempt} isPending={isPending} enterDigit={enterDigit} submitCode={submitCode} /> : null}
      {step === "wrong-code" ? <WrongCodeScreen wish={wish} onRetry={() => goTo("passcode")} /> : null}
      {step === "gift" ? <GiftScreen wish={wish} onYes={() => goTo("birthday")} onNo={() => goTo("wrong-choice")} /> : null}
      {step === "wrong-choice" ? <WrongChoiceScreen wish={wish} onRetry={() => goTo("gift")} /> : null}
      {step === "birthday" ? <BirthdayScreen wish={wish} onNext={() => goTo("memories")} /> : null}
      {step === "memories" ? <MemoriesScreen wish={wish} onNext={() => goTo("facts")} /> : null}
      {step === "facts" ? <FactsScreen wish={wish} onNext={() => goTo("letter")} /> : null}
      {step === "letter" ? <LetterScreen wish={wish} onNext={() => goTo("finale")} /> : null}
      {step === "finale" ? <FinaleScreen wish={wish} onRestart={() => goTo("passcode")} /> : null}

      <DogStyles />
    </main>
  );
}

function PasscodeScreen({
  attempt,
  isPending,
  enterDigit,
  submitCode,
}: {
  attempt: string;
  isPending: boolean;
  enterDigit: (value: string) => void;
  submitCode: () => void;
}) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (/^\d$/.test(event.key)) enterDigit(event.key);
      if (event.key === "Backspace") enterDigit("back");
      if (event.key === "Enter") submitCode();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enterDigit, submitCode]);

  const keys = [
    ["1", 66.7, 38.7], ["2", 75.6, 38.7], ["3", 85.5, 38.7],
    ["4", 66.7, 48.4], ["5", 75.6, 48.4], ["6", 85.5, 48.4],
    ["7", 66.7, 57.5], ["8", 75.6, 57.5], ["9", 85.5, 57.5],
    ["back", 66.7, 67], ["0", 75.6, 67], ["submit", 85.5, 67],
  ] as const;

  return (
    <DogScreen className="passcode-screen">
      <div className="passcode-artboard">
        <img src={`${ASSET}/pass-lock-scree.png`} alt="Birthday passcode screen" className="full-art" />
        <div className="code-display" aria-label={`${attempt.length} of 4 digits entered`}>
          {[0, 1, 2, 3].map((index) => <span key={index}>{index < attempt.length ? "\u2665" : ""}</span>)}
        </div>
        <div className="passcode-hotspots" aria-label="Passcode keypad">
          {keys.map(([key, x, y], index) => (
            <button
              key={`${key}-${index}`}
              type="button"
              aria-label={key === "back" ? "Delete digit" : key === "submit" ? "Unlock birthday surprise" : `Digit ${key}`}
              onClick={key === "submit" ? submitCode : () => enterDigit(key)}
              disabled={key === "submit" && (attempt.length !== 4 || isPending)}
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          ))}
        </div>
      </div>
      <p className="passcode-hint">Tap # after entering four digits. Tap * to delete.</p>
    </DogScreen>
  );
}

function WrongCodeScreen({ wish, onRetry }: { wish: BirthdayWish; onRetry: () => void }) {
  return (
    <ScrapbookScreen className="wrong-code-screen">
      <div className="wrong-layout">
        <img src={`${ASSET}/dog-sad.png`} alt="A confused birthday dog" className="wrong-dog transparent-art" />
        <div className="wrong-copy">
          <h1>Wrong passcode!</h1>
          <p>{wish.recipientName}&apos;s surprise is still locked.</p>
          <button type="button" className="scrap-button coral" onClick={onRetry}>{copyText(wish, "dogTryAgainButton", "TRY AGAIN")}</button>
        </div>
      </div>
    </ScrapbookScreen>
  );
}

function GiftScreen({ wish, onYes, onNo }: { wish: BirthdayWish; onYes: () => void; onNo: () => void }) {
  return (
    <ScrapbookScreen className="gift-screen">
      <div className="gift-layout">
        <h1>{copyText(wish, "dogGiftTitle", "I MADE SOMETHING SPECIAL FOR YOU\nDO YOU WANNA SEE IT?")}</h1>
        <img src={`${ASSET}/dog-out-of-box.png`} alt="A birthday dog inside a gift" className="gift-dog transparent-art" />
        <div className="gift-buttons">
          <button type="button" className="scrap-button teal" onClick={onYes}>{copyText(wish, "dogYesButton", "YES")}</button>
          <button type="button" className="scrap-button coral" onClick={onNo}>{copyText(wish, "dogNoButton", "NO")}</button>
        </div>
      </div>
    </ScrapbookScreen>
  );
}

function WrongChoiceScreen({ wish, onRetry }: { wish: BirthdayWish; onRetry: () => void }) {
  return (
    <ScrapbookScreen className="wrong-choice-screen">
      <div className="wrong-choice-layout">
        <h1>{copyText(wish, "dogWrongChoiceTitle", "WHY DID YOU CLICK NO!?")}</h1>
        <img src={`${ASSET}/dog-sad.png`} alt="A confused birthday dog" className="choice-dog transparent-art" />
        <button type="button" className="scrap-button coral" onClick={onRetry}>{copyText(wish, "dogTryAgainButton", "TRY AGAIN")}</button>
      </div>
    </ScrapbookScreen>
  );
}

function BirthdayScreen({ wish, onNext }: { wish: BirthdayWish; onNext: () => void }) {
  const birthdayLetters = "HAPPY BIRTHDAY".split("");
  return (
    <ScrapbookScreen className="birthday-screen">
      <div className="birthday-layout">
        <h1 className="ransom-title" aria-label={copyText(wish, "dogBirthdayTitle", "HAPPY BIRTHDAY")}>
          {birthdayLetters.map((letter, index) => <span key={`${letter}-${index}`}>{letter === " " ? "\u00a0" : letter}</span>)}
        </h1>
        <p>{copyText(wish, "dogBirthdaySubtitle", "A little celebration made just for you")}</p>
        <div className="birthday-photo">
          {wish.revealPhoto?.url ? <img src={wish.revealPhoto.url} alt={`Birthday memory of ${wish.recipientName}`} /> : null}
          <strong>{wish.recipientName}</strong>
        </div>
        <img src={`${ASSET}/dog-holding-cake.png`} alt="" className="birthday-dog left transparent-art" />
        <img src={`${ASSET}/dog-holding-balloon.png`} alt="" className="birthday-dog right transparent-art" />
        <NextButton onClick={onNext} label="Memories" />
      </div>
    </ScrapbookScreen>
  );
}

const MEMORY_TABS = ["All Images", "Videos", "Notes", "Maps", "Memories"];

function MemoriesScreen({ wish, onNext }: { wish: BirthdayWish; onNext: () => void }) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const memoryTitle = copyText(wish, "dogMemoriesTitle", "Memories");
  const filtered = wish.memories.filter((photo) => `${photo.message || ""} ${photo.name || ""}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <DogScreen className="notebook-screen memories-screen">
      <div className="memory-page">
        <header className="memory-heading">
          <h1 aria-label={memoryTitle}>
            {memoryTitle.split("").map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
          </h1>
          <label>
            <Search />
            <input value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder={copyText(wish, "dogMemoriesSubtitle", "Moments of us")} />
            <Mic />
            <Camera />
          </label>
        </header>
        <nav className="memory-tabs" aria-label="Memory categories">
          {MEMORY_TABS.map((tab) => <span key={tab} className={tab === "Memories" ? "active" : ""}>{tab}</span>)}
        </nav>
        <div className="memory-grid">
          {filtered.map((photo) => {
            const actualIndex = wish.memories.indexOf(photo);
            return (
              <button type="button" key={`${photo.url}-${actualIndex}`} onClick={() => setActivePhoto(actualIndex)}>
                <img src={photo.url} alt={photo.message || `Memory ${actualIndex + 1}`} />
                <span>{photo.message || `Memory ${actualIndex + 1}`}</span>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 ? <p className="empty-memory">No memory matches that search.</p> : null}
        <img src={`${ASSET}/bottom-corenr-dog.png`} alt="" className="memory-dog transparent-art" />
        <NextButton onClick={onNext} label="Fun facts" />
      </div>
      {activePhoto !== null ? <PhotoLightbox photo={wish.memories[activePhoto]} onClose={() => setActivePhoto(null)} /> : null}
    </DogScreen>
  );
}

function FactsScreen({ wish, onNext }: { wish: BirthdayWish; onNext: () => void }) {
  const facts = copyList(wish, "dogFacts", [
    "You make ordinary days feel special",
    "Your smile can fix almost anything",
    "You always know how to make me laugh",
    "You are kinder than you realize",
    "Life is brighter with you in it",
  ]);
  const factsTitle = copyText(wish, "dogFactsTitle", "FUN FACTS ABOUT YOU");
  return (
    <ScrapbookScreen className="facts-screen">
      <div className="facts-note">
        <h1 aria-label={factsTitle}>
          {factsTitle.split("").map((letter, index) => (
            <span key={`${letter}-${index}`} className={letter === " " ? "space" : ""}>{letter === " " ? "\u00a0" : letter}</span>
          ))}
        </h1>
        <p className="facts-intro">A few things that make {wish.recipientName} so special</p>
        <ul className="facts-list">
          {facts.map((fact, index) => (
            <li key={`${fact}-${index}`}>
              <span className="fact-star">&#9733;</span>
              <p>{fact}</p>
            </li>
          ))}
        </ul>
        <i className="paper-tape tape-left" />
        <i className="paper-tape tape-right" />
      </div>
      <img src={`${ASSET}/dog-blowing-horn.png`} alt="" className="facts-dog transparent-art" />
      <NextButton onClick={onNext} label="With love" />
    </ScrapbookScreen>
  );
}

function LetterScreen({ wish, onNext }: { wish: BirthdayWish; onNext: () => void }) {
  const letterTitle = copyText(wish, "dogLetterTitle", "WITH LOVE");

  return (
    <DogScreen className="notebook-screen letter-screen">
      <div className="ruled-page letter-page">
        <div className="letter-copy">
          <i className="letter-tape letter-tape-left" />
          <i className="letter-tape letter-tape-right" />
          <span className="letter-salutation">To {wish.recipientName},</span>
          <h1 className="letter-title" aria-label={letterTitle}>
            {letterTitle.split(" ").map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}
          </h1>
          <div className="letter-message"><p>{wish.message}</p></div>
          <footer><span>With love,</span><strong>{wish.senderName}</strong></footer>
          <div className="letter-stamp" aria-hidden="true"><span>&#9829;</span><small>JUST FOR YOU</small></div>
        </div>
        <img src={`${ASSET}/dog-holding-cake.png`} alt="" className="letter-dog transparent-art" />
        <img src={`${ASSET}/bouquet-corner.png`} alt="" className="letter-bouquet transparent-art" />
        <NextButton onClick={onNext} label="One last page" />
      </div>
    </DogScreen>
  );
}

function FinaleScreen({ wish, onRestart }: { wish: BirthdayWish; onRestart: () => void }) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const photos = wish.memories.slice(0, 8);
  return (
    <DogScreen className="notebook-screen finale-screen">
      <div className="ruled-page finale-page">
        <header>
          <span>Happy birthday, {wish.recipientName}</span>
          <h1>{copyText(wish, "dogFinalTitle", "YOU ARE ONE IN YOUR OWN KIND")}</h1>
          <p>{wish.finalMessage}</p>
        </header>
        <div className="finale-collage">
          {photos.map((photo, index) => (
            <button type="button" key={`${photo.url}-${index}`} onClick={() => setActivePhoto(index)} style={{ "--turn": `${[-4, 3, -2, 5, -3, 2, -5, 4][index]}deg` } as React.CSSProperties}>
              <img src={photo.url} alt={photo.message || `Memory ${index + 1}`} />
              <span>{photo.message || `Memory ${index + 1}`}</span>
            </button>
          ))}
        </div>
        <img src={`${ASSET}/dog-holding-balloon.png`} alt="" className="finale-dog transparent-art" />
        <button type="button" className="restart-button" onClick={onRestart}><RotateCcw />{copyText(wish, "dogRestartButton", "Play Again")}</button>
      </div>
      {activePhoto !== null ? <PhotoLightbox photo={photos[activePhoto]} onClose={() => setActivePhoto(null)} /> : null}
    </DogScreen>
  );
}

function DogScreen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`dog-screen ${className}`}><div className="dog-canvas">{children}</div></section>;
}

function ScrapbookScreen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <DogScreen className={`scrapbook-screen ${className}`}>
      <img src={`${ASSET}/bg-wrong-screen.png`} alt="" className="scrapbook-bg" />
      {children}
    </DogScreen>
  );
}

function NextButton({ onClick, label }: { onClick: () => void; label: string }) {
  return <button type="button" className="next-button" onClick={onClick}><span>{label}</span><ArrowRight /></button>;
}

function PhotoLightbox({ photo, onClose }: { photo: BirthdayWish["memories"][number]; onClose: () => void }) {
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Memory photo" onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="Close photo" title="Close photo"><X /></button>
      <img src={photo.url} alt={photo.message || "Birthday memory"} onClick={(event) => event.stopPropagation()} />
      {photo.message ? <p>{photo.message}</p> : null}
    </div>,
    document.body,
  );
}

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 42 }, (_, index) => ({
    id: index,
    left: (index * 37) % 100,
    delay: (index % 9) * 0.12,
    duration: 2.8 + (index % 6) * 0.24,
    color: ["#ff506f", "#ffd65a", "#4bb7b2", "#8fd6e8", "#ef8eb0"][index % 5],
  })), []);
  return <div className="dog-confetti" aria-hidden="true">{pieces.map((piece) => <i key={piece.id} style={{ left: `${piece.left}%`, animationDelay: `${piece.delay}s`, animationDuration: `${piece.duration}s`, background: piece.color }} />)}</div>;
}

function copyText(wish: BirthdayWish, key: string, fallback: string) {
  const value = wish.copy[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function copyList(wish: BirthdayWish, key: string, fallback: string[]) {
  const value = wish.copy[key];
  return Array.isArray(value) && value.length ? value : fallback;
}

function DogStyles() {
  return <style jsx global>{`
    .dog-book { min-height: 100dvh; overflow: hidden; background: #f6fbf8; color: #542f28; font-family: "Comic Sans MS", "Trebuchet MS", cursive; }
    .dog-screen { min-height: 100dvh; display: grid; place-items: center; overflow: hidden; }
    .dog-canvas { position: relative; width: 100%; min-height: 100dvh; overflow: hidden; isolation: isolate; }
    .transparent-art { display: block; object-fit: contain; }
    .full-art { display: block; width: 100%; height: 100%; object-fit: contain; }

    .passcode-screen { background: #f4f5f6; }
    .passcode-screen .dog-canvas { display: grid; place-items: center; }
    .passcode-artboard { position: relative; width: min(100vw, calc(100dvh * 1.3333)); aspect-ratio: 4 / 3; }
    .code-display { position: absolute; left: 62.9%; top: 21.35%; display: grid; grid-template-columns: repeat(4, 1fr); width: 27%; height: 9%; pointer-events: none; }
    .code-display span { display: grid; place-items: center; color: #b72736; font-size: clamp(1rem, 2.4vw, 2.25rem); }
    .passcode-hotspots button { position: absolute; width: 7.6%; aspect-ratio: 1; transform: translate(-50%, -50%); border: 0; border-radius: 50%; background: transparent; cursor: pointer; }
    .passcode-hotspots button:focus-visible { outline: 4px solid #fff; }
    .passcode-hint { position: fixed; left: 50%; bottom: .65rem; z-index: 4; margin: 0; transform: translateX(-50%); color: #075f65; font-size: .78rem; font-weight: 900; white-space: nowrap; }

    .scrapbook-screen { background: #fff; }
    .scrapbook-screen .dog-canvas { aspect-ratio: 16 / 9; min-height: 100dvh; }
    .scrapbook-bg { position: absolute; inset: 0; z-index: -2; width: 100%; height: 100%; object-fit: cover; }
    .scrap-button { min-width: 9.5rem; border: 3px solid currentColor; border-radius: 999px; padding: .72rem 1.55rem; background: #fff8ee; box-shadow: 0 6px 0 rgba(71, 48, 35, .16); font: 900 1rem/1 "Comic Sans MS", cursive; cursor: pointer; }
    .scrap-button.teal { color: #08767c; }
    .scrap-button.coral { color: #b52b37; }
    .wrong-layout { position: absolute; inset: 8% 10%; display: grid; grid-template-columns: .9fr 1.1fr; align-items: center; gap: 4%; }
    .wrong-dog { width: 100%; max-height: 65dvh; }
    .wrong-copy { text-align: center; }
    .wrong-copy h1, .wrong-choice-layout h1, .gift-layout h1 { margin: 0; color: #a92834; font: 900 clamp(2.2rem, 4.6vw, 5.2rem)/1.02 "Comic Sans MS", cursive; letter-spacing: 0; text-transform: uppercase; white-space: pre-line; }
    .wrong-copy p { margin: 1rem 0 1.5rem; font-size: clamp(1rem, 1.6vw, 1.5rem); font-weight: 800; }
    .gift-layout { position: absolute; inset: 6% 12% 5%; display: grid; grid-template-rows: auto 1fr auto; justify-items: center; text-align: center; }
    .gift-layout h1 { max-width: 62rem; font-size: clamp(2rem, 3.6vw, 4rem); }
    .gift-dog { width: min(38vw, 33rem); height: 52dvh; }
    .gift-buttons { display: flex; gap: 1rem; }
    .wrong-choice-layout { position: absolute; inset: 6% 12%; display: grid; grid-template-rows: auto 1fr auto; justify-items: center; text-align: center; }
    .wrong-choice-layout h1 { font-size: clamp(2.2rem, 4.3vw, 4.8rem); }
    .choice-dog { width: min(33vw, 28rem); height: 51dvh; }

    .birthday-layout { position: absolute; inset: 3% 4%; display: grid; grid-template-rows: auto auto 1fr; justify-items: center; text-align: center; }
    .ransom-title { z-index: 2; display: flex; flex-wrap: wrap; justify-content: center; gap: .16em; margin: 0; max-width: 90%; font-size: clamp(2.8rem, 6vw, 7rem); line-height: .96; }
    .ransom-title span { display: inline-block; padding: .02em .08em; color: #fff; background: #ef5668; box-shadow: .08em .08em 0 #087b80; transform: rotate(-3deg); }
    .ransom-title span:nth-child(3n+2) { color: #08767c; background: #ffd86b; transform: rotate(3deg); }
    .ransom-title span:nth-child(3n) { color: #9f2b36; background: #91d9e7; transform: rotate(-1deg); }
    .birthday-layout > p { margin: .8rem 0 0; font-size: clamp(1rem, 1.7vw, 1.5rem); font-weight: 900; }
    .birthday-photo { position: relative; z-index: 2; align-self: center; width: min(34vw, 31rem); height: 48dvh; border: .8rem solid #fff; border-bottom-width: 3.8rem; background: #fff; box-shadow: 0 18px 38px rgba(62, 55, 41, .22); transform: rotate(-1.5deg); }
    .birthday-photo img { width: 100%; height: 100%; object-fit: cover; }
    .birthday-photo strong { position: absolute; left: .5rem; right: .5rem; bottom: -2.9rem; overflow: hidden; color: #a92834; font-size: clamp(1.15rem, 2vw, 1.8rem); text-overflow: ellipsis; white-space: nowrap; }
    .birthday-dog { position: absolute; bottom: -5%; width: min(26vw, 25rem); height: 43%; }
    .birthday-dog.left { left: -1%; }
    .birthday-dog.right { right: -1%; }

    .notebook-screen { background: #fffdfa; overflow-y: auto; }
    .notebook-screen .dog-canvas { min-height: 100dvh; height: auto; }
    .memory-page, .ruled-page { position: relative; min-height: 100dvh; padding: clamp(1rem, 3vw, 3rem) clamp(1rem, 6vw, 7rem) 7rem; background-color: #fffdfa; background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(46, 132, 143, .14) 32px); }
    .memory-heading { position: relative; z-index: 2; display: grid; justify-items: center; gap: 1.05rem; max-width: 58rem; margin: 0 auto; text-align: center; }
    .memory-heading h1 { display: flex; justify-content: center; margin: 0; font: 900 clamp(3rem, 5.7vw, 5.8rem)/1 "Comic Sans MS", cursive; letter-spacing: 0; }
    .memory-heading h1 span:nth-child(5n+1) { color: #4285f4; }
    .memory-heading h1 span:nth-child(5n+2) { color: #ea4335; }
    .memory-heading h1 span:nth-child(5n+3) { color: #fbbc05; }
    .memory-heading h1 span:nth-child(5n+4) { color: #4285f4; }
    .memory-heading h1 span:nth-child(5n) { color: #34a853; }
    .page-kicker, .finale-page header > span { color: #b22c39; font-size: .95rem; font-weight: 900; text-transform: uppercase; }
    .memory-heading label { display: flex; align-items: center; gap: .7rem; width: min(46rem, 86vw); border: 1px solid #d9dce1; border-radius: 999px; padding: .78rem 1.05rem; background: #fff; box-shadow: 0 2px 7px rgba(60, 64, 67, .2); }
    .memory-heading label svg { flex: 0 0 auto; width: 1.15rem; color: #5f6368; }
    .memory-heading label svg:nth-last-child(2) { color: #4285f4; }
    .memory-heading label svg:last-child { color: #ea4335; }
    .memory-heading input { width: 100%; border: 0; outline: 0; background: transparent; color: #3c4043; font: 600 1rem/1.2 "Comic Sans MS", cursive; }
    .memory-tabs { position: relative; z-index: 2; display: flex; justify-content: center; gap: clamp(1rem, 3vw, 2.5rem); max-width: 58rem; margin: 1.15rem auto 2rem; border-bottom: 1px solid #dadce0; padding: .7rem 1rem .85rem; overflow-x: auto; color: #5f6368; font-size: .9rem; font-weight: 800; white-space: nowrap; }
    .memory-tabs .active { color: #b22c39; text-decoration: underline 3px; text-underline-offset: .45rem; }
    .memory-grid { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .65rem; max-width: 72rem; margin: auto; }
    .memory-grid button { position: relative; min-height: 15rem; overflow: hidden; border: .25rem solid #fff; border-radius: .35rem; background: #fff; box-shadow: 0 2px 9px rgba(60, 64, 67, .16); cursor: zoom-in; }
    .memory-grid img { width: 100%; height: 100%; object-fit: cover; }
    .memory-grid span { position: absolute; left: .45rem; right: .45rem; bottom: .4rem; overflow: hidden; border-radius: .25rem; padding: .35rem .45rem; background: rgba(255, 255, 255, .9); color: #3c4043; font-size: .78rem; font-weight: 800; text-overflow: ellipsis; white-space: nowrap; }
    .memory-dog { position: fixed; right: -3%; bottom: -8%; z-index: 3; width: min(18vw, 18rem); height: 33%; pointer-events: none; }
    .empty-memory { position: relative; z-index: 2; text-align: center; font-weight: 800; }

    .facts-screen .dog-canvas { display: grid; place-items: center; }
    .facts-note { position: relative; z-index: 2; width: min(68rem, 78vw); min-height: 69dvh; padding: clamp(3rem, 6vw, 5.7rem) clamp(2rem, 7vw, 7rem) 3rem; background: rgba(255, 255, 252, .94); box-shadow: 0 17px 42px rgba(58, 55, 42, .2); clip-path: polygon(1% 2%, 13% 1%, 25% 2%, 39% 1%, 51% 2%, 65% 1%, 79% 2%, 91% 1%, 99% 3%, 98% 17%, 99% 31%, 98% 47%, 99% 62%, 98% 79%, 99% 97%, 86% 98%, 70% 97%, 55% 99%, 39% 97%, 24% 99%, 9% 97%, 1% 98%, 2% 82%, 1% 66%, 2% 49%, 1% 32%, 2% 17%); }
    .facts-note::before { content: ""; position: absolute; inset: 0; z-index: -1; background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 34px, rgba(42, 131, 143, .12) 35px); }
    .facts-note h1 { display: flex; flex-wrap: wrap; justify-content: center; gap: .12em; margin: 0 auto .7rem; max-width: 58rem; color: #222; font: 900 clamp(2rem, 4.1vw, 4.5rem)/1.05 "Courier New", monospace; letter-spacing: 0; }
    .facts-note h1 span { display: inline-grid; min-width: .78em; place-items: center; padding: .04em .1em; color: #fff; background: #dd3e4f; box-shadow: .05em .06em 0 rgba(55, 44, 37, .18); transform: rotate(-3deg); }
    .facts-note h1 span:nth-child(4n+2) { color: #3b2925; background: #f5cc55; transform: rotate(2deg); }
    .facts-note h1 span:nth-child(4n+3) { background: #36a8b0; transform: rotate(-1deg); }
    .facts-note h1 span:nth-child(4n) { color: #3b2925; background: #f39ab0; transform: rotate(3deg); }
    .facts-note h1 span.space { min-width: .42em; padding: 0; background: transparent; box-shadow: none; }
    .facts-intro { margin: 0 0 1.5rem; color: #7a625c; font: 700 clamp(.85rem, 1.35vw, 1.1rem)/1.4 "Courier New", monospace; text-align: center; }
    .facts-list { display: grid; gap: .65rem; width: min(52rem, 100%); margin: 0 auto; padding: 0; list-style: none; }
    .facts-list li { display: grid; grid-template-columns: 1.5rem 1fr; align-items: start; gap: .65rem; }
    .facts-list .fact-star { color: #ef5668; font-size: 1.15rem; line-height: 1.45; transform: rotate(-10deg); }
    .facts-list li:nth-child(4n+2) .fact-star { color: #37a9b1; }
    .facts-list li:nth-child(4n+3) .fact-star { color: #f2bc2f; }
    .facts-list li:nth-child(4n) .fact-star { color: #8f68b1; }
    .facts-list p { margin: 0; color: #3e3531; font: 700 clamp(.95rem, 1.5vw, 1.28rem)/1.45 "Courier New", monospace; }
    .paper-tape { position: absolute; top: 1rem; width: 7rem; height: 2rem; background: rgba(243, 193, 91, .58); transform: rotate(-7deg); }
    .tape-left { left: 8%; }
    .tape-right { right: 8%; transform: rotate(6deg); }
    .facts-dog { position: absolute; left: 1%; bottom: -4%; z-index: 3; width: min(14vw, 13rem); height: 28%; opacity: .96; }

    .letter-page { display: grid; place-items: center; }
    .letter-copy { position: relative; z-index: 2; display: grid; grid-template-rows: auto auto 1fr auto; width: min(60rem, 72vw); min-height: 76dvh; padding: clamp(3.8rem, 6vw, 5.5rem) clamp(2.5rem, 6vw, 5rem) clamp(2.5rem, 4vw, 3.5rem); background-color: #fffaf0; background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 34px, rgba(45, 132, 143, .17) 35px); border: 0; box-shadow: 0 20px 45px rgba(53, 55, 42, .2); transform: rotate(-.35deg); }
    .letter-copy::before { content: ""; position: absolute; inset: 1.1rem; border: 2px dashed #e78da0; pointer-events: none; }
    .letter-copy::after { content: ""; position: absolute; top: 0; bottom: 0; left: 4rem; border-left: 2px solid rgba(223, 95, 111, .28); pointer-events: none; }
    .letter-salutation { position: relative; z-index: 2; margin-left: 1.1rem; color: #08767c; font: 900 clamp(1rem, 1.5vw, 1.25rem)/1.4 "Courier New", monospace; }
    .letter-title { position: relative; z-index: 2; display: flex; flex-wrap: wrap; align-items: center; gap: .25em; margin: .7rem 0 1.4rem 1rem; font: 900 clamp(2rem, 4.2vw, 4.2rem)/1 "Courier New", monospace; letter-spacing: 0; }
    .letter-title span { display: inline-block; padding: .08em .22em; color: #fff; background: #bf3040; box-shadow: .08em .1em 0 rgba(65, 49, 37, .15); transform: rotate(-2deg); }
    .letter-title span:nth-child(even) { color: #402b28; background: #f3c957; transform: rotate(2deg); }
    .letter-title span:nth-child(3n) { background: #2e9da6; transform: rotate(-1deg); }
    .letter-message { position: relative; z-index: 2; min-height: 14rem; margin-left: 1.1rem; padding: .25rem .7rem 1.2rem; }
    .letter-message p { margin: 0; white-space: pre-line; color: #4e342d; font: 700 clamp(1rem, 1.5vw, 1.25rem)/1.75 "Comic Sans MS", "Segoe Print", cursive; }
    .letter-copy footer { position: relative; z-index: 2; justify-self: end; min-width: 12rem; margin: 1rem 1.2rem 0 0; padding-top: .6rem; border-top: 2px solid rgba(78, 52, 45, .32); color: #7f2f3a; text-align: center; font: italic 700 1.1rem/1.35 Georgia, serif; }
    .letter-copy footer span, .letter-copy footer strong { display: block; }
    .letter-copy footer strong { margin-top: .2rem; font-family: "Comic Sans MS", "Segoe Print", cursive; font-size: 1.35rem; }
    .letter-stamp { position: absolute; top: 2.7rem; right: 3rem; z-index: 3; display: grid; width: 5.2rem; aspect-ratio: 4 / 5; place-items: center; border: .45rem dotted #e88a9e; background: #f8d7dd; color: #b52b3a; transform: rotate(7deg); }
    .letter-stamp span { font-size: 2rem; line-height: 1; }
    .letter-stamp small { font: 900 .55rem/1 "Courier New", monospace; }
    .letter-tape { position: absolute; top: -.8rem; z-index: 4; width: 7rem; height: 2.2rem; background: rgba(91, 180, 180, .58); }
    .letter-tape-left { left: 12%; transform: rotate(-7deg); }
    .letter-tape-right { right: 15%; transform: rotate(6deg); background: rgba(243, 194, 81, .62); }
    .letter-dog, .letter-bouquet { position: absolute; z-index: 3; width: min(18vw, 17rem); height: 29%; pointer-events: none; }
    .letter-dog { right: -1%; bottom: -3%; }
    .letter-bouquet { left: -1%; top: -2%; }

    .finale-page header { position: relative; z-index: 2; max-width: 74rem; margin: 0 auto 1.4rem; text-align: center; }
    .finale-page header h1 { margin: .35rem 0 .55rem; color: #08767c; font: 900 clamp(2.8rem, 6vw, 6rem)/.98 Georgia, serif; }
    .finale-page header p { margin: 0; font-size: clamp(1rem, 1.5vw, 1.35rem); font-weight: 800; }
    .finale-collage { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; width: min(80rem, 88vw); margin: 2rem auto; }
    .finale-collage button { position: relative; min-height: 15rem; overflow: hidden; border: .65rem solid #fff; border-bottom-width: 3rem; background: #fff; box-shadow: 0 14px 28px rgba(62, 55, 41, .19); cursor: zoom-in; transform: rotate(var(--turn)); }
    .finale-collage img { width: 100%; height: 100%; object-fit: cover; }
    .finale-collage span { position: absolute; left: .3rem; right: .3rem; bottom: -2.25rem; overflow: hidden; color: #74453e; font-weight: 800; text-overflow: ellipsis; white-space: nowrap; }
    .finale-dog { position: absolute; right: -2%; bottom: -5%; z-index: 1; width: min(18vw, 18rem); height: 31%; }
    .restart-button { position: relative; z-index: 4; display: flex; align-items: center; gap: .55rem; margin: 2rem auto 0; border: 3px solid #b22c39; border-radius: 999px; padding: .75rem 1.35rem; background: #fff; color: #b22c39; font-weight: 900; }

    .next-button { position: absolute; right: 2.5%; bottom: 3%; z-index: 10; display: flex; align-items: center; gap: .6rem; border: 3px solid #08767c; border-radius: 999px; padding: .72rem 1rem .72rem 1.25rem; background: #fffdf8; color: #08767c; box-shadow: 0 7px 0 rgba(8, 118, 124, .14); font-weight: 900; cursor: pointer; }
    .next-button svg { width: 1.2rem; }
    .dog-audio { position: fixed; top: 1rem; right: 1rem; z-index: 40; display: grid; width: 3rem; height: 3rem; place-items: center; border: 2px solid #fff; border-radius: 50%; background: #08767c; color: #fff; box-shadow: 0 7px 20px rgba(0,0,0,.16); }
    .dog-audio svg { width: 1.25rem; }
    .photo-lightbox { position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center; padding: 2rem; background: rgba(15, 30, 29, .9); cursor: zoom-out; }
    .photo-lightbox > button { position: absolute; top: 1.2rem; right: 1.2rem; z-index: 10001; display: grid; width: 3rem; height: 3rem; place-items: center; border: 0; border-radius: 50%; background: #fff; color: #8f2731; box-shadow: 0 8px 24px rgba(0,0,0,.28); cursor: pointer; }
    .photo-lightbox img { max-width: min(90vw, 80rem); max-height: 82dvh; object-fit: contain; border: 10px solid #fff; box-shadow: 0 25px 70px rgba(0,0,0,.4); }
    .photo-lightbox p { position: absolute; bottom: 1rem; max-width: 80vw; margin: 0; color: #fff; font-weight: 800; text-align: center; }
    .dog-confetti { position: fixed; inset: 0; z-index: 80; overflow: hidden; pointer-events: none; }
    .dog-confetti i { position: absolute; top: -2rem; width: .8rem; height: 1.3rem; animation: dog-fall linear forwards; }
    @keyframes dog-fall { to { transform: translate3d(8vw, 110dvh, 0) rotate(800deg); } }

    @media (max-width: 720px) {
      .dog-screen { overflow-y: auto; }
      .dog-canvas { min-height: 100svh; }
      .passcode-artboard { width: 100%; height: auto; aspect-ratio: 4 / 3; }
      .passcode-hotspots button { width: 10.5%; }
      .passcode-hint { bottom: .75rem; width: calc(100% - 2rem); text-align: center; white-space: normal; }
      .scrapbook-screen .dog-canvas { min-height: 100svh; aspect-ratio: auto; }
      .scrapbook-bg { object-fit: cover; }
      .wrong-layout { inset: 7% 7% 5%; grid-template-columns: 1fr; grid-template-rows: 1fr auto; gap: 0; }
      .wrong-dog { align-self: end; justify-self: center; width: 78%; height: 50svh; }
      .wrong-copy { grid-row: 1; align-self: start; }
      .wrong-copy h1, .wrong-choice-layout h1, .gift-layout h1 { font-size: clamp(2rem, 10vw, 3.3rem); }
      .gift-layout { inset: 6% 6% 5%; }
      .gift-dog { width: 84vw; height: 48svh; }
      .gift-buttons { width: 100%; justify-content: center; }
      .scrap-button { min-width: 7.5rem; }
      .wrong-choice-layout { inset: 7% 6% 6%; }
      .choice-dog { width: 78vw; height: 52svh; }
      .birthday-layout { inset: 4% 3%; grid-template-rows: auto auto 1fr; }
      .ransom-title { max-width: 96%; gap: .1em; font-size: clamp(2.2rem, 10vw, 3.5rem); }
      .birthday-photo { width: 72vw; height: 46svh; border-width: .55rem; border-bottom-width: 3rem; }
      .birthday-photo strong { bottom: -2.35rem; }
      .birthday-dog { bottom: -1%; width: 38vw; height: 27%; opacity: .94; }
      .next-button { right: .8rem; bottom: .8rem; padding: .65rem; }
      .next-button span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
      .memory-page, .ruled-page { padding: 1.25rem .9rem 5.5rem; }
      .memory-heading h1 { font-size: 3.25rem; }
      .memory-heading label { width: 100%; }
      .memory-tabs { justify-content: flex-start; gap: 1.2rem; margin-bottom: 1rem; }
      .memory-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .7rem; }
      .memory-grid button { min-height: 11rem; border-width: .2rem; }
      .memory-grid span { bottom: .3rem; font-size: .7rem; }
      .memory-dog { display: none; }
      .facts-note { width: 94vw; min-height: 78svh; padding: 4.2rem 1.25rem 4.5rem; }
      .facts-note h1 { gap: .08em; font-size: clamp(1.7rem, 8.2vw, 2.8rem); }
      .facts-intro { margin-bottom: 1rem; }
      .facts-list { gap: .8rem; }
      .facts-list p { font-size: .9rem; }
      .facts-dog { left: -4%; bottom: -2%; width: 29vw; height: 21%; }
      .letter-page { padding-inline: .5rem; }
      .letter-copy { width: 94vw; min-height: 84svh; padding: 5.4rem 1.35rem 4.4rem 2.4rem; transform: none; }
      .letter-copy::before { inset: .65rem; }
      .letter-copy::after { left: 1.75rem; }
      .letter-salutation { margin-left: 0; font-size: .9rem; }
      .letter-title { gap: .18em; margin: .7rem 0 1.2rem; font-size: clamp(1.8rem, 9vw, 2.8rem); }
      .letter-message { min-height: 15rem; margin-left: 0; padding: 0 .2rem 1rem; }
      .letter-message p { font-size: .98rem; line-height: 1.7; }
      .letter-copy footer { min-width: 9rem; margin-right: .2rem; font-size: .95rem; }
      .letter-copy footer strong { font-size: 1.15rem; }
      .letter-stamp { top: 1.25rem; right: 1.2rem; width: 4.1rem; }
      .letter-tape { width: 5.2rem; height: 1.6rem; }
      .letter-tape-left { left: 7%; }
      .letter-tape-right { right: 8%; }
      .letter-dog { right: -5%; bottom: -2%; width: 31vw; height: 20%; opacity: .9; }
      .letter-bouquet { left: -5%; top: -2%; width: 27vw; height: 18%; opacity: .92; }
      .finale-page header h1 { font-size: clamp(2.5rem, 12vw, 4rem); }
      .finale-collage { grid-template-columns: repeat(2, minmax(0, 1fr)); width: 92vw; gap: .65rem; }
      .finale-collage button { min-height: 10rem; border-width: .4rem; border-bottom-width: 2.5rem; }
      .finale-dog { display: none; }
      .photo-lightbox { padding: 1rem; }
      .photo-lightbox img { max-width: 95vw; max-height: 78dvh; border-width: 6px; }
    }
  `}</style>;
}
