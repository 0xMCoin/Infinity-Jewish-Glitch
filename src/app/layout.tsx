import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dancing Rat - Meme Coin",
  description: "The next big thing in crypto - Dancing Rat is here to rule the meme world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#000',
                color: '#fff',
                border: '2px solid #fbbf24',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
