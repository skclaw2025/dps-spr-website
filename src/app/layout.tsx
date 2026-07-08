import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton    from "@/components/shared/WhatsAppButton";
import AdmissionTrigger  from "@/components/shared/AdmissionTrigger";

export const metadata: Metadata = {
  title: {
    default:  "Delhi Public School SPR Gurugram | Admissions Open 2027",
    template: "%s | DPS SPR Gurugram",
  },
  description:
    "Delhi Public School, Southern Peripheral Road, Gurugram — Opening April 2027. Admissions open for the Founding Batch. Under the DPS Society, New Delhi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Floating buttons — appear on every page */}
        <WhatsAppButton />
        <AdmissionTrigger />
      </body>
    </html>
  );
}
