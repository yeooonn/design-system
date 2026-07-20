import { screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Typography } from "./index";

describe("Typography", () => {
  it("variant별 텍스트를 렌더한다", () => {
    renderWithTheme(
      <>
        <Typography.H1>제목</Typography.H1>
        <Typography.P1>본문</Typography.P1>
      </>,
    );

    expect(screen.getByText("제목")).toBeTruthy();
    expect(screen.getByText("본문")).toBeTruthy();
  });
});
