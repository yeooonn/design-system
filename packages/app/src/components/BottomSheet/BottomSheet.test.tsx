import { screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { BottomSheet } from "./index";

describe("BottomSheet", () => {
  it("visible일 때 content를 렌더한다", () => {
    renderWithTheme(
      <BottomSheet visible accessibilityLabel="옵션">
        <BottomSheet.Content>
          <Text>시트 내용</Text>
        </BottomSheet.Content>
      </BottomSheet>,
    );

    expect(screen.getByText("시트 내용")).toBeTruthy();
  });

  it("visible=false이면 content를 렌더하지 않는다", () => {
    renderWithTheme(
      <BottomSheet visible={false}>
        <BottomSheet.Content>
          <Text>시트 내용</Text>
        </BottomSheet.Content>
      </BottomSheet>,
    );

    expect(screen.queryByText("시트 내용")).toBeNull();
  });
});
