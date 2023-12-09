// modules/useThemeStyling.ts
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { api } from "./api";
import { type ReactNode } from "react";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const useThemeStyling = () => {
  const preference = api.profiles.getUserPreference.useQuery().data;

  const getTheme = () => {
    // Determine the theme based on user preferences
    const isDarkTheme = preference?.appearance === "dark";
    return isDarkTheme ? darkTheme : lightTheme;
  };

  return {
    ThemeProvider: ({ children }: { children: ReactNode }) => {
      return (
        <NextThemesProvider forcedTheme={preference?.appearance}>
          <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
        </NextThemesProvider>
      );
    },
    isDarkTheme: preference?.appearance === "dark",
  };
};
