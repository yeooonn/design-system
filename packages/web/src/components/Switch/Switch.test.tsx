import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Switch } from "./index";
import { resolveSwitchStyles } from "./switchStyles";
import { lightTheme } from "@yeoooonn/ds-tokens";

describe("Switch", () => {
  it("toggle 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <Switch label="알림" onChange={onChange} />,
    );

    await user.click(screen.getByRole("switch", { name: "알림" }));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("checked이면 aria-checked가 true다", () => {
    renderWithTheme(
      <Switch label="알림" checked readOnly />,
    );

    expect(screen.getByRole("switch", { name: "알림" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("errorMessage가 있으면 aria-invalid과 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Switch label="알림" errorMessage="설정에 실패했습니다" />,
    );

    expect(screen.getByRole("switch", { name: "알림" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("설정에 실패했습니다")).toBeInTheDocument();
  });
});

describe("resolveSwitchStyles", () => {
  it("checked thumb offset이 unchecked보다 크다", () => {
    const unchecked = resolveSwitchStyles("md", lightTheme, "light", "default", {
      checked: false,
      disabled: false,
      error: false,
      focused: false,
    });
    const checked = resolveSwitchStyles("md", lightTheme, "light", "checked", {
      checked: true,
      disabled: false,
      error: false,
      focused: false,
    });

    expect(Number(checked.thumb.left)).toBeGreaterThan(Number(unchecked.thumb.left));
  });
});
