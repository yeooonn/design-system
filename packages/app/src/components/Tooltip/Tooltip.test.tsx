import { screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Tooltip } from "./index";

describe("Tooltip", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("trigger children을 렌더한다", () => {
    renderWithTheme(
      <Tooltip message="도움말">
        <Text>트리거</Text>
      </Tooltip>,
    );

    expect(screen.getByText("트리거")).toBeTruthy();
  });
});
