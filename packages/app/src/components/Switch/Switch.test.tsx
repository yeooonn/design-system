import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Switch } from "./index";

describe("Switch", () => {
  it("press 시 onCheckedChange를 호출한다", () => {
    const onCheckedChange = jest.fn();

    renderWithTheme(
      <Switch label="알림" onCheckedChange={onCheckedChange} />,
    );

    fireEvent.press(screen.getByRole("switch", { name: "알림" }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("disabled이면 press되지 않는다", () => {
    const onCheckedChange = jest.fn();

    renderWithTheme(
      <Switch label="알림" disabled onCheckedChange={onCheckedChange} />,
    );

    const toggle = screen.getByRole("switch", { name: "알림" });
    expect(toggle).toBeDisabled();

    fireEvent.press(toggle);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("errorMessage가 있으면 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Switch label="알림" errorMessage="설정에 실패했습니다" />,
    );

    expect(screen.getByText("설정에 실패했습니다")).toBeTruthy();
  });
});
