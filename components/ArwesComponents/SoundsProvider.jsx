"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SoundsProvider = () => {
  const pathname = usePathname();

  useEffect(() => {
    const click = document.getElementById("sound-click");
    if (!click) return;
    const playClick = () => {
      click.play()?.catch(() => {});
    };
    const elements = document.querySelectorAll("button, a, summary");
    elements.forEach((el) => el.addEventListener("click", playClick));
    return () => {
      elements.forEach((el) => el.removeEventListener("click", playClick));
    };
  }, [pathname]);

  useEffect(() => {
    const intro = document.getElementById("sound-intro");
    intro?.play()?.catch(() => {});
  }, []);

  return (
    <>
      <audio id="sound-intro" src="/sounds/intro.mp3"></audio>
      <audio id="sound-click" src="/sounds/click.mp3"></audio>
    </>
  );
};

export default SoundsProvider;
