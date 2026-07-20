import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Divider } from "./index";

describe("Divider", () => {
  it("horizontal orientation을 렌더한다", () => {
    renderWithTheme(<Divider orientation="horizontal" />);

    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "horizontal",
    );
  });

  it("vertical orientation을 렌더한다", () => {
    renderWithTheme(<Divider orientation="vertical" />);

    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });
});
