import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { manrope } from "@/utils/fonts";


export const metadata: Metadata = {
  title: "Memoralis",
  description: "Application d'apprentissage progressif de textes par cœur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/jacquard-24"
        />
      </head>
      <body className={`${manrope.className} font-sans`}>
          {children}
      </body>
    </html>
  );
}
