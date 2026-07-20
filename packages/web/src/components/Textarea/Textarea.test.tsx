import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Textarea } from "./index";
import { resolveTextareaState } from "./textareaStyles";

describe("Textarea", () => {
  it("label과 textarea를 연결한다", () => {
    renderWithTheme(<Textarea label="메모" />);

    expect(screen.getByLabelText("메모")).toBeInTheDocument();
  });

  it("typing 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(<Textarea label="메모" onChange={onChange} />);

    await user.type(screen.getByLabelText("메모"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("showCount이면 byte 카운트를 표시한다", () => {
    renderWithTheme(
      <Textarea label="메모" showCount count={5} countMax={90} />,
    );

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText(/\/ 90byte/)).toBeInTheDocument();
  });

  it("isCountExceeded이면 warning 메시지와 aria-invalid을 표시한다", () => {
    renderWithTheme(
      <Textarea label="메모" isCountExceeded countMax={90} />,
    );

    expect(screen.getByLabelText("메모")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("최대 90byte를 초과했습니다.")).toBeInTheDocument();
  });
});

describe("resolveTextareaState", () => {
  it("focused이면 focus 상태를 반환한다", () => {
    expect(
      resolveTextareaState({ disabled: false, error: false, focused: true }),
    ).toBe("focus");
  });
});
