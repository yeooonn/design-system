import { screen } from "@testing-library/react";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Spinner } from "./index";

describe("Spinner", () => {
  it("role=status와 기본 aria-label을 렌더한다", () => {
    renderWithTheme(<Spinner />);

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("custom aria-label을 전달한다", () => {
    renderWithTheme(<Spinner aria-label="저장 중" />);

    expect(screen.getByRole("status", { name: "저장 중" })).toBeInTheDocument();
  });

  it("size=lg이면 28px box를 사용한다", () => {
    renderWithTheme(<Spinner size="lg" />);

    const spinner = screen.getByRole("status");
    expect(spinner).toHaveStyle({ width: "28px", height: "28px" });
  });

  it("color 미지정 시 theme action primary를 사용한다", () => {
    renderWithTheme(<Spinner />);

    const ring = screen.getByRole("status").querySelector("span > span") as HTMLElement;
    expect(ring).toHaveStyle({ borderTopColor: lightTheme.action.primary });
  });
});
