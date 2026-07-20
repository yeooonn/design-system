import { screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Avatar } from "./index";

describe("Avatar", () => {
  it("name에서 이니셜을 렌더한다", () => {
    renderWithTheme(<Avatar name="Kim Yeon" />);

    expect(screen.getByLabelText("Kim Yeon")).toHaveTextContent("KY");
  });

  it("name이 없으면 ? fallback을 렌더한다", () => {
    renderWithTheme(<Avatar />);

    expect(screen.getByLabelText("Avatar")).toHaveTextContent("?");
  });

  it("src가 있으면 image role을 렌더한다", () => {
    renderWithTheme(
      <Avatar
        src={{ uri: "https://example.com/avatar.png" }}
        accessibilityLabel="프로필"
        name="Kim Yeon"
      />,
    );

    expect(screen.getByLabelText("프로필")).toBeTruthy();
  });
});
