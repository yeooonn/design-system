import { screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Spinner } from "./index";

describe("Spinner", () => {
  it("기본 accessibilityLabel로 렌더한다", () => {
    renderWithTheme(<Spinner />);

    expect(screen.getByLabelText("Loading")).toBeTruthy();
  });

  it("커스텀 accessibilityLabel을 사용한다", () => {
    renderWithTheme(<Spinner accessibilityLabel="불러오는 중" />);

    expect(screen.getByLabelText("불러오는 중")).toBeTruthy();
  });
});
