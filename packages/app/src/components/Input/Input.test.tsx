import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Input } from "./index";

describe("Input", () => {
  it("label과 placeholder를 렌더한다", () => {
    renderWithTheme(
      <Input label="이메일" placeholder="email@example.com" />,
    );

    expect(screen.getByText("이메일")).toBeTruthy();
    expect(screen.getByPlaceholderText("email@example.com")).toBeTruthy();
  });

  it("입력 시 onChangeText를 호출한다", () => {
    const onChangeText = jest.fn();

    renderWithTheme(
      <Input
        label="이메일"
        placeholder="email@example.com"
        onChangeText={onChangeText}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText("email@example.com"),
      "a",
    );
    expect(onChangeText).toHaveBeenCalledWith("a");
  });

  it("errorMessage가 있으면 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Input
        label="이메일"
        placeholder="email@example.com"
        errorMessage="형식이 올바르지 않습니다"
      />,
    );

    expect(screen.getByText("형식이 올바르지 않습니다")).toBeTruthy();
  });

  it("disabled이면 editable이 false다", () => {
    renderWithTheme(
      <Input label="이메일" placeholder="email@example.com" disabled />,
    );

    expect(screen.getByPlaceholderText("email@example.com").props.editable).toBe(
      false,
    );
  });
});
