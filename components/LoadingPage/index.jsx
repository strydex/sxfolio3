import React from "react";
import LocalFont from "next/font/local";
import { SiSpinrilla } from "react-icons/si";

const share_tech_mono = LocalFont({
  src: "../../fonts/ShareTechMono.woff2",
  display: "swap",
});

const LoadingPage = () => {
  return (
    <section
      className={`flex h-[90vh] w-full items-center justify-center ${share_tech_mono.className}`}
    >
      <h1 className="flex gap-4 text-4xl font-bold">
        <SiSpinrilla className="animate-spin" />
        Loading...
      </h1>
    </section>
  );
};

export default LoadingPage;
