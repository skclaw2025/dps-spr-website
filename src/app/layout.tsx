import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default:  "Delhi Public School SPR Gurugram | Admissions Open 2027",
    template: "%s | DPS SPR Gurugram",
  },
  description:
    "Delhi Public School, Southern Peripheral Road, Gurugram — Opening April 2027. World-class sports, 10+ labs, lush green campus. Admissions open for the Founding Batch. Under the DPS Society, New Delhi.",
  keywords: [
    "DPS SPR", "Delhi Public School Gurugram", "DPS Southern Peripheral Road",
    "best school Gurugram", "school admissions 2027", "DPS Society",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* WhatsApp Quick Contact — appears on every page */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
