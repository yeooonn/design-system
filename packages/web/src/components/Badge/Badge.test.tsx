import { screen } from "@testing-library/react";
import { colors } from "@yeoooonn/ds-tokens";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Badge } from "./index";
import { resolveBadgeStyles } from "./badgeStyles";

describe("Badge", () => {
  it("children 텍스트를 렌더한다", () => {
    renderWithTheme(<Badge>신규</Badge>);

    expect(screen.getByText("신규")).toBeInTheDocument();
  });
});

describe("resolveBadgeStyles", () => {
  it("filled red variant는 scale 600 배경을 사용한다", () => {
    const styles = resolveBadgeStyles("red", "filled");

    expect(styles.backgroundColor).toBe(colors.red[600]);
    expect(styles.color).toBe(colors.white);
  });

  it("soft green variant는 scale 100 배경과 700 텍스트를 사용한다", () => {
    const styles = resolveBadgeStyles("green", "soft");

    expect(styles.backgroundColor).toBe(colors.green[100]);
    expect(styles.color).toBe(colors.green[700]);
  });
});
