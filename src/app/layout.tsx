import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { TanStackProvider } from "../lib/TanstackProvider";
import localFont from "next/font/local";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Aura.ai",
  description: "The fastest way to generate high quality AI images",
};

const geistSans = Quicksand({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const gothic = localFont({
  src: [
    {
      path: "./fonts/gothic/SansSerifFLF.otf",
      weight: "400",
      style: "normal",
    },
    // {
    //   path: "./Roboto-Italic.woff2",
    //   weight: "400",
    //   style: "italic",
    // },
    // {
    //   path: "./Roboto-Bold.woff2",
    //   weight: "700",
    //   style: "normal",
    // },
    // {
    //   path: "./Roboto-BoldItalic.woff2",
    //   weight: "700",
    //   style: "italic",
    // },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <TanStackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
