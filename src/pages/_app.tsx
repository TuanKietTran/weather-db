import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { AppContent, AppName } from "~/utils/constants";
import SideNav from "~/components/SideNav";
import { useThemeStyling } from "~/utils/theme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { ThemeProvider } = useThemeStyling();

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Head>
          <title>{AppName}</title>
          <meta name="description" content={AppContent} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container mx-auto flex items-start sm:pr-4 ">
          <SideNav />
          <div className="min-h-screen flex-grow border-x">
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
