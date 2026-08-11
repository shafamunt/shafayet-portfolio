"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Blueprint navy/cyan is the primary look; light is an optional paper variant. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
