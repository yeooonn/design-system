import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Modal } from "./index";
import { resolveModalStyles } from "./modalStyles";

describe("Modal", () => {
  it("dialog를 portal로 렌더한다", () => {
    renderWithTheme(
      <Modal aria-labelledby="modal-title">
        <Modal.Header>
          <h2 id="modal-title">제목</h2>
        </Modal.Header>
        <Modal.Content>내용</Modal.Content>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(dialog).toHaveTextContent("제목");
    expect(dialog).toHaveTextContent("내용");
  });

  it("backdrop 클릭 시 onBackdropClick을 호출한다", async () => {
    const user = userEvent.setup();
    const onBackdropClick = vi.fn();

    renderWithTheme(
      <Modal onBackdropClick={onBackdropClick}>
        <Modal.Content>내용</Modal.Content>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    await user.click(dialog.parentElement!);
    expect(onBackdropClick).toHaveBeenCalledOnce();
  });

  it("panel 내부 클릭은 onBackdropClick을 호출하지 않는다", async () => {
    const user = userEvent.setup();
    const onBackdropClick = vi.fn();

    renderWithTheme(
      <Modal onBackdropClick={onBackdropClick}>
        <Modal.Content>내용</Modal.Content>
      </Modal>,
    );

    await user.click(screen.getByText("내용"));
    expect(onBackdropClick).not.toHaveBeenCalled();
  });
});

describe("resolveModalStyles", () => {
  it("light colorScheme에서 panel boxShadow를 포함한다", () => {
    const styles = resolveModalStyles(lightTheme, "light");

    expect(styles.panel.boxShadow).toBeDefined();
  });
});
