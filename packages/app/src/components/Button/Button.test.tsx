import { fireEvent, screen } from "@testing-library/react-native";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Button } from "./index";
import { resolveButtonRound, resolveButtonStyles } from "./buttonStyles";

describe("Button", () => {
  it("라벨을 렌더하고 press 시 onPress를 호출한다", () => {
    const onPress = jest.fn();

    renderWithTheme(<Button onPress={onPress}>저장</Button>);

    fireEvent.press(screen.getByRole("button", { name: "저장" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("disabled이면 press되지 않는다", () => {
    const onPress = jest.fn();

    renderWithTheme(
      <Button disabled onPress={onPress}>
        저장
      </Button>,
    );

    const button = screen.getByRole("button", { name: "저장" });
    expect(button).toBeDisabled();

    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("loading이면 busy 상태이고 press되지 않는다", () => {
    const onPress = jest.fn();

    renderWithTheme(
      <Button loading onPress={onPress}>
        저장
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.props.accessibilityState?.busy).toBe(true);

    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("iconOnly이면 accessibilityLabel로 접근 가능하다", () => {
    renderWithTheme(
      <Button iconOnly accessibilityLabel="검색">
        🔍
      </Button>,
    );

    expect(screen.getByRole("button", { name: "검색" })).toBeTruthy();
  });
});

describe("resolveButtonStyles", () => {
  it("filled primary variant는 action primary 배경을 사용한다", () => {
    const styles = resolveButtonStyles("filled", "primary", lightTheme);

    expect(styles.backgroundColor).toBe(lightTheme.action.primary);
    expect(styles.textColor).toBeTruthy();
  });

  it("outlined danger variant는 error 색상 테두리를 사용한다", () => {
    const styles = resolveButtonStyles("outlined", "danger", lightTheme);

    expect(styles.textColor).toBe(lightTheme.status.error);
    expect(styles.borderColor).toBe(lightTheme.status.error);
  });
});

describe("resolveButtonRound", () => {
  it("round 토큰 값을 반환한다", () => {
    expect(typeof resolveButtonRound("full")).toBe("number");
    expect(resolveButtonRound("md")).toBeLessThan(resolveButtonRound("lg"));
  });
});
