import { screen } from "@testing-library/react";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Icon } from "./index";

describe("Icon", () => {
  it("aria-hidden span을 렌더한다", () => {
    renderWithTheme(
      <Icon src="/icons/search.svg" size="md" />,
    );

    const icon = document.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });

  it("color=primary이면 action primary 색상을 사용한다", () => {
    renderWithTheme(
      <Icon src="/icons/search.svg" size="lg" color="primary" />,
    );

    const icon = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(icon).toHaveStyle({ color: lightTheme.action.primary });
  });

  it("size=lg이면 24px 크기를 사용한다", () => {
    renderWithTheme(
      <Icon src="/icons/search.svg" size="lg" />,
    );

    const icon = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(icon.style.width).toBe("24px");
    expect(icon.style.height).toBe("24px");
  });
});
