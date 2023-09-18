"use client";

import "./globals.scss";

import { usePathname } from "next/navigation";

import { Provider } from "react-redux";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  gql,
  from,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { onError } from "@apollo/client/link/error";

import { PersistGate } from "redux-persist/integration/react";

import UserInfo from "@/components/Layout/UserInfo/UserInfo";
import Navigation from "@/components/Layout/Navigation/Navigation";

import store, { persistor } from "@/redux/store";
import AuthProvider from "@/provider/AuthProvider";
import Loader from "@/components/Loader/Loader";

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL || "http://localhost:8080/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("persist:root")) || "";
  return {
    headers: {
      ...headers,
      Authorization: JSON.parse(token.auth).access_token
        ? `Bearer ${JSON.parse(token.auth).access_token}`
        : "",
    },
  };
});

const getNewToken = async () => {
  const newToken = () =>
    client.mutate({
      mutation: gql`
        mutation refresh {
          refresh {
            accessToken
          }
        }
      `,
    });
  try {
    const { data } = await newToken();
    const localStore = JSON.parse(localStorage.getItem("persist:root")) || "";

    localStorage.setItem("persist:root", JSON.stringify(localStore));
    return data.refresh.accessToken;
  } catch (error) {
    localStorage.removeItem("persist:root");
  }
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED") {
        return new Observable((observer) => {
          getNewToken()
            .then((accessToken) => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  // Re-add old headers
                  ...headers,
                  // Switch out old access token for new one
                  authorization: `Bearer ${accessToken}` || null,
                },
              }));
            })
            .then(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              // Retry last failed request
              forward(operation).subscribe(subscriber);
            })
            .catch((error) => {
              // No refresh or client token available, we force user to login
              observer.error(error);
            });
        });
      }
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, httpLink]),
  connectToDevTools: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>SOLOWAY</title>
        <link rel="shortcut icon" href="/soloway.svg" type="image/x-icon" />
      </head>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <ApolloProvider client={client}>
            <AuthProvider>
              <body
                className={
                  pathname.startsWith("/auth")
                    ? "relative flex items-center justify-center h-screen"
                    : "relative"
                }
              >
                {pathname.startsWith("/auth") ? (
                  children
                ) : (
                  <div className="layout container relative">
                    <div className="aside fixed top-6 ">
                      <UserInfo />
                      <Navigation />
                    </div>
                    <div className="main">{children}</div>
                  </div>
                )}
              </body>
            </AuthProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </html>
  );
}
