import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connic AI - Marketing Copy That Converts",
  description: "Generate targeted marketing campaigns tailored to specific audiences and optimized for every social platform in seconds.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Connic AI - Marketing Copy That Converts",
    description: "Generate targeted marketing campaigns tailored to specific audiences and optimized for every social platform in seconds.",
    url: "https://connic.ai",
    siteName: "Connic AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen text-foreground selection:bg-primary/20`}
      >
        <div className="fixed inset-0 -z-10 h-full w-full bg-neutral-950">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 animate-gradient-xy"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
