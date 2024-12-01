"use client";

import React, { useState } from "react";
import Button from "../Button";
import Input from "./Input";
import emailjs from "@emailjs/browser";
// import * as toast from "@/components/ToastComponent";
import { EMAILJS_CONFIG } from "@/data/contants";
import { SiSpinrilla } from "react-icons/si";

const Form = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [isSending, setIsSending] = useState(false);

  const clear = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const submit = (e) => {
    e.preventDefault();
    setIsSending(true);
  
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const message = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
  
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          console.log("Сообщение отправлено");
          clear();
        } else {
          console.error("Ошибка при отправке сообщения");
        }
      })
      .catch((error) => {
        console.error("Ошибка при отправке сообщения:", error);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <form className="flex flex-wrap justify-end" onSubmit={submit}>
      <div className="flex w-full flex-col p-2 sm:w-1/2">
        <label htmlFor="name">Имя</label>
        <Input
          type="text"
          id="name"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full flex-col p-2 sm:w-1/2">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full flex-col p-2">
        <label htmlFor="message">Сообщение</label>
        <Input
          isTextarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Написать сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></Input>
      </div>
      <Button type={"submit"} disabled={isSending}>
        {isSending ? (
          <span>
            <SiSpinrilla className="animate-spin" /> Отправляем...
          </span>
        ) : (
          <span>Отправить</span>
        )}
      </Button>
    </form>
  );
};

export default Form;
