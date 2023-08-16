import Link from "next/link";
import React from "react";


import { useDispatch } from "react-redux";

import Search from "@/components/Search/Search";
import { AppDispatch } from "@/redux/store";
import { logOut } from "@/redux/slices/authSlice";

import s from "./Navigation.module.scss";

const navs = [
  {
    href: "/",
    alt: "home",
    icon: "/Home.svg",
    text: "Home",
  },
  {
    href: "library",
    alt: "library",
    icon: "/VolumeUp.svg",
    text: "Library",
  },
  {
    href: "messages",
    alt: "messages",
    icon: "/Chat.svg",
    text: "Messages",
  },
  {
    href: "profile",
    alt: "profile",
    icon: "/Profile.svg",
    text: "Profile",
  },
];

const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <nav className="nav flex flex-col p-5 gap-5 mb-3">
      {navs.map((nav, index) => {
        return (
          <Link key={index} href={nav.href} className="flex gap-4 items-center">
            <img src={nav.icon} alt={nav.alt} />
            <span className="text-hero">{nav.text}</span>
          </Link>
        );
      })}
      <Search />
      <button
        onClick={() => dispatch(logOut())}
        className="flex items-center gap-4 mt-auto">
        <img src="/Logout.svg" alt="logout" />
        <span className="text-hero">Logout</span>
      </button>
    </nav>
  );
};

export default Navigation;
