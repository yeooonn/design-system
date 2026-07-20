import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Button } from "./index";
import { resolveButtonRound, resolveButtonStyles } from "./buttonStyles";

describe("Button", () => {
  it("라벨을 렌더하고 클릭 시 onClick을 호출한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(<Button onClick={onClick}>저장</Button>);

    const button = screen.getByRole("button", { name: "저장" });
    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("disabled이면 클릭되지 않는다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(
      <Button disabled onClick={onClick}>
        저장
      </Button>,
    );

    const button = screen.getByRole("button", { name: "저장" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("loading이면 aria-busy가 설정되고 클릭되지 않는다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(
      <Button loading onClick={onClick}>
        저장
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("iconOnly이면 aria-label로 접근 가능하다", () => {
    renderWithTheme(
      <Button iconOnly aria-label="검색">
        🔍
      </Button>,
    );

    expect(screen.getByRole("button", { name: "검색" })).toBeInTheDocument();
  });
});

describe("resolveButtonStyles", () => {
  it("filled primary variant는 action primary 배경을 사용한다", () => {
    const styles = resolveButtonStyles("filled", "primary", lightTheme, "light");

    expect(styles.backgroundColor).toBe(lightTheme.action.primary);
    expect(styles.color).toBe(lightTheme.text.inverse);
  });

  it("outlined danger variant는 error 색상 테두리를 사용한다", () => {
    const styles = resolveButtonStyles("outlined", "danger", lightTheme, "light");

    expect(styles.color).toBe(lightTheme.status.error);
    expect(styles.border).toContain(lightTheme.status.error);
  });
});

describe("resolveButtonRound", () => {
  it("round 토큰 값을 반환한다", () => {
    expect(resolveButtonRound("full")).toBeTypeOf("number");
    expect(resolveButtonRound("md")).toBeLessThan(resolveButtonRound("lg"));
  });
});
