import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";
import { Toaster } from "react-hot-toast";
import { Theme } from "@radix-ui/themes";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Theme appearance="dark" radius="small">
      <Component {...pageProps} />
      <Toaster />
    </Theme>
  );
};

export default api.withTRPC(MyApp);
