import Link from "next/link";

type NewsTickerItem = {
  id: string;
  text: string;
  href?: string;
};

const ITEMS: NewsTickerItem[] = [
  { id: "n1", text: "₹1Cr+ spent on Facebook Ads", href: "/blog" },
  { id: "n2", text: "6.3Cr+ sales generated for clients" },
  { id: "n3", text: "500% ROI on performance campaigns" },
  { id: "n4", text: "3x boost in leads & calls" },
  { id: "n5", text: "375% lead conversion lift" },
  { id: "n6", text: "150+ projects delivered" },
  { id: "n7", text: "SEO-ready, mobile-first websites" },
  { id: "n8", text: "Transparent weekly reporting" },
];

export default function NewsTicker() {
  return (
    <section className="relative -mt-2 px-4 sm:px-6">
      <div
        className="relative mx-auto max-w-6xl rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur-sm overflow-hidden"
        aria-label="Credibility highlights"
      >
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/95 via-white/85 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/95 via-white/85 to-transparent pointer-events-none" />

        <div className="newsTicker">
          <div className="newsTickerTrack" aria-hidden="true">
            <div className="newsTickerGroup">
              {ITEMS.map((item) => (
                <TickerPill key={`a-${item.id}`} item={item} />
              ))}
            </div>
            <div className="newsTickerGroup">
              {ITEMS.map((item) => (
                <TickerPill key={`b-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        <span className="sr-only">
          Credibility highlights. Auto-scrolling.
        </span>

        <style>{`
          .newsTicker{
            height: 56px;
            display:flex;
            align-items:center;
            overflow:hidden;
            --duration: 30s;
          }

          .newsTickerTrack{
            display:flex;
            width: max-content;
            will-change: transform;
            animation: newsTickerScroll var(--duration) linear infinite;
            gap: 0px;
          }

          .newsTickerGroup{
            display:flex;
            align-items:center;
            gap: 14px;
          }

          @keyframes newsTickerScroll{
            from{ transform: translateX(0); }
            to{ transform: translateX(-50%); }
          }

          @media (hover:hover){
            .newsTicker:hover .newsTickerTrack{
              animation-play-state: paused;
            }
          }

          @media (max-width: 640px){
            .newsTicker{
              height: 50px;
              --duration: 20s;
            }
            .newsTickerPill{
              padding-left: 12px;
              padding-right: 12px;
            }
          }

          @media (prefers-reduced-motion: reduce){
            .newsTickerTrack{
              animation: none;
              transform: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function TickerPill({ item }: { item: NewsTickerItem }) {
  const pill = (
    <span className="newsTickerPill inline-flex items-center whitespace-nowrap text-slate-700 text-sm leading-none font-semibold px-4 py-2 rounded-full border border-slate-200/80 bg-white/70">
      {item.text}
    </span>
  );

  if (!item.href) return pill;

  return (
    <Link href={item.href} className="inline-flex">
      {pill}
    </Link>
  );
}

