import clsx from "clsx";
import Link from "next/link";
import React from "react";

import s from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <nav className={`nav ${s.nav}`}>
      <Link href={"home"} className={s.nav__item}>
        <img src="./Home.svg" alt="home" /><span>Home</span>
      </Link>
      <Link href={"library"} className={s.nav__item}>
        <img src="./VolumeUp.svg" alt="library" /><span>Library</span>
      </Link>
      <Link href={"messages"} className={s.nav__item}>
        <img src="./Chat.svg" alt="messages" /><span>Messages</span>
      </Link>
      <Link href={"profile"} className={s.nav__item}>
        <img src="./Profile.svg" alt="profile" /><span>Profile</span>
      </Link>
      <button className={clsx(s.nav__button, s.nav__item)}><img src="./Logout.svg" alt="logout" /><span>Logout</span></button>
    </nav>
  );
};

export default Navigation;