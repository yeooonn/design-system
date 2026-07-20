import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Result } from "./index";

describe("Result", () => {
  it("title, description, button을 렌더한다", () => {
    const onPress = jest.fn();

    renderWithTheme(
      <Result
        title="완료"
        description="저장되었습니다"
        button={<Result.Button onPress={onPress}>확인</Result.Button>}
      />,
    );

    expect(screen.getByText("완료")).toBeTruthy();
    expect(screen.getByText("저장되었습니다")).toBeTruthy();

    fireEvent.press(screen.getByRole("button", { name: "확인" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
