"use client";

import React, { useEffect } from "react";

const SoundsProvider = () => {
  useEffect(() => {
    const clickAudio = document.getElementById("sound-click");
    if (!clickAudio) return;

    // Single delegated listener for the entire document
    const handleGlobalClick = (e) => {
      if (e.target && e.target.closest("button, a, summary")) {
        clickAudio.currentTime = 0;
        clickAudio.play()?.catch(() => {});
      }
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <>
      <audio id="sound-intro" src="/sounds/intro.mp3" preload="none"></audio>
      <audio id="sound-click" src="/sounds/click.mp3" preload="none"></audio>
    </>
  );
};

export default SoundsProvider;
