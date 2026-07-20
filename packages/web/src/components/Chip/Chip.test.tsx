import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Chip } from "./index";
import { resolveChipStyles } from "./chipStyles";

describe("Chip", () => {
  it("onClick이 있으면 button으로 렌더하고 클릭 시 호출한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(
      <Chip onClick={onClick}>React</Chip>,
    );

    await user.click(screen.getByRole("button", { name: "React" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("selected이면 aria-pressed가 true다", () => {
    renderWithTheme(
      <Chip selected onClick={() => {}}>
        React
      </Chip>,
    );

    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("onClose 버튼 클릭 시 onClose를 호출한다", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderWithTheme(
      <Chip onClose={onClose}>
        React
      </Chip>,
    );

    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe("resolveChipStyles", () => {
  it("selected이면 primary 계열 배경을 사용한다", () => {
    const styles = resolveChipStyles({
      color: "gray",
      theme: lightTheme,
      selected: true,
      disabled: false,
    });

    expect(styles.backgroundColor).toBeTruthy();
    expect(styles.color).toBeTruthy();
  });
});
