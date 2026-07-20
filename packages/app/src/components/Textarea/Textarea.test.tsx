import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Textarea } from "./index";
import { resolveTextareaState } from "./textareaStyles";

describe("Textarea", () => {
  it("label을 렌더한다", () => {
    renderWithTheme(<Textarea label="메모" placeholder="내용 입력" />);

    expect(screen.getByText("메모")).toBeTruthy();
    expect(screen.getByPlaceholderText("내용 입력")).toBeTruthy();
  });

  it("입력 시 onChangeText를 호출한다", () => {
    const onChangeText = jest.fn();

    renderWithTheme(
      <Textarea
        label="메모"
        placeholder="내용 입력"
        onChangeText={onChangeText}
      />,
    );

    fireEvent.changeText(screen.getByPlaceholderText("내용 입력"), "a");
    expect(onChangeText).toHaveBeenCalledWith("a");
  });

  it("showCount이면 byte 카운트를 표시한다", () => {
    renderWithTheme(
      <Textarea label="메모" showCount count={5} countMax={90} />,
    );

    expect(screen.getByText("5")).toBeTruthy();
    expect(screen.getByText(/\/ 90byte/)).toBeTruthy();
  });

  it("isCountExceeded이면 warning 메시지를 표시한다", () => {
    renderWithTheme(
      <Textarea label="메모" isCountExceeded countMax={90} />,
    );

    expect(screen.getByText("최대 90byte를 초과했습니다.")).toBeTruthy();
  });
});

describe("resolveTextareaState", () => {
  it("focused이면 focus 상태를 반환한다", () => {
    expect(
      resolveTextareaState({ disabled: false, error: false, focused: true }),
    ).toBe("focus");
  });
});
