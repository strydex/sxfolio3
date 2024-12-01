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
    const templateParams = {
      from_name: name,
      email: email,
      subject: "Новое сообщение c портфолио",
      message: message,
    };
    emailjs
      .send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.templateID,
        templateParams,
        EMAILJS_CONFIG.publicKey,
      )
      .then(
        () => {
          // toast.success("Mensagem enviada");
          console.log("Сообщение отправлено");
          clear();
        },
        (err) => {
          // toast.error("Erro ao enviar mensagem");
          console.error(err);
        },
      )
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
