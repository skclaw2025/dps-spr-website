import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <p className="t-label text-gold mb-4">404</p>
      <h1 className="t-h1 text-ink mb-4">Page not found</h1>
      <p className="t-body text-muted max-w-sm mb-10">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-green">Back to Home</Link>
    </div>
  );
}
