import React from "react";
import { SiSpinrilla } from "react-icons/si";

const LoadingPage = () => {
  return (
    <section className="flex h-[90vh] w-full items-center justify-center font-mono">
      <h1 className="flex gap-4 text-4xl font-bold">
        <SiSpinrilla className="animate-spin" />
        Загрузка...
      </h1>
    </section>
  );
};

export default LoadingPage;
