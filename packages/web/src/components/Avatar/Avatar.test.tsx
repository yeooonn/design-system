import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Avatar } from "./index";

describe("Avatar", () => {
  it("name에서 이니셜을 렌더한다", () => {
    renderWithTheme(<Avatar name="Kim Yeon" />);

    expect(screen.getByRole("img", { name: "Kim Yeon" })).toHaveTextContent(
      "KY",
    );
  });

  it("name이 없으면 ? fallback을 렌더한다", () => {
    renderWithTheme(<Avatar />);

    expect(screen.getByRole("img", { name: "Avatar" })).toHaveTextContent("?");
  });

  it("src가 있으면 img를 렌더한다", () => {
    renderWithTheme(
      <Avatar src="/avatar.png" alt="프로필" name="Kim Yeon" />,
    );

    expect(screen.getByAltText("프로필")).toHaveAttribute("src", "/avatar.png");
  });
});
