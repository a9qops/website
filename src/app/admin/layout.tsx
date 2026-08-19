 
import { Metadata } from 'next';
import '../globals.css'; // Make sure styles are applied

export const metadata: Metadata = {
  title: 'Admin Dashboard | Nine Portfolio',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-black text-zinc-100 selection:bg-amber-500/30 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
