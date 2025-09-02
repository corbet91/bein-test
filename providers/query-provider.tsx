"use client";

import Header from "@/components/header";
import TokenService from "@/services/token.service";
import { useIsLogout } from "@/zustand";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useRouter } from "next/navigation";

import { useEffect, type PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 1, // 24 hours
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

const AppQueryProvider = ({ children }: PropsWithChildren) => {
  // NOTE: Avoid useState when initializing the query client if you don't have a suspense boundary between this and the
  // code that may suspend because React will throw away the client on the initial render if it suspends and there is no boundary
  const user = TokenService.getAuth();
  const router = useRouter();
  const { isLogout, setIsLogout } = useIsLogout();

  useEffect(() => {
    if (!!user) {
      setIsLogout(false);
    } else {
      setIsLogout(true);
    }
  }, [router]);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      {!isLogout && <Header />}
      {children}
    </PersistQueryClientProvider>
  );
};

export default AppQueryProvider;
