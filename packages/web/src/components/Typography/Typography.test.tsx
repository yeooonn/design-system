import { screen } from "@testing-library/react";
import { lightTheme, textStyles } from "@yeoooonn/ds-tokens";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Typography } from "./index";
import {
  resolveTypographyColor,
  resolveTypographyDefaultTag,
  resolveTypographyVariantStyles,
} from "./typographyStyles";

describe("Typography", () => {
  it("Typography.H1은 h1 태그로 children을 렌더한다", () => {
    renderWithTheme(<Typography.H1>제목</Typography.H1>);

    expect(screen.getByRole("heading", { level: 1, name: "제목" })).toBeInTheDocument();
  });

  it("as prop으로 태그를 override한다", () => {
    renderWithTheme(<Typography.H1 as="span">제목</Typography.H1>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("제목").tagName).toBe("SPAN");
  });

  it("color=secondary이면 theme secondary text color를 사용한다", () => {
    renderWithTheme(<Typography.P1 color="secondary">본문</Typography.P1>);

    const text = screen.getByText("본문");
    expect(text).toHaveStyle({ color: lightTheme.text.secondary });
  });
});

describe("resolveTypographyDefaultTag", () => {
  it("Label variant는 span을 반환한다", () => {
    expect(resolveTypographyDefaultTag("Label")).toBe("span");
  });
});

describe("resolveTypographyVariantStyles", () => {
  it("H1 variant는 textStyles.H1과 일치한다", () => {
    expect(resolveTypographyVariantStyles("H1")).toEqual(textStyles.H1);
  });
});

describe("resolveTypographyColor", () => {
  it("error color는 status error를 반환한다", () => {
    expect(resolveTypographyColor("error", lightTheme)).toBe(
      lightTheme.status.error,
    );
  });
});
