"use client";

import React, { useState } from "react";
import Button from "../Button";
import Input from "./Input";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/data/contants";
import { SiSpinrilla } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

const Form = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const clear = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const submit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("");
    const templateParams = {
      from_name: name,
      email: email,
      subject: "New B2B Inquiry from sxfolio",
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
          setStatus(t.contact.sent);
          clear();
        },
        () => {
          setStatus(t.contact.error);
        },
      )
      .finally(() => setIsSending(false));
  };

  return (
    <form className="flex w-full flex-wrap justify-end" onSubmit={submit}>
      <div className="flex w-full flex-col p-2 sm:w-1/2">
        <label htmlFor="name">{t.contact.name}</label>
        <Input
          type="text"
          id="name"
          placeholder={t.contact.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full flex-col p-2 sm:w-1/2">
        <label htmlFor="email">{t.contact.email}</label>
        <Input
          type="text"
          id="email"
          placeholder={t.contact.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full flex-col p-2">
        <label htmlFor="message">{t.contact.message}</label>
        <Input
          isTextarea
          name="message"
          id="message"
          cols="30"
          rows="6"
          placeholder={t.contact.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      {status && (
        <div className="w-full p-2 font-mono text-sm text-primary">
          {status}
        </div>
      )}
      <div className="p-2">
        <Button type="submit" disabled={isSending}>
          {isSending ? (
            <span className="flex items-center gap-2">
              <SiSpinrilla className="animate-spin" /> {t.contact.sending}
            </span>
          ) : (
            <span>{t.contact.send}</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default Form;
