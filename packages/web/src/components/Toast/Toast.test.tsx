import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { ToastProvider, useToast } from "./index";
import { resolveToastEnterTransform } from "./toastStyles";

function ToastHarness() {
  const toast = useToast();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          toast.open({ text: "저장되었습니다", duration: 0 });
        }}
      >
        토스트 열기
      </button>
      <button type="button" onClick={() => toast.closeAll()}>
        전체 닫기
      </button>
    </>
  );
}

function renderToast(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <ToastProvider>{ui}</ToastProvider>
    </ThemeProvider>,
  );
}

describe("useToast", () => {
  beforeEach(() => {
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("Provider 없이 useToast를 호출하면 throw한다", () => {
    expect(() => render(<ToastHarness />)).toThrow(
      "useToast는 ToastProvider 내에서 사용되어야 합니다.",
    );
  });

  it("open 호출 시 toast 메시지를 portal로 렌더한다", async () => {
    const user = userEvent.setup();

    renderToast(<ToastHarness />);
    await user.click(screen.getByRole("button", { name: "토스트 열기" }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("저장되었습니다");
    });
  });

  it("closeAll 호출 시 toast를 제거한다", async () => {
    const user = userEvent.setup();

    renderToast(<ToastHarness />);
    await user.click(screen.getByRole("button", { name: "토스트 열기" }));
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "전체 닫기" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("resolveToastEnterTransform", () => {
  it("top-left position은 음수 X translate를 사용한다", () => {
    expect(resolveToastEnterTransform("top-left")).toContain("-");
  });

  it("bottom-center position은 아래 방향 translate를 사용한다", () => {
    expect(resolveToastEnterTransform("bottom-center")).toContain("25px");
  });
});
