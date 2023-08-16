"use client";

import React, { useState } from "react";

import OurButton from "@/ui/OurButton";
import OurInput from "@/ui/OurInput";

const music_genres = [
  "Pop",
  "Rock",
  "Hip-hop",
  "Electronic",
  "Classical",
  "Jazz",
  "Blues",
  "Metal",
  "Country",
  "Reggae",
  "Latin",
  "Folk",
  "Rap",
  "Indie",
  "Soul",
  "Reggaeton",
  "Dubstep",
  "Rock 'n' Roll",
  "Punk",
  "Funk",
];

const GenresPage = () => {
  const [input, setInput] = useState("");
  const [myGenres, setMyGenres] = useState<string[]>([]);

  const addMyGenres = (item: string) => {
    console.log(item);
    setMyGenres((l) => [...l, item]);
  };

  return (
    <div className="w-[500px] rounded-[30px] flex flex-col bg-white p-6">
      <h3 className="text-2xl font-bold mb-4 text-center">
        CHOOSE MUSIC GENRES
      </h3>
      <OurInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Music genres..."
      />
      <div className="flex gap-2 my-4 flex-wrap">
        {myGenres.map((item, index) => {
          return (
            <div
              key={index}
              className="border p-2 px-4 inline-flex items-center rounded-full bg-blueText text-white"
            >
              {item}
            </div>
          );
        })}
        {music_genres
          .filter((item) => !myGenres.includes(item))
          .filter((item) => item.toLowerCase().includes(input.toLowerCase()))
          .slice(0, 8)
          .map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => addMyGenres(item)}
                className="border p-2 border-blueText inline-flex items-center rounded-full hover:bg-blueText
                hover:text-white transition-all ease-in"
              >
                <img src="/Plus.svg" alt="" />
                <span className="pr-3">{item}</span>
              </div>
            );
          })}
      </div>
      <OurButton name="Next" variant="primary" />
      <OurButton name="Later" variant="secondary" />
    </div>
  );
};

export default GenresPage;
