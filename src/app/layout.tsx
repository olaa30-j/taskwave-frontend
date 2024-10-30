"use client";

import localFont from "next/font/local";
import "./globals.css";
import { initialUserData } from "@/store/reducers/authSlice";
import StoreProvider from "@/store/StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider initialData={initialUserData}>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
