import { PropsWithChildren } from "react";
import AppQueryProvider from "./query-provider";

const Providers = async ({ children }: PropsWithChildren) => {
  return <AppQueryProvider>{children}</AppQueryProvider>;
};

export default Providers;
