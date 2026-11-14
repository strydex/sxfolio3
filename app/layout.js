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

const cyberpunk = LocalFont({
  src: "../fonts/Cyberpunk-Regular.ttf",
  variable: "--font-cyberpunk",
  display: "swap",
});

export const metadata = {
  title: "Emir Strydex — AI Agent Architect & Full-Stack Systems Engineer",
  description:
    "Autonomous AI Agents, B2B RAG pipelines, CRM/1C integrations, and high-load web systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cyberpunk.variable} bg-background font-mono text-text_color`}
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
