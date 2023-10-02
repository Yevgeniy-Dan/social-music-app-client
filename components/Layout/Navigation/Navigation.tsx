import Link from 'next/link'
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { usePathname } from 'next/navigation'

import Search from '@/components/Search/Search'
import { AppDispatch } from '@/redux/store'
import { logOut, selectAuth } from '@/redux/slices/authSlice'
import MobileSearch from '@/components/Search/MobileSearch'

const navs = [
  {
    href: '/',
    alt: 'home',
    icon: '/Home.svg',
    text: 'Home',
  },
  {
    href: 'library',
    alt: 'library',
    icon: '/VolumeUp.svg',
    text: 'Library',
  },
  {
    href: 'messages',
    alt: 'messages',
    icon: '/Chat.svg',
    text: 'Messages',
  },
  {
    href: 'profile',
    alt: 'profile',
    icon: '/Profile.svg',
    text: 'Profile',
  },
]

const Navigation = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const pathname = usePathname()
  const { user } = useSelector(selectAuth)
  return (
    <nav className="nav flex flex-col p-5 gap-5 mb-3 lg:flex-row lg:items-end lg:grow-0 lg:gap-10 lg:justify-center lg:p-7 lg:mb-0 ">
      {navs.map((nav, index) => {
        return (
          <Link key={index} href={nav.href} className="flex gap-4 items-center">
            <div className="w-8 h-8">
              <img className="w-full h-full" src={nav.icon} alt={nav.alt} />
            </div>
            <span className="text-hero lg:hidden">{nav.text}</span>
          </Link>
        )
      })}
      {pathname.startsWith('/search') || !user ? null : <Search />}
      {openSearch && <MobileSearch />}
      <div
        className="w-8 h-8 hidden lg:block"
        onClick={() => setOpenSearch((prev) => !prev)}
      >
        <img className="w-full h-full" src="/Search.svg" alt="Search" />
      </div>
      <button
        onClick={() => dispatch(logOut())}
        className="flex items-center gap-4 mt-auto"
      >
        <div className="w-8 h-8">
          <img className="w-full h-full" src="/Logout.svg" alt="logout" />
        </div>
        <span className="text-hero lg:hidden">Logout</span>
      </button>
    </nav>
  )
}

export default Navigation
