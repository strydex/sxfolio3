import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocalFont from "next/font/local";
import SoundsProvider from "@/components/ArwesComponents/SoundsProvider";
import MobileMenu from "@/components/MobileMenu";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/context/LanguageContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const vt323 = LocalFont({
  src: "../fonts/VT323.woff2",
  variable: "--font-vt323",
  display: "swap",
});
const electrolize = LocalFont({
  src: "../fonts/Electrolize.woff2",
  variable: "--font-electrolize",
  display: "swap",
});
const share_tech_mono = LocalFont({
  src: "../fonts/ShareTechMono.woff2",
  variable: "--font-share-tech-mono",
  display: "swap",
});
const cyberpunk = LocalFont({
  src: "../fonts/Cyberpunk-Regular.ttf",
  variable: "--font-cyberpunk",
  display: "swap",
});

export const metadata = {
  title: "Emir Strydex — AI Solutions & Full-Stack Systems",
  description:
    "AI assistants, automated sales & CRM pipelines, and web platforms for modern business.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${vt323.variable} ${electrolize.className} ${share_tech_mono.variable} ${cyberpunk.variable} bg-background text-text_color`}
      >
        <LanguageProvider>
          <SoundsProvider />
          <ScrollToTop />
          <MobileMenu />
          <Header />
          {children}
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
