import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Radio } from "./index";

describe("Radio", () => {
  it("label 클릭 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <Radio label="옵션 A" onChange={onChange} />,
    );

    await user.click(screen.getByRole("radio", { name: "옵션 A" }));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("checked이면 input이 checked다", () => {
    renderWithTheme(
      <Radio label="옵션 A" checked readOnly />,
    );

    expect(screen.getByRole("radio", { name: "옵션 A" })).toBeChecked();
  });

  it("errorMessage가 있으면 aria-invalid과 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Radio label="옵션 A" errorMessage="선택이 필요합니다" />,
    );

    expect(screen.getByRole("radio", { name: "옵션 A" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("선택이 필요합니다")).toBeInTheDocument();
  });
});
