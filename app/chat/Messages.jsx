import React from "react";
import Box from "@/components/Box";
import Typewriter from "@/components/ArwesComponents/Typewriter";
import apiFetch from "@/functions/apiFetch";

const Messages = async () => {
  const messages = await apiFetch("api/chat/get", {
    next: { tags: ["get-messages"] },
  })
    .then((res) => res.json())
    .then((res) => res.data);

  return (
    <>
      <Box className="w-full p-6">
        <Typewriter as="h2" manager="decipher" className="text-2xl font-bold">
          Cергей Рузин
        </Typewriter>
        <Typewriter
          as="p"
          className="mt-4 border-l-4 border-solid border-l-text_color pl-4"
        >
          "Эмир превосходно сделал мне адаптивный лендинг, за 2 дня вместо обещанной недели, я в восторге"!
        </Typewriter>
      </Box>
      <Box className="w-full p-6">
        <Typewriter as="h2" manager="decipher" className="text-2xl font-bold">
          Elena Kopylova
        </Typewriter>
        <Typewriter
          as="p"
          className="mt-4 border-l-4 border-solid border-l-text_color pl-4"
        >
          "Броо ты гений если бы ты знал как я страдала без тиктока, спасибо искренне и поклон"
        </Typewriter>
      </Box>
      <Box className="w-full p-6">
        <Typewriter as="h2" manager="decipher" className="text-2xl font-bold">
          Cергей Рузин
        </Typewriter>
        <Typewriter
          as="p"
          className="mt-4 border-l-4 border-solid border-l-text_color pl-4"
        >
          "С твоим впном даже иви думает что я в рф, гениально, как ты вообще что-то понимаешь в сочетаниях этих букв и цифр"
        </Typewriter>
      </Box>
      <Box className="w-full p-6">
        <Typewriter as="h2" manager="decipher" className="text-2xl font-bold">
          Cергей Рузин
        </Typewriter>
        <Typewriter
          as="p"
          className="mt-4 border-l-4 border-solid border-l-text_color pl-4"
        >
          "Сделал мне крутого ии-бота для телеги, буду рекомендовать обращаться"
        </Typewriter>
      </Box>
      {messages &&
        messages.map((data) => (
          <Box key={data._id} className="w-full p-6">
            <Typewriter
              as="h2"
              manager="decipher"
              className="text-2xl font-bold"
            >
              {data.name}
            </Typewriter>
            <Typewriter
              as="p"
              className="mt-4 border-l-4 border-solid border-l-text_color pl-4"
            >
              {data.message}
            </Typewriter>
          </Box>
        ))}
    </>
  );
};

export default Messages;
