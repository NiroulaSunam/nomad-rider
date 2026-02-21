import "./globals.css";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nomad Rider",
  description: "Find the best spots to work and ride",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/" 
      signUpFallbackRedirectUrl="/"
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}>
         
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />    
          
          <Navbar />
        
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}