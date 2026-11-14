"use client";

import { useEffect } from "react";
import Button from "../Button";
import { IoIosArrowUp } from "react-icons/io";
import styles from "./ToTopButton.module.css";

const ToTopButton = () => {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollFunction = () => {
      const mybutton = document.getElementsByClassName("toTopButton")[0];
      if (!mybutton) return;
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        mybutton.style.display = "flex";
      } else {
        mybutton.style.display = "none";
      }
    };

    scrollFunction();
    window.addEventListener("scroll", scrollFunction, { passive: true });
    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  return (
    <Button className={`${styles.scrollButton} toTopButton`} onClick={toTop}>
      <IoIosArrowUp />
    </Button>
  );
};

export default ToTopButton;
