import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { resolveCheckboxRadioState } from "../_shared/checkboxRadioStyles";
import { Checkbox } from "./index";

describe("Checkbox", () => {
  it("label 클릭 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <Checkbox label="동의" onChange={onChange} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "동의" }));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("disabled이면 클릭되지 않는다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <Checkbox label="동의" disabled onChange={onChange} />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "동의" });
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("errorMessage가 있으면 aria-invalid과 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Checkbox label="동의" errorMessage="필수 항목입니다" />,
    );

    expect(screen.getByRole("checkbox", { name: "동의" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("필수 항목입니다")).toBeInTheDocument();
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
