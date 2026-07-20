import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { resolveCheckboxRadioState } from "../_shared/checkboxRadioStyles";
import { Checkbox } from "./index";

describe("Checkbox", () => {
  it("label press 시 onCheckedChange를 호출한다", () => {
    const onCheckedChange = jest.fn();

    renderWithTheme(
      <Checkbox label="동의" onCheckedChange={onCheckedChange} />,
    );

    fireEvent.press(screen.getByRole("checkbox", { name: "동의" }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("disabled이면 press되지 않는다", () => {
    const onCheckedChange = jest.fn();

    renderWithTheme(
      <Checkbox label="동의" disabled onCheckedChange={onCheckedChange} />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "동의" });
    expect(checkbox).toBeDisabled();

    fireEvent.press(checkbox);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("errorMessage가 있으면 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Checkbox label="동의" errorMessage="필수 항목입니다" />,
    );

    expect(screen.getByText("필수 항목입니다")).toBeTruthy();
  });
});

describe("resolveCheckboxRadioState", () => {
  it("disabled가 최우선 상태다", () => {
    expect(
      resolveCheckboxRadioState({
        disabled: true,
        error: true,
        focused: true,
        checked: true,
      }),
    ).toBe("disabled");
  });

  it("checked이면 checked 상태다", () => {
    expect(
      resolveCheckboxRadioState({
        disabled: false,
        error: false,
        focused: false,
        checked: true,
      }),
    ).toBe("checked");
  });
});
