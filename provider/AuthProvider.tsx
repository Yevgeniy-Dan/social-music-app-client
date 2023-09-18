'use client'
import { RootState } from '@/redux/store'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = useSelector<RootState>((state) => state.auth.access_token)
  const navigate = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') return
    if (!accessToken) navigate.push('/auth')
  }, [pathname, accessToken])

  return (
    <>
      {pathname.startsWith('/auth') || pathname === '/' || accessToken ? children : null}
    </>
  )
}

export default AuthProvider
