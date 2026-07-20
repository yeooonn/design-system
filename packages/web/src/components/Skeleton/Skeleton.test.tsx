import { lightTheme } from "@yeoooonn/ds-tokens";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Skeleton } from "./index";

describe("Skeleton", () => {
  it("aria-hidden span을 렌더한다", () => {
    renderWithTheme(<Skeleton />);

    const skeleton = document.querySelector('[aria-hidden="true"]');
    expect(skeleton).toBeInTheDocument();
  });

  it("기본 width 100%, height 16을 사용한다", () => {
    renderWithTheme(<Skeleton />);

    const skeleton = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(skeleton.style.width).toBe("100%");
    expect(skeleton.style.height).toBe("16px");
  });

  it("theme skeleton backgroundColor를 사용한다", () => {
    renderWithTheme(<Skeleton />);

    const skeleton = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(skeleton).toHaveStyle({
      backgroundColor: lightTheme.skeleton.background,
    });
  });
});
