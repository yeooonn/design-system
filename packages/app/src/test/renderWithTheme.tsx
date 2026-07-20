import { render, type RenderOptions } from "@testing-library/react-native";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";

function TestProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: TestProviders, ...options });
}
