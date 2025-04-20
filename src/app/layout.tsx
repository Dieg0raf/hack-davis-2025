import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { Auth0Provider } from "@auth0/nextjs-auth0";
import {
  ClerkProvider,
  // SignInButton,
  // SignUpButton,
  // SignedIn,
  // SignedOut,
  // UserButton,
} from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SonnySwap",
  description: "Trade and collect Sonny Angel figures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <Auth0Provider> */}
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <ApolloWrapper>{children}</ApolloWrapper>
            </main>
            <Footer />
          </div>
          {/* </Auth0Provider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
