import Link from "next/link";

// Global fallback for paths the locale middleware never matched — it renders
// outside [locale], so it carries its own <html> and stays untranslated.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold tracking-tighter">404</h1>
        <p>Page not found</p>
        <Link href="/" className="underline">
          Go home
        </Link>
      </body>
    </html>
  );
}
