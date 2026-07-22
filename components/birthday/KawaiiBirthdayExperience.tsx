"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  ArrowRight,
  Heart,
  KeyRound,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { verifyBirthdayPasscode, type BirthdayWish } from "@/lib/birthday-actions";
import Gallery3D from "@/components/birthday/Gallery3D";
import { KawaiiStyles } from "@/components/birthday/BirthdayBuilder";

const ASSET = "/birthday/assets";

type Step = 1 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 7 | 8;
type BirthdayStep = Step | 9;

export default function KawaiiBirthdayExperience({ wish }: { wish: BirthdayWish }) {
  const [step, setStep] = useState<BirthdayStep>(1);
  const [passcodeAttempt, setPasscodeAttempt] = useState("");
  const [giftClicks, setGiftClicks] = useState(0);
  const [noMoved, setNoMoved] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [blown, setBlown] = useState(false);
  const [leftPopped, setLeftPopped] = useState(false);
  const [rightPopped, setRightPopped] = useState(false);
  const [isPending, startTransition] = useTransition();
  const audioRef = useRef<HTMLAudioElement>(null);
  const finaleAudioRef = useRef<HTMLAudioElement | null>(null);

  const revealPhoto = wish.revealPhoto?.url || wish.photos[0]?.url || "";
  const memories = wish.memories?.length ? wish.memories : wish.photos.slice(1);

  useEffect(() => {
    if (step !== 4.5) return;
    const timer = window.setTimeout(() => setStep(5), 2200);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step === 8) return;

    finaleAudioRef.current?.pause();
    finaleAudioRef.current = null;
    audioRef.current?.play().catch(() => undefined);
  }, [blown, step, wish.voiceRecording?.url]);

  function playAudio() {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio.play().catch(() => undefined);
  }

  function handleNoMove() {
    setNoMoved(true);
    setNoOffset({
      x: Math.round((Math.random() - 0.5) * 180),
      y: Math.round((Math.random() - 0.5) * 120),
    });
  }

  function handleKeypad(value: string) {
    if (passcodeAttempt.length >= 4 || isPending) return;
    setPasscodeAttempt((current) => `${current}${value}`.slice(0, 4));
  }

  function checkPasscode() {
    playAudio();
    if (passcodeAttempt.length !== 4 || isPending) return;

    startTransition(async () => {
      const result = await verifyBirthdayPasscode(wish.slug, passcodeAttempt);
      if (result.success) {
        setStep(3.5);
        return;
      }
      setPasscodeAttempt("");
      setStep(4);
    });
  }

  function handleGiftClick() {
    setGiftClicks((current) => {
      const next = current + 1;
      if (next >= 3) setStep(4.5);
      return next;
    });
  }

  function startFinaleParty() {
    if (blown) return;

    setBlown(true);
    launchBirthdayConfetti();

    const backgroundAudio = audioRef.current;
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    }

    finaleAudioRef.current?.pause();
    const finaleAudio = new Audio(wish.voiceRecording?.url || `${ASSET}/happy-birthday.mp3`);
    finaleAudio.loop = true;
    finaleAudio.volume = 0.95;
    finaleAudio.play().catch(() => undefined);
    finaleAudioRef.current = finaleAudio;
  }

  function launchBirthdayConfetti() {
    if (typeof document === "undefined") return;

    const layer = document.createElement("div");
    layer.className = "birthday-confetti-layer";
    document.body.appendChild(layer);

    const colors = ["#ff5fa2", "#a2d2ff", "#fff3b0", "#b9fbc0", "#c8b6ff", "#ffffff"];
    const duration = 4200;
    const endTime = Date.now() + duration;

    const burst = () => {
      for (let index = 0; index < 90; index += 1) {
        const piece = document.createElement("span");
        const size = Math.random() * 10 + 7;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight * 0.35;
        const tx = (Math.random() - 0.5) * window.innerWidth * 0.75;
        const ty = Math.random() * window.innerHeight * 0.9 + 160;
        const rotate = (Math.random() - 0.5) * 1080;

        piece.style.left = `${startX}px`;
        piece.style.top = `${startY}px`;
        piece.style.width = `${size}px`;
        piece.style.height = `${size * (Math.random() > 0.5 ? 1.45 : 0.75)}px`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.72 ? "999px" : "3px";

        layer.appendChild(piece);
        piece.animate(
          [
            { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)" },
            {
              opacity: 1,
              offset: 0.72,
              transform: `translate3d(${tx * 0.55}px, ${ty * 0.55}px, 0) rotate(${rotate * 0.55}deg) scale(1.05)`,
            },
            {
              opacity: 0,
              transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${rotate}deg) scale(0.85)`,
            },
          ],
          {
            duration: Math.random() * 1300 + 2600,
            easing: "cubic-bezier(0.16, 0.84, 0.38, 1)",
            fill: "forwards",
          }
        );
      }
    };

    burst();
    const interval = window.setInterval(() => {
      if (Date.now() >= endTime) {
        window.clearInterval(interval);
        window.setTimeout(() => layer.remove(), 3200);
        return;
      }
      burst();
    }, 260);
  }

  function popHearts(side: "left" | "right") {
    if (side === "left") setLeftPopped(true);
    else setRightPopped(true);

    if (typeof document === "undefined") return;

    const layer = document.createElement("div");
    layer.className = "birthday-heart-burst";
    document.body.appendChild(layer);

    const hearts = ["\u2764\uFE0F", "\uD83D\uDC96", "\uD83D\uDC97", "\uD83D\uDC93", "\uD83E\uDD0D", "\uD83D\uDC9C"];
    const originX = side === "left" ? window.innerWidth * 0.12 : window.innerWidth * 0.88;
    const originY = window.innerHeight * 0.74;

    for (let index = 0; index < 70; index += 1) {
      const item = document.createElement("span");
      item.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      item.style.left = `${originX}px`;
      item.style.top = `${originY}px`;
      item.style.fontSize = `${Math.random() * 24 + 28}px`;

      const angle =
        side === "left"
          ? Math.random() * (Math.PI / 2) - Math.PI / 2.5
          : Math.random() * (Math.PI / 2) + Math.PI / 1.1;
      const distance = Math.random() * window.innerWidth * 0.45 + 180;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - Math.random() * 420 - 140;
      const rot = (Math.random() - 0.5) * 700;

      item.animate(
        [
          { opacity: 1, transform: "translate(0, 0) scale(0.5) rotate(0deg)" },
          { opacity: 1, offset: 0.72 },
          { opacity: 0, transform: `translate(${tx}px, ${ty}px) scale(1.6) rotate(${rot}deg)` },
        ],
        {
          duration: (Math.random() * 1.4 + 1.6) * 1000,
          easing: "cubic-bezier(0.15, 0.9, 0.3, 1)",
          fill: "forwards",
        }
      );
      layer.appendChild(item);
    }

    window.setTimeout(() => layer.remove(), 3800);
  }

  return (
    <main className="birthday-kawaii min-h-screen overflow-x-hidden bg-[#ffdae0] text-[#5c3a21]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,183,197,0.8)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,rgba(162,210,255,0.6)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(255,243,176,0.5)_0%,transparent_60%)]" />

      {wish.music?.url ? <audio ref={audioRef} src={wish.music.url} loop /> : null}

      <section className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-8">
        <div className="flex min-h-[600px] w-full max-w-[1000px] flex-col items-center justify-center">
          {step === 1 && (
            <Screen>
              <h1 className="text-center text-5xl font-black text-[#d35c82] drop-shadow-[2px_2px_0_#fff]">
                A Special Surprise! <Sparkles className="inline h-9 w-9 fill-[#d35c82]" />
              </h1>
              <p className="mt-4 text-center text-lg font-black">
                Are you ready to see it, {wish.recipientName}?
              </p>

              <div className="mt-8 flex items-end justify-center gap-8">
                <img
                  src={`${ASSET}/${noMoved ? "sad-cat.png" : "happy-cat.png"}`}
                  alt=""
                  className="sticker h-40 w-40 object-contain sm:h-48 sm:w-48"
                />
                <img src={`${ASSET}/closed-gift.png`} alt="" className="sticker h-36 w-36 object-contain sm:h-44 sm:w-44" />
              </div>

              {noMoved ? (
                <p className="mt-4 text-center text-base font-black text-[#e63946]">
                  Don't be mean. The gift is waiting.
                </p>
              ) : null}

              <div className="relative mt-8 flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  className="kawaii-btn mint"
                  onClick={() => {
                    playAudio();
                    setStep(3);
                  }}
                >
                  Yes, open it! <Heart className="h-5 w-5 fill-[#5c3a21]" />
                </button>
                <button
                  type="button"
                  className="kawaii-btn purple transition-transform"
                  onMouseEnter={handleNoMove}
                  onClick={handleNoMove}
                  style={{ transform: `translate(${noOffset.x}px, ${noOffset.y}px)` }}
                >
                  No, go away
                </button>
              </div>
            </Screen>
          )}

          {step === 3 && (
            <Screen>
              <h2 className="text-center text-4xl font-black">Enter the passcode</h2>
              <p className="mt-3 text-center text-base font-black">
                Prove it is really you <KeyRound className="inline h-5 w-5 fill-[#5c3a21]" />
              </p>

              <div className="mt-7 flex justify-center gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`flex h-[60px] w-[50px] items-center justify-center rounded-2xl border-[3px] border-[#5c3a21] text-3xl font-black ${
                      passcodeAttempt.length > index ? "bg-[#ffb7c5]" : "bg-white/80"
                    }`}
                  >
                    {passcodeAttempt[index] ? <Heart className="h-8 w-8 fill-white text-white" /> : ""}
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-4">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "Back"].map((button) => (
                  <button
                    key={button}
                    type="button"
                    onClick={() => {
                      if (button === "C") setPasscodeAttempt("");
                      else if (button === "Back") setPasscodeAttempt((current) => current.slice(0, -1));
                      else handleKeypad(button);
                    }}
                    className="keypad-button"
                  >
                    {button === "Back" ? "<" : button}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="kawaii-btn yellow mt-8 w-full max-w-[250px]"
                onClick={checkPasscode}
                disabled={passcodeAttempt.length !== 4 || isPending}
              >
                {isPending ? "Checking..." : "Unlock"} <Heart className="h-5 w-5 fill-[#5c3a21]" />
              </button>
            </Screen>
          )}

          {step === 4 && (
            <Screen>
              <h2 className="text-center text-4xl font-black text-[#e63946]">Oops! Wrong Code!</h2>
              <img src={`${ASSET}/confused-cat.png`} alt="" className="sticker mt-6 h-56 w-56 object-contain" />
              <button type="button" className="kawaii-btn blue mt-7" onClick={() => setStep(3)}>
                Try Again <RefreshCcw className="h-5 w-5" />
              </button>
            </Screen>
          )}

          {step === 3.5 && (
            <Screen>
              <h2 className="text-center text-4xl font-black">Unwrap your gift!</h2>
              <p className="mt-3 text-center text-base font-black">Keep tapping to open it.</p>
              <button type="button" className="mt-8" onClick={handleGiftClick} aria-label="Tap gift">
                <img src={`${ASSET}/closed-gift.png`} alt="" className="gift-shake sticker h-64 w-64 object-contain" />
              </button>
              <div className="progress-bar-bg mt-7 w-full max-w-[300px]">
                <div className="progress-bar-fill" style={{ width: `${(giftClicks / 3) * 100}%` }} />
              </div>
            </Screen>
          )}

          {step === 4.5 && (
            <Screen>
              <img src={`${ASSET}/happy-cat.png`} alt="" className="magic-spin sticker h-48 w-48 object-contain" />
              <h2 className="mt-5 text-center text-3xl font-black text-[#9b7cf3]">
                Casting birthday magic... <Sparkles className="inline h-7 w-7 fill-[#9b7cf3]" />
              </h2>
            </Screen>
          )}

          {step === 5 && (
            <Screen wide>
              <div className="relative flex min-h-[620px] w-full flex-col items-center justify-center overflow-hidden rounded-[32px] px-4 py-8">
                <img src={`${ASSET}/balloons.png`} alt="" className="sticker absolute -left-8 top-0 h-36 w-36 object-contain sm:h-44 sm:w-44" />
                <img src={`${ASSET}/balloons.png`} alt="" className="sticker absolute -right-8 top-0 h-36 w-36 scale-x-[-1] object-contain sm:h-44 sm:w-44" />
                <img src={`${ASSET}/ribbons-tapes.png`} alt="" className="sticker absolute top-2 h-24 w-72 object-contain" />

                <div className="sticker relative z-10 mt-14 rotate-[-3deg] rounded-lg bg-white p-4 pb-11 shadow-[0_10px_20px_rgba(92,58,33,0.15)]">
                  {revealPhoto ? (
                    <img src={revealPhoto} alt="" className="h-[250px] w-[250px] rounded object-cover" />
                  ) : (
                    <div className="flex h-[250px] w-[250px] items-center justify-center rounded bg-[#fff3b0]">
                      <img src={`${ASSET}/happy-cat.png`} alt="" className="h-32 w-32 object-contain" />
                    </div>
                  )}
                </div>

                <h2 className="relative z-10 mt-6 text-center text-5xl font-black text-[#d35c82] drop-shadow-[2px_2px_0_#fff]">
                  Happy Birthday, <br /> {wish.recipientName}!
                </h2>

                <div className="pointer-events-none absolute bottom-0 flex w-full justify-between px-4">
                  <img src={`${ASSET}/open-gift.png`} alt="" className="sticker h-28 w-28 object-contain sm:h-36 sm:w-36" />
                  <img src={`${ASSET}/birthday-cake.png`} alt="" className="sticker h-28 w-28 object-contain sm:h-36 sm:w-36" />
                </div>

                <button type="button" className="kawaii-btn blue relative z-20 mt-7" onClick={() => setStep(5.5)}>
                  Continue <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </Screen>
          )}

          {step === 5.5 && (
            <Screen>
              <h2 className="text-center text-4xl font-black">
                Are you ready to cry from happiness?
              </h2>
              <img src={`${ASSET}/starry-eyed-cat.png`} alt="" className="sticker mt-7 h-56 w-56 object-contain" />
              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <button type="button" className="kawaii-btn pink" onClick={() => setStep(6)}>
                  Yes, absolutely!
                </button>
                <button type="button" className="kawaii-btn mint" onClick={() => setStep(6)}>
                  I already am!
                </button>
              </div>
            </Screen>
          )}

          {step === 6 && (
            <Screen wide>
              <div className="w-full">
                <div className="relative rounded-[32px] border-[8px] border-white bg-[#ffb7c5] p-5 shadow-[0_20px_40px_rgba(92,58,33,0.15)]">
                  <div className="relative flex min-h-[350px] flex-col items-center justify-center rounded-[20px] border-4 border-dashed border-[#ffb7c5] bg-[#fff9f0] px-5 py-12 sm:px-12">
                    <h3 className="mb-6 text-center text-4xl font-black text-[#d35c82]">
                      <Heart className="inline h-8 w-8 fill-[#d35c82]" /> My wish for you{" "}
                      <Heart className="inline h-8 w-8 fill-[#d35c82]" />
                    </h3>
                    <p className="max-w-2xl whitespace-pre-wrap text-center text-xl font-bold leading-9 text-[#5c3a21]">
                      {wish.message}
                    </p>
                    <img src={`${ASSET}/happy-cat.png`} alt="" className="sticker absolute -bottom-12 -right-6 h-28 w-28 object-contain sm:h-36 sm:w-36" />
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    className="kawaii-btn yellow px-12 text-xl"
                    onClick={() => setStep(memories.length > 0 ? 7 : 8)}
                  >
                    See Memories <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Screen>
          )}

          {step === 7 && (
            <Gallery3D memories={memories} onNext={() => setStep(8)} />
          )}

          {step === 8 && (
            <div className="fixed inset-0 z-[200] flex min-h-screen flex-col items-center justify-between overflow-hidden bg-[#111] px-4 py-6">
              {blown ? <div className="ambient-glow" /> : null}

              {blown ? (
                <>
                  <ul className="light-wire lights-bottom">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <li key={index} />
                    ))}
                  </ul>
                  <ul className="light-wire lights-left">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <li key={index} />
                    ))}
                  </ul>
                  <ul className="light-wire lights-right">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <li key={index} />
                    ))}
                  </ul>
                  <div className="party-banner">
                    {"HAPPY BIRTHDAY".split("").map((char, index) =>
                      char.trim() ? (
                        <div
                          key={`${char}-${index}`}
                          className="bunting"
                          style={{ animationDelay: `${index * 0.08}s`, background: `hsl(${index * 25}, 80%, 60%)` }}
                        >
                          {char}
                        </div>
                      ) : (
                        <div key={index} className="w-3" />
                      )
                    )}
                  </div>
                </>
              ) : null}

              <div className="relative z-10 mt-[5vh] flex min-h-[15vh] w-full items-center justify-center text-center">
                {blown ? (
                  <h2 className="text-[clamp(2rem,8vw,3rem)] font-black text-white drop-shadow-[0_0_18px_#ff8da1]">
                    Happy Birthday to youuuuuuuuuu{" "}
                    <Heart className="inline h-10 w-10 fill-white text-white" />
                  </h2>
                ) : (
                  <h3 className="birthday-pulse text-center text-2xl font-black text-white">
                    Blow out the candle
                    <br />
                    <span className="text-sm opacity-70">(Click the cake)</span>
                  </h3>
                )}
              </div>

              <div className="relative z-30 flex grow items-center justify-center">
                <button
                  type="button"
                  onClick={startFinaleParty}
                  className={`relative transition-transform duration-700 ${blown ? "scale-110 cursor-default" : "cursor-pointer"}`}
                  aria-label="Blow out the candle"
                >
                  <img
                    src={`${ASSET}/birthday-cake.png`}
                    alt=""
                    className="sticker h-[280px] w-[280px] object-contain sm:h-[350px] sm:w-[350px]"
                    style={{ filter: getCakeFilter(wish.cakeTheme), opacity: blown ? 1 : 0.86 }}
                  />
                  {!blown ? <span className="cake-flame" /> : null}
                </button>
              </div>

              {blown ? (
                <>
                  <button
                    type="button"
                    className={`champagne-pop left-pop ${leftPopped ? "popped" : ""}`}
                    onClick={() => popHearts("left")}
                    aria-label="Pop left hearts"
                  >
                    {"\uD83C\uDF7E"}
                  </button>
                  <button
                    type="button"
                    className={`champagne-pop right-pop ${rightPopped ? "popped" : ""}`}
                    onClick={() => popHearts("right")}
                    aria-label="Pop right hearts"
                  >
                    {"\uD83C\uDF7E"}
                  </button>
                </>
              ) : null}

              <div className="relative z-20 flex min-h-[16vh] w-full flex-col items-center justify-end pb-2">
                {blown ? (
                  <>
                    <div className="mb-7 flex flex-wrap items-end justify-center gap-3 sm:gap-5">
                      {["starry-eyed-cat.png", "confused-cat.png", "happy-cat.png", "balloons.png"].map(
                        (asset, index) => (
                          <img
                            key={asset}
                            src={`${ASSET}/${asset}`}
                            alt=""
                            className="dance-item sticker h-20 w-20 object-contain sm:h-24 sm:w-24"
                            style={{ animationDelay: `${index * 0.14}s` }}
                          />
                        )
                      )}
                    </div>
                    <button type="button" className="kawaii-btn blue" onClick={() => setStep(9)}>
                      Next <ArrowRight className="h-5 w-5" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )}

          {step === 9 && (
            <Screen>
              <h1 className="text-center text-[clamp(2.6rem,9vw,4.5rem)] font-black leading-tight text-[#d35c82] drop-shadow-[2px_2px_0_rgba(255,255,255,0.75)]">
                {wish.finalMessage || "Thank you for celebrating with me!"}
              </h1>
              <img src={`${ASSET}/happy-cat.png`} alt="" className="cat-bounce sticker mt-8 h-48 w-48 object-contain" />
              <button
                type="button"
                className="kawaii-btn blue mt-10"
                onClick={() => {
                  finaleAudioRef.current?.pause();
                  setGiftClicks(0);
                  setPasscodeAttempt("");
                  setBlown(false);
                  setLeftPopped(false);
                  setRightPopped(false);
                  setStep(1);
                }}
              >
                Play Again <RefreshCcw className="h-5 w-5" />
              </button>
            </Screen>
          )}
        </div>
      </section>

      <KawaiiStyles />
      <style jsx global>{`
        .birthday-kawaii .kawaii-btn.pink {
          background: var(--kawaii-pink);
        }

        .birthday-kawaii .kawaii-btn.yellow {
          background: var(--kawaii-yellow);
        }

        .birthday-kawaii .keypad-button {
          display: flex;
          height: 70px;
          width: 70px;
          align-items: center;
          justify-content: center;
          border: 0;
          background: url("/birthday/assets/round-button-bg.png") center / cover no-repeat;
          color: #fff;
          cursor: pointer;
          filter: drop-shadow(0 5px 10px rgba(92, 58, 33, 0.16));
          font-size: 1.6rem;
          font-weight: 900;
          text-shadow: 1px 1px 2px rgba(92, 58, 33, 0.3);
          transition: transform 0.1s ease;
          user-select: none;
        }

        .birthday-kawaii .keypad-button:active {
          transform: scale(0.9);
        }

        .birthday-kawaii .progress-bar-bg {
          height: 20px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.55);
          box-shadow: inset 0 2px 4px rgba(92, 58, 33, 0.12);
        }

        .birthday-kawaii .progress-bar-fill {
          height: 100%;
          background: var(--kawaii-mint);
          transition: width 0.3s ease;
        }

        .birthday-kawaii .gift-shake {
          animation: gift-bounce 0.8s ease-in-out infinite alternate;
        }

        .birthday-kawaii .magic-spin {
          animation: magic-spin 2s ease-in-out infinite;
        }

        .birthday-kawaii .dance-item {
          animation: birthday-dance 0.7s ease-in-out infinite alternate;
        }

        .birthday-kawaii .ambient-glow {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-color: #111;
          background-image: radial-gradient(circle at 30% 40%, rgba(255, 0, 150, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(0, 150, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(150, 0, 255, 0.15) 0%, transparent 60%);
          animation: disco-pulse 4s infinite alternate ease-in-out;
        }

        .birthday-kawaii .cake-flame {
          position: absolute;
          left: 50%;
          top: 5%;
          height: 35px;
          width: 22px;
          transform: translateX(-50%);
          border-radius: 50% 50% 22% 22%;
          background: #ffdd00;
          box-shadow: 0 0 50px 25px rgba(255, 200, 0, 0.9),
            0 0 100px 50px rgba(255, 100, 0, 0.5);
          animation: candle-flicker 0.15s infinite alternate;
        }

        .birthday-kawaii .light-wire {
          position: absolute;
          z-index: 50;
          margin: 0;
          padding: 0;
          overflow: hidden;
          white-space: nowrap;
          pointer-events: none;
          text-align: center;
        }

        .birthday-kawaii .lights-bottom {
          bottom: -10px;
          left: 50%;
          width: 120vw;
          transform: translate(-50%, 0) rotate(180deg);
        }

        .birthday-kawaii .lights-left {
          left: 0;
          top: 50%;
          width: 120vh;
          transform: translate(-50%, -50%) rotate(-90deg);
        }

        .birthday-kawaii .lights-right {
          right: 0;
          top: 50%;
          width: 120vh;
          transform: translate(50%, -50%) rotate(90deg);
        }

        .birthday-kawaii .light-wire li {
          position: relative;
          display: inline-block;
          margin: 20px;
          height: 25px;
          width: 15px;
          list-style: none;
          border-radius: 50% 50% 30% 30%;
          background: #fff;
          animation: flash-bulb 1s infinite alternate;
        }

        .birthday-kawaii .light-wire li::before {
          content: "";
          position: absolute;
          left: 2.5px;
          top: -8px;
          height: 8px;
          width: 10px;
          border-radius: 3px;
          background: #333;
        }

        .birthday-kawaii .light-wire li::after {
          content: "";
          position: absolute;
          left: 7.5px;
          top: -22px;
          height: 20px;
          width: 55px;
          border-bottom: 2px solid #333;
          border-radius: 50%;
        }

        .birthday-kawaii .light-wire li:last-child::after {
          content: none;
        }

        .birthday-kawaii .light-wire li:nth-child(4n + 1) {
          background: #ff0055;
          box-shadow: 0 5px 24px 8px rgba(255, 0, 85, 1);
          animation-duration: 1.2s;
        }

        .birthday-kawaii .light-wire li:nth-child(4n + 2) {
          background: #00ff55;
          box-shadow: 0 5px 24px 8px rgba(0, 255, 85, 1);
          animation-duration: 1.4s;
        }

        .birthday-kawaii .light-wire li:nth-child(4n + 3) {
          background: #0055ff;
          box-shadow: 0 5px 24px 8px rgba(0, 85, 255, 1);
          animation-duration: 1.1s;
        }

        .birthday-kawaii .light-wire li:nth-child(4n + 4) {
          background: #ffdd00;
          box-shadow: 0 5px 24px 8px rgba(255, 221, 0, 1);
          animation-duration: 1.3s;
        }

        .birthday-kawaii .party-banner {
          position: absolute;
          left: 50%;
          top: 0;
          z-index: 15;
          display: flex;
          width: 100%;
          justify-content: center;
          gap: 5px;
          padding-top: 10px;
          transform: translateX(-50%);
        }

        .birthday-kawaii .bunting {
          display: flex;
          height: 50px;
          width: 40px;
          transform-origin: top center;
          align-items: flex-start;
          justify-content: center;
          padding-top: 10px;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          color: #fff;
          font-size: 1.15rem;
          font-weight: 900;
          text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.22);
          animation: bunting-swing 2s infinite ease-in-out alternate;
        }

        .birthday-kawaii .champagne-pop {
          position: absolute;
          bottom: 25vh;
          z-index: 40;
          border: 0;
          background: transparent;
          font-size: clamp(4.5rem, 9vw, 8rem);
          cursor: pointer;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
          transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .birthday-kawaii .left-pop {
          left: 8vw;
        }

        .birthday-kawaii .right-pop {
          right: 8vw;
          transform: scaleX(-1);
        }

        .birthday-kawaii .left-pop.popped {
          transform: rotate(30deg) scale(0.9);
          opacity: 0.7;
        }

        .birthday-kawaii .right-pop.popped {
          transform: rotate(-30deg) scaleX(-1) scale(0.9);
          opacity: 0.7;
        }

        .birthday-heart-burst {
          position: fixed;
          inset: 0;
          z-index: 10000;
          pointer-events: none;
        }

        .birthday-heart-burst span {
          position: absolute;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
          will-change: transform, opacity;
        }

        .birthday-confetti-layer {
          position: fixed;
          inset: 0;
          z-index: 10020;
          overflow: hidden;
          pointer-events: none;
        }

        .birthday-confetti-layer span {
          position: absolute;
          display: block;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.35);
          will-change: transform, opacity;
        }

        .birthday-kawaii .cat-bounce {
          animation: cat-bounce 0.8s ease-in-out infinite alternate;
        }

        .birthday-kawaii .birthday-pulse {
          animation: birthday-pulse 1.5s infinite;
        }

        @keyframes gift-bounce {
          from {
            transform: rotate(-5deg) scale(1);
          }
          to {
            transform: rotate(5deg) scale(1.04);
          }
        }

        @keyframes magic-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes candle-flicker {
          from {
            opacity: 0.8;
            filter: blur(1px);
            transform: translateX(-50%) scale(1);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateX(-50%) scale(1.1) rotate(2deg);
          }
        }

        @keyframes disco-pulse {
          from {
            filter: hue-rotate(0deg) brightness(1);
          }
          to {
            filter: hue-rotate(90deg) brightness(1.5);
          }
        }

        @keyframes flash-bulb {
          from {
            opacity: 0.35;
          }
          to {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes bunting-swing {
          from {
            transform: rotate(10deg);
          }
          to {
            transform: rotate(-10deg);
          }
        }

        @keyframes birthday-pulse {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes birthday-dance {
          from {
            transform: translateY(0) rotate(-4deg);
          }
          to {
            transform: translateY(-32px) rotate(5deg);
          }
        }

        @media (max-width: 640px) {
          .birthday-kawaii .keypad-button {
            height: 64px;
            width: 64px;
          }

          .birthday-kawaii .champagne-pop {
            bottom: 30vh;
            font-size: 4.2rem;
          }

          .birthday-kawaii .left-pop {
            left: 3vw;
          }

          .birthday-kawaii .right-pop {
            right: 3vw;
          }

          .birthday-kawaii .bunting {
            height: 38px;
            width: 30px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </main>
  );
}

function getCakeFilter(theme: string) {
  switch (theme) {
    case "chocolate":
      return "sepia(0.8) saturate(1.5) hue-rotate(-20deg) brightness(0.65)";
    case "matcha":
      return "sepia(0.5) hue-rotate(60deg) saturate(1.2)";
    case "taro":
      return "hue-rotate(-50deg) saturate(1.2)";
    default:
      return "none";
  }
}

function Screen({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className={
        wide
          ? "flex w-full flex-col items-center justify-center"
          : "flex w-full flex-col items-center justify-center px-2"
      }
    >
      {children}
    </div>
  );
}
