import { screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Icon } from "./index";

describe("Icon", () => {
  it("accessibilityLabel이 있으면 접근 가능하다", () => {
    renderWithTheme(
      <Icon source={{ uri: "https://example.com/icon.svg" }} accessibilityLabel="검색" />,
    );

    expect(screen.getByLabelText("검색")).toBeTruthy();
  });

  it("accessibilityLabel이 없으면 decorative로 숨긴다", () => {
    renderWithTheme(
      <Icon source={{ uri: "https://example.com/icon.svg" }} />,
    );

    expect(screen.queryByRole("image")).toBeNull();
  });
});
