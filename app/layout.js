import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Yog-Guru",


  description: "Discover the ancient practice of yoga with step-by-step guides, lifestyle plans, and personalized consultations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          <main className="pb-10">{children}</main>
          <Footer />

        </SessionProvider>
      </body>
        <script src='https://www.noupe.com/embed/01991e01f90478ac8819e505f52082e3427c.js'></script>
    </html>

  );
}
