import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/theme-context";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p"
});

export const metadata: Metadata = {
  title: "Rodolfo The Rat - Meme Coin",
  description:
    "The next big thing in crypto - Rodolfo The Rat is here to rule the meme world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" sizes="64x64" />
      </head>
      <body className={`${inter.className} ${pressStart2P.variable}`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#000",
                color: "#fff",
                border: "2px solid rgb(16, 185, 129)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
