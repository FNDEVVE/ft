import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "FT TASK",
  description: "FNDEVVE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
