import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Youth Leaders Path | مسار القادة الشباب",
  description:
    "A national program by the UAE Federal Youth Authority empowering Emirati youth 13-18 through a digital and experiential leadership journey.",
};

const setInitialLangScript = `
(function () {
  var saved = window.localStorage.getItem('ylp-language');
  var lang = saved === 'en' ? 'en' : 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialLangScript }} />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
