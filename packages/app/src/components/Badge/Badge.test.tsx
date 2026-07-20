import { screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Badge } from "./index";

describe("Badge", () => {
  it("children을 렌더한다", () => {
    renderWithTheme(<Badge>New</Badge>);

    expect(screen.getByText("New")).toBeTruthy();
  });
});
