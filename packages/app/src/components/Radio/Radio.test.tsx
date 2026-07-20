import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Radio } from "./index";

describe("Radio", () => {
  it("label press 시 onPress를 호출한다", () => {
    const onPress = jest.fn();

    renderWithTheme(<Radio label="옵션 A" onPress={onPress} />);

    fireEvent.press(screen.getByRole("radio", { name: "옵션 A" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("disabled이면 press되지 않는다", () => {
    const onPress = jest.fn();

    renderWithTheme(
      <Radio label="옵션 A" disabled onPress={onPress} />,
    );

    const radio = screen.getByRole("radio", { name: "옵션 A" });
    expect(radio).toBeDisabled();

    fireEvent.press(radio);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("errorMessage가 있으면 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Radio label="옵션 A" errorMessage="필수 선택입니다" />,
    );

    expect(screen.getByText("필수 선택입니다")).toBeTruthy();
  });
});
