'use client'

import './globals.scss'

import { usePathname } from 'next/navigation'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import UserInfo from '@/components/Layout/UserInfo/UserInfo'
import Navigation from '@/components/Layout/Navigation/Navigation'

import store, { persistor } from '@/redux/store'
import AuthProvider from '@/provider/AuthProvider'
import Loader from '@/components/Loader/Loader'
import OurApolloProvider from '@/provider/OurApolloProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <head>
        <title>SOLOWAY</title>
        <link rel="shortcut icon" href="/soloway.svg" type="image/x-icon" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <OurApolloProvider>
            <AuthProvider>
              <body
                className={
                  pathname.startsWith('/auth')
                    ? 'relative flex items-center justify-center h-screen bg-body'
                    : 'relative'
                }
              >
                {pathname.startsWith('/auth') ? (
                  children
                ) : (
                  <div className="layout container relative">
                    <div className="aside fixed top-6 lg:bottom-0 lg:top-auto">
                      <UserInfo />
                      <Navigation />
                    </div>
                    <div className="main">{children}</div>
                  </div>
                )}
              </body>
            </AuthProvider>
          </OurApolloProvider>
        </PersistGate>
      </Provider>
    </html>
  )
}
