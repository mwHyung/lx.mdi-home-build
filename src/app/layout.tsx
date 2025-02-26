import { ReactNode } from "react";
import { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { GlobalProvider } from "@/layout";
import { GlobalLayout } from "@/layout";
import "@/app/globals.css";
import { LayoutProvider } from "@/layout/MainLayoutProvider";

export const metadata: Metadata = {
  title: "Mi portal",
  description: "Mi portal",
};

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal", // normal or italic
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={noto_sans_kr.className}>
        <GlobalProvider>
          <LayoutProvider>
            <GlobalLayout>{children}</GlobalLayout>
          </LayoutProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
