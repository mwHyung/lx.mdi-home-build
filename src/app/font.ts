import localFont from "next/font/local";

const NotoSansKR = localFont({
  src: "../../public/fonts/NotoSansKRVariableFont.ttf",
  display: "swap",
  weight: "100 900",
  variable: "--font-notosans",
});

export { NotoSansKR };
