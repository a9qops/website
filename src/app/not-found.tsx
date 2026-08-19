import Link from "next/link";
import "./globals.css"; // Ensure css is loaded for root not-found

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-black text-zinc-100 font-sans min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center space-y-8 p-8">
          <h1 className="text-8xl md:text-9xl font-black font-heading tracking-tighter text-white">
            404
          </h1>
          <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
          <p className="text-xl text-zinc-400 max-w-lg mx-auto font-mono uppercase tracking-widest leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-black uppercase tracking-widest rounded bg-amber-500 hover:bg-white transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
