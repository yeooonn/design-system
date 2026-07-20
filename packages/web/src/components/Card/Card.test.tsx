import { screen } from "@testing-library/react";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Card } from "./index";
import { resolveCardStyles } from "./cardStyles";

describe("Card", () => {
  it("Header, Content, Footer를 렌더한다", () => {
    renderWithTheme(
      <Card>
        <Card.Header>제목</Card.Header>
        <Card.Content>본문</Card.Content>
        <Card.Footer>푸터</Card.Footer>
      </Card>,
    );

    expect(screen.getByText("제목")).toBeInTheDocument();
    expect(screen.getByText("본문")).toBeInTheDocument();
    expect(screen.getByText("푸터")).toBeInTheDocument();
  });
});

describe("resolveCardStyles", () => {
  it("boxShadow가 true이면 shadow 스타일을 포함한다", () => {
    const styles = resolveCardStyles(lightTheme, "light", { boxShadow: true });

    expect(styles.root.boxShadow).toBeDefined();
  });

  it("boxShadow가 false이면 shadow 스타일을 포함하지 않는다", () => {
    const styles = resolveCardStyles(lightTheme, "light", { boxShadow: false });

    expect(styles.root.boxShadow).toBeUndefined();
  });
});
