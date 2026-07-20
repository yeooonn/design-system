import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { colors, lightTheme } from "@yeoooonn/ds-tokens";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Input } from "./index";
import { resolveInputState, resolveInputStyles } from "./inputStyles";

describe("Input", () => {
  it("label과 input을 연결한다", () => {
    renderWithTheme(<Input label="이메일" />);

    expect(screen.getByLabelText("이메일")).toBeInTheDocument();
  });

  it("typing 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(<Input label="이메일" onChange={onChange} />);

    await user.type(screen.getByLabelText("이메일"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("errorMessage가 있으면 aria-invalid과 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Input label="이메일" errorMessage="형식이 올바르지 않습니다" />,
    );

    expect(screen.getByLabelText("이메일")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("형식이 올바르지 않습니다")).toBeInTheDocument();
  });

  it("disabled이면 input이 disabled다", () => {
    renderWithTheme(<Input label="이메일" disabled />);

    expect(screen.getByLabelText("이메일")).toBeDisabled();
  });
});

describe("resolveInputState", () => {
  it("error이면 error 상태를 반환한다", () => {
    expect(
      resolveInputState({ disabled: false, error: true, focused: false }),
    ).toBe("error");
  });
});

describe("resolveInputStyles", () => {
  it("error 상태는 error border를 사용한다", () => {
    const styles = resolveInputStyles(
      "box",
      "md",
      lightTheme,
      "light",
      "error",
    );

    expect(styles.field.border).toContain(colors.error[400]);
  });
});
