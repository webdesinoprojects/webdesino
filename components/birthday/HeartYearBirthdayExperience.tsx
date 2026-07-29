"use client";

import { useId, useRef, useState } from "react";
import type { BirthdayWish } from "@/lib/birthday-actions";

const ASSET = "/birthday/assets/template3";

type HeartStep = 1 | 2 | 3 | 4 | 5 | 6;

export default function HeartYearBirthdayExperience({ wish }: { wish: BirthdayWish }) {
  const [step, setStep] = useState<HeartStep>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function goTo(nextStep: HeartStep) {
    setStep(nextStep);
    void audioRef.current?.play().catch(() => undefined);
  }

  return (
    <main className="heart-year-app">
      {wish.music?.url ? <audio ref={audioRef} src={wish.music.url} loop preload="auto" /> : null}

      {step === 1 ? <IntroSlide wish={wish} goTo={goTo} /> : null}
      {step === 2 ? <WrongChoiceSlide wish={wish} goTo={goTo} /> : null}
      {step === 3 ? <BirthdayRevealSlide wish={wish} goTo={goTo} /> : null}
      {step === 4 ? <WishSlide wish={wish} goTo={goTo} /> : null}
      {step === 5 ? <HugSlide wish={wish} goTo={goTo} /> : null}
      {step === 6 ? <FinalHeartSlide wish={wish} /> : null}

      <HeartYearStyles />
    </main>
  );
}

function IntroSlide({ wish, goTo }: { wish: BirthdayWish; goTo: (step: HeartStep) => void }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  function moveNoButton() {
    const maxOffset = 130;
    setNoPos({
      x: Math.random() * maxOffset * 2 - maxOffset,
      y: Math.random() * maxOffset * 2 - maxOffset,
    });
  }

  return (
    <HeartScreen>
      <h1 className="heart-title intro-title">
        {getCopyText(wish, "heartIntroTitle", "I made something special for u\ndo u wanna see it?")}
      </h1>
      <img className="heart-asset intro-bear" src={`${ASSET}/img-11.png`} alt="" />
      <div className="heart-actions">
        <button type="button" onClick={() => goTo(3)}>
          {getCopyText(wish, "heartYesButton", "YES")}
        </button>
        <button
          type="button"
          className="runaway-button"
          onMouseEnter={moveNoButton}
          onFocus={moveNoButton}
          onClick={() => goTo(2)}
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
          }}
        >
          {getCopyText(wish, "heartNoButton", "NO")}
        </button>
      </div>
    </HeartScreen>
  );
}

function WrongChoiceSlide({ wish, goTo }: { wish: BirthdayWish; goTo: (step: HeartStep) => void }) {
  return (
    <HeartScreen>
      <h1 className="heart-title">{getCopyText(wish, "heartWrongTitle", "Why did u click no!?")}</h1>
      <img className="heart-asset wrong-bear" src={`${ASSET}/img-12.png`} alt="" />
      <button type="button" onClick={() => goTo(1)}>
        {getCopyText(wish, "heartTryAgainButton", "TRY AGAIN")}
      </button>
    </HeartScreen>
  );
}

function BirthdayRevealSlide({ wish, goTo }: { wish: BirthdayWish; goTo: (step: HeartStep) => void }) {
  return (
    <HeartScreen>
      <h1 className="heart-title birthday-title">
        {getCopyText(wish, "heartBirthdayTitle", "HAPPY BIRTHDAY")}
      </h1>
      <img className="heart-asset cake-bear" src={`${ASSET}/img-14.png`} alt="" />
      <img className="corner-gift" src={`${ASSET}/img-11.png`} alt="" />
      <p className="gift-caption">{getCopyText(wish, "heartBirthdayCaption", "I am ur gift")}</p>
      <button type="button" onClick={() => goTo(4)}>
        {getCopyText(wish, "heartBirthdayButton", "CLICK ME!")}
      </button>
    </HeartScreen>
  );
}

function WishSlide({ wish, goTo }: { wish: BirthdayWish; goTo: (step: HeartStep) => void }) {
  return (
    <HeartScreen className="wish-slide">
      <img className="wish-deco wish-gift" src={`${ASSET}/img-11.png`} alt="" />
      <img className="wish-deco wish-cake" src={`${ASSET}/img-13.png`} alt="" />
      <div className="wish-card">
        <span className="wish-kicker">For {wish.recipientName}</span>
        <h1 className="heart-title wish-title">
          {getCopyText(wish, "heartWishTitle", "MY WISH FOR U")}
        </h1>
        <div className="wish-paper">
          <p>{wish.message || getDefaultWishMessage(wish.recipientName)}</p>
        </div>
      </div>
      <button type="button" className="next-corner" onClick={() => goTo(5)}>
        {getCopyText(wish, "heartWishButton", "CLICK ME!")}
      </button>
    </HeartScreen>
  );
}

function HugSlide({ wish, goTo }: { wish: BirthdayWish; goTo: (step: HeartStep) => void }) {
  return (
    <HeartScreen>
      <h1 className="heart-title hug-title">{getCopyText(wish, "heartHugTitle", "Virtual hug for ya!")}</h1>
      <img className="heart-asset hug-bear" src={`${ASSET}/img-16.png`} alt="" />
      <h2 className="miss-title">{getCopyText(wish, "heartHugCaption", "I MISS YOU")}</h2>
      <button type="button" className="next-corner" onClick={() => goTo(6)}>
        {getCopyText(wish, "heartHugButton", "CLICK ME!")}
      </button>
    </HeartScreen>
  );
}

function FinalHeartSlide({ wish }: { wish: BirthdayWish }) {
  const photos = wish.memories.slice(0, 3);
  const heartClipId = useStableSvgId("heart-final");
  const leftClipId = useStableSvgId("heart-left");
  const rightClipId = useStableSvgId("heart-right");
  const bottomClipId = useStableSvgId("heart-bottom");

  return (
    <HeartScreen className="final-heart-slide">
      <h1 className="heart-title final-title">
        {getCopyText(wish, "heartFinalTitle", "Have a great year ahead")}
      </h1>
      <div className="photo-heart-frame" aria-label="Birthday heart photos">
        <svg className="photo-heart-svg" viewBox="0 0 360 330" role="img">
          <defs>
            <clipPath id={heartClipId}>
              <path d="M180 307C82 219 30 169 30 101C30 52 68 24 111 24C141 24 164 39 180 63C196 39 219 24 249 24C292 24 330 52 330 101C330 169 278 219 180 307Z" />
            </clipPath>
            <clipPath id={leftClipId}>
              <path d="M180 198H70C44 168 30 137 30 101C30 52 68 24 111 24C141 24 164 39 180 63V198Z" />
            </clipPath>
            <clipPath id={rightClipId}>
              <path d="M180 198H290C316 168 330 137 330 101C330 52 292 24 249 24C219 24 196 39 180 63V198Z" />
            </clipPath>
            <clipPath id={bottomClipId}>
              <path d="M70 198H290C267 224 231 261 180 307C129 261 93 224 70 198Z" />
            </clipPath>
          </defs>

          <rect width="360" height="330" fill="#ffc7d7" clipPath={`url(#${heartClipId})`} />
          <HeartImage photoUrl={photos[0]?.url} clipId={leftClipId} fallback="#a7d8ff" />
          <HeartImage photoUrl={photos[1]?.url} clipId={rightClipId} fallback="#bceaff" />
          <HeartImage photoUrl={photos[2]?.url} clipId={bottomClipId} fallback="#7ee8c7" />
          <path
            d="M180 307C82 219 30 169 30 101C30 52 68 24 111 24C141 24 164 39 180 63C196 39 219 24 249 24C292 24 330 52 330 101C330 169 278 219 180 307Z"
            fill="none"
            stroke="#fff"
            strokeWidth="10"
            strokeLinejoin="round"
          />
          <path d="M180 63V198" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
          <path d="M70 198H290" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        </svg>
      </div>
      <p className="heart-date">{getDateText(wish, "heartFinalDate", "02.03.2026")}</p>
    </HeartScreen>
  );
}

function HeartImage({
  photoUrl,
  clipId,
  fallback,
}: {
  photoUrl?: string;
  clipId: string;
  fallback: string;
}) {
  return photoUrl ? (
    <image
      href={photoUrl}
      x="0"
      y="0"
      width="360"
      height="330"
      preserveAspectRatio="xMidYMid slice"
      clipPath={`url(#${clipId})`}
    />
  ) : (
    <rect width="360" height="330" fill={fallback} clipPath={`url(#${clipId})`} />
  );
}

function HeartScreen({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`heart-screen ${className}`}>
      <HeartBg />
      <div className="heart-slide">{children}</div>
    </section>
  );
}

function HeartBg() {
  return (
    <div className="heart-bg-wrapper" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="100%" height="100%" fill="#f7f8fa" />
        <path
          d="M50,85 C50,85 10,50 10,25 C10,10 25,0 40,10 C50,20 50,20 50,20 C50,20 50,20 60,10 C75,0 90,10 90,25 C90,50 50,85 50,85 Z"
          fill="#faeff4"
          transform="translate(50, 50) scale(1.45) translate(-50, -50)"
        />
        <path
          d="M50,85 C50,85 10,50 10,25 C10,10 25,0 40,10 C50,20 50,20 50,20 C50,20 50,20 60,10 C75,0 90,10 90,25 C90,50 50,85 50,85 Z"
          fill="#fdebf1"
          transform="translate(50, 50) scale(1.02) translate(-50, -50)"
        />
        <path
          d="M50,85 C50,85 10,50 10,25 C10,10 25,0 40,10 C50,20 50,20 50,20 C50,20 50,20 60,10 C75,0 90,10 90,25 C90,50 50,85 50,85 Z"
          fill="#ffdae4"
          transform="translate(50, 50) scale(0.68) translate(-50, -50)"
        />
        <path
          d="M50,85 C50,85 10,50 10,25 C10,10 25,0 40,10 C50,20 50,20 50,20 C50,20 50,20 60,10 C75,0 90,10 90,25 C90,50 50,85 50,85 Z"
          fill="#ffc7d7"
          transform="translate(50, 50) scale(0.4) translate(-50, -50)"
        />
      </svg>
    </div>
  );
}

function getCopyText(wish: BirthdayWish, key: string, fallback: string) {
  const value = wish.copy?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function getDateText(wish: BirthdayWish, key: string, fallback: string) {
  const value = getCopyText(wish, key, fallback).replace(/[^\d./-]/g, "");
  return value || fallback;
}

function useStableSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/:/g, "")}`;
}

function getDefaultWishMessage(name: string) {
  return `I hope your future brings you endless happiness, success, and peace in everything you do. May every dream you hold in your heart slowly come true, ${name}.`;
}

function HeartYearStyles() {
  return (
    <style jsx global>{`
      .heart-year-app {
        min-height: 100svh;
        overflow: hidden;
        background: #ffe6eb;
        color: #d11a2a;
        font-family: "Comic Sans MS", "Chalkboard SE", "Marker Felt", "Trebuchet MS", system-ui, sans-serif;
      }

      .heart-year-app button {
        border: 4px solid #fff;
        border-radius: 999px;
        background: #d11a2a;
        padding: 10px 34px;
        color: #fff;
        font: inherit;
        font-size: clamp(1rem, 2vw, 1.45rem);
        font-weight: 900;
        cursor: pointer;
        box-shadow: 0 8px 18px rgba(129, 24, 42, 0.18);
        transition: transform 0.14s ease, box-shadow 0.14s ease;
      }

      .heart-year-app button:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 11px 24px rgba(129, 24, 42, 0.22);
      }

      .heart-screen {
        position: relative;
        display: flex;
        min-height: 100svh;
        width: 100vw;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .heart-bg-wrapper {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }

      .heart-bg-wrapper svg {
        height: 100%;
        width: 100%;
      }

      .heart-slide {
        position: relative;
        z-index: 1;
        display: flex;
        min-height: min(620px, 100svh);
        width: min(900px, 100vw);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: clamp(18px, 4vw, 44px);
        text-align: center;
        animation: heartFadeIn 0.42s ease both;
      }

      .heart-title {
        position: relative;
        z-index: 2;
        margin: 0 0 22px;
        color: #d11a2a;
        font-size: clamp(2.2rem, 5.4vw, 4.4rem);
        font-weight: 900;
        line-height: 1.05;
        white-space: pre-line;
        text-shadow:
          2px 2px 0 #fff,
          -2px -2px 0 #fff,
          2px -2px 0 #fff,
          -2px 2px 0 #fff;
      }

      .intro-title {
        font-size: clamp(1.9rem, 4.8vw, 3.5rem);
      }

      .heart-asset {
        position: relative;
        z-index: 1;
        display: block;
        max-width: min(46vw, 390px);
        max-height: min(46vh, 390px);
        object-fit: contain;
        filter: drop-shadow(0 14px 20px rgba(129, 24, 42, 0.16));
      }

      .intro-bear {
        max-width: min(48vw, 360px);
      }

      .wrong-bear,
      .hug-bear {
        max-width: min(50vw, 430px);
      }

      .cake-bear {
        max-width: min(46vw, 380px);
      }

      .heart-actions {
        position: relative;
        z-index: 5;
        display: flex;
        min-height: 70px;
        align-items: center;
        justify-content: center;
        gap: 22px;
      }

      .runaway-button {
        transition: transform 0.16s ease-out;
      }

      .corner-gift {
        position: fixed;
        bottom: 18px;
        left: 18px;
        z-index: 2;
        width: min(18vw, 170px);
        object-fit: contain;
        filter: drop-shadow(0 12px 16px rgba(129, 24, 42, 0.14));
      }

      .gift-caption,
      .miss-title,
      .heart-date {
        position: relative;
        z-index: 2;
        margin: 14px 0 18px;
        color: #d11a2a;
        font-size: clamp(1.7rem, 4vw, 3rem);
        font-style: italic;
        font-weight: 900;
        text-shadow: 1px 1px 0 #fff;
      }

      .wish-slide .heart-slide {
        width: min(1080px, 100vw);
      }

      .wish-card {
        position: relative;
        z-index: 3;
        width: min(760px, 90vw);
        border: 4px solid #ffb3c6;
        border-radius: 36px;
        background:
          linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)),
          repeating-linear-gradient(0deg, transparent 0 34px, rgba(255, 179, 198, 0.28) 35px 36px);
        padding: clamp(22px, 4vw, 40px);
        box-shadow: 0 22px 45px rgba(129, 24, 42, 0.14);
      }

      .wish-card::before,
      .wish-card::after {
        position: absolute;
        top: -18px;
        height: 42px;
        width: 92px;
        border-radius: 12px;
        background: #ffd9a8;
        box-shadow: inset 0 0 0 3px rgba(139, 76, 45, 0.12);
        content: "";
        transform: rotate(-8deg);
      }

      .wish-card::before {
        left: 8%;
      }

      .wish-card::after {
        right: 8%;
        transform: rotate(8deg);
      }

      .wish-kicker {
        display: inline-flex;
        margin-bottom: 12px;
        border-radius: 999px;
        background: #ffe1eb;
        padding: 8px 18px;
        color: #d11a2a;
        font-size: 0.95rem;
        font-weight: 900;
        box-shadow: inset 0 0 0 2px rgba(209, 26, 42, 0.08);
      }

      .wish-title {
        margin-bottom: 18px;
      }

      .wish-paper {
        position: relative;
        z-index: 2;
        width: 100%;
        border: 3px dashed rgba(209, 26, 42, 0.26);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.78);
        padding: clamp(18px, 4vw, 32px);
      }

      .wish-paper p {
        margin: 0;
        color: #14305c;
        font-size: clamp(0.98rem, 2vw, 1.18rem);
        font-weight: 900;
        line-height: 1.65;
      }

      .wish-deco {
        position: absolute;
        z-index: 2;
        width: clamp(120px, 16vw, 220px);
        object-fit: contain;
        filter: drop-shadow(0 16px 18px rgba(129, 24, 42, 0.16));
        pointer-events: none;
      }

      .wish-gift {
        left: clamp(10px, 5vw, 90px);
        bottom: clamp(22px, 7vw, 110px);
        transform: rotate(-9deg);
      }

      .wish-cake {
        right: clamp(10px, 5vw, 90px);
        top: clamp(72px, 10vw, 150px);
        transform: rotate(8deg);
      }

      .next-corner {
        position: absolute;
        right: clamp(16px, 5vw, 28px);
        bottom: clamp(16px, 4vw, 28px);
        z-index: 10;
        background: #ffb3c6 !important;
        color: #d11a2a !important;
        border-color: #d11a2a !important;
        font-size: 1rem !important;
      }

      .final-title {
        margin-bottom: 30px;
        font-size: clamp(2.2rem, 5.2vw, 4rem);
      }

      .photo-heart-frame {
        position: relative;
        z-index: 1;
        width: clamp(260px, 30vw, 390px);
        aspect-ratio: 360 / 330;
        filter: drop-shadow(0 18px 24px rgba(129, 24, 42, 0.15));
      }

      .photo-heart-svg {
        display: block;
        height: 100%;
        width: 100%;
      }

      .heart-date {
        margin-top: 36px;
        font-size: clamp(1.8rem, 4vw, 2.6rem);
      }

      @keyframes heartFadeIn {
        from {
          opacity: 0;
          transform: scale(0.96);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @media (max-width: 640px) {
        .heart-slide {
          min-height: 100svh;
          padding: 18px 14px;
        }

        .heart-title {
          margin-bottom: 16px;
          font-size: clamp(2rem, 10vw, 3.1rem);
        }

        .intro-title {
          font-size: clamp(1.45rem, 7.8vw, 2.35rem);
        }

        .heart-asset {
          max-width: 76vw;
          max-height: 34vh;
        }

        .heart-actions {
          gap: 14px;
        }

        .heart-year-app button {
          padding: 9px 25px;
          font-size: 1rem;
        }

        .corner-gift {
          width: 120px;
          opacity: 0.72;
        }

        .wish-paper {
          max-height: 48vh;
          overflow: auto;
        }

        .wish-card {
          width: min(92vw, 430px);
          padding: 22px 18px;
        }

        .wish-deco {
          width: 96px;
          opacity: 0.58;
        }

        .wish-gift {
          left: -14px;
          bottom: 82px;
        }

        .wish-cake {
          right: -10px;
          top: 90px;
        }

        .next-corner {
          right: 14px;
          bottom: 14px;
        }

        .photo-heart-frame {
          width: min(76vw, 310px);
        }

        .heart-date {
          margin-top: 28px;
        }
      }
    `}</style>
  );
}
