"use client";

import React, { useState } from "react";
import Link from "next/link";
import BlinkingText from "../BlinkingText";
import CyberpunkFont from "../CyberpunkFont";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { BsDiscord, BsGithub, BsLinkedin, BsTelegram } from "react-icons/bs";

const MobileMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState();

  const copyDiscord = () => {
    navigator.clipboard.writeText("sleepingbtw");
    alert("Скопированный пользователь");
  };

  return (
    <>
      {menuIsOpen ? (
        <div className="fixed z-20 h-screen w-screen bg-background">
          <button
            className="absolute right-8 top-8 text-4xl"
            onClick={() => setMenuIsOpen(false)}
          >
            <BiX />
          </button>
          <div className="flex h-1/4 flex-col items-center justify-center bg-black">
            <CyberpunkFont className="text-4xl">Emir Strydex</CyberpunkFont>
            <BlinkingText>• メニュー •</BlinkingText>
          </div>
          <nav className="flex h-2/4 flex-col items-center justify-center gap-4 text-2xl">
            <Link href={"/"} onClick={() => setMenuIsOpen(false)}>
              Главная
            </Link>
            <Link href={"/chat"} onClick={() => setMenuIsOpen(false)}>
              Отзывы
            </Link>
            <Link href={"/github"} onClick={() => setMenuIsOpen(false)}>
              GitHub
            </Link>
          </nav>
          <div className="flex h-1/4 items-center justify-center gap-4">
            <a
              className="text-2xl hover:opacity-50"
              href="https://github.com/strydex"
              target="_blank"
            >
              <BsGithub />
            </a>
            <a
              className="text-2xl hover:opacity-50"
              href="https://t.me/strydex"
              target="_blank"
            >
              <BsTelegram />
            </a>
          </div>
        </div>
      ) : (
        <button
          className="absolute right-8 top-8 block text-4xl sm:hidden"
          onClick={() => setMenuIsOpen(true)}
        >
          <BiMenuAltRight />
        </button>
      )}
    </>
  );
};

export default MobileMenu;
