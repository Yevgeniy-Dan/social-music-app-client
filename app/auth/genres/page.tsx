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
    setMyGenres((l) => [...l, item]);
  };

  return (
    <div className="w-[500px] rounded-[30px] flex flex-col bg-white p-6">
      <h3 className="mb-4 text-2xl font-bold text-center">CHOOSE MUSIC GENRES</h3>
      <OurInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Music genres..."
      />
      <div className="flex flex-wrap gap-2 my-4">
        {myGenres.map((item, index) => {
          return (
            <div
              key={index}
              className="inline-flex items-center p-2 px-4 text-white border rounded-full bg-blueText"
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
                className="inline-flex items-center p-2 transition-all ease-in border rounded-full border-blueText hover:bg-blueText hover:text-white"
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
