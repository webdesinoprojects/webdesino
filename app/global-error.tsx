"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Application Error
            </h1>
            <p className="text-slate-600 mb-8">
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              className="bg-[#111184] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#111184]/90 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

