import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { spacing } from "@yeoooonn/ds-tokens";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Tooltip } from "./index";
import {
  computeCoords,
  resolvePosition,
  type TooltipSize,
} from "./tooltipPosition";
import { TOOLTIP_OFFSET } from "./tooltipStyles";

function createDomRect(values: Partial<DOMRect>): DOMRect {
  return {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    toJSON: () => ({}),
    ...values,
  } as DOMRect;
}

describe("computeCoords", () => {
  const triggerRect = createDomRect({
    top: 200,
    left: 100,
    bottom: 240,
    right: 200,
    width: 100,
    height: 40,
  });
  const tooltipRect: TooltipSize = { width: 80, height: 32 };

  it("top position은 트리거 위쪽에 배치한다", () => {
    const coords = computeCoords(triggerRect, tooltipRect, "top");

    expect(coords.top).toBe(triggerRect.top - tooltipRect.height - TOOLTIP_OFFSET);
    expect(coords.left).toBe(
      triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
    );
  });

  it("bottom position은 트리거 아래쪽에 배치한다", () => {
    const coords = computeCoords(triggerRect, tooltipRect, "bottom");

    expect(coords.top).toBe(triggerRect.bottom + TOOLTIP_OFFSET);
    expect(coords.left).toBe(
      triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
    );
  });

  it("right position은 트리거 오른쪽에 배치한다", () => {
    const coords = computeCoords(triggerRect, tooltipRect, "right");

    expect(coords.left).toBe(triggerRect.right + TOOLTIP_OFFSET);
    expect(coords.top).toBe(
      triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
    );
  });
});

describe("resolvePosition", () => {
  const tooltipRect: TooltipSize = { width: 100, height: 40 };

  beforeEach(() => {
    vi.stubGlobal("innerWidth", 400);
    vi.stubGlobal("innerHeight", 300);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("autoFlip이 꺼져 있으면 preferred를 유지한다", () => {
    const triggerRect = createDomRect({
      top: 0,
      left: 150,
      bottom: 40,
      right: 250,
      width: 100,
      height: 40,
    });

    expect(
      resolvePosition(triggerRect, tooltipRect, "top", false),
    ).toBe("top");
  });

  it("viewport 밖이면 autoFlip 시 반대편으로 전환한다", () => {
    const triggerRect = createDomRect({
      top: 10,
      left: 150,
      bottom: 50,
      right: 250,
      width: 100,
      height: 40,
    });

    expect(resolvePosition(triggerRect, tooltipRect, "top", true)).toBe(
      "bottom",
    );
  });

  it("preferred와 opposite 모두 overflow면 preferred를 유지한다", () => {
    const triggerRect = createDomRect({
      top: 130,
      left: 150,
      bottom: 170,
      right: 250,
      width: 100,
      height: 40,
    });

    expect(resolvePosition(triggerRect, tooltipRect, "top", true)).toBe("top");
  });
});

describe("Tooltip component", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "requestAnimationFrame",
      (callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      },
    );

    Element.prototype.getBoundingClientRect = vi.fn(function (this: Element) {
      if (this.getAttribute("role") === "tooltip") {
        return createDomRect({
          top: 0,
          left: 0,
          width: 120,
          height: 32,
        });
      }

      return createDomRect({
        top: 100,
        left: 100,
        bottom: 132,
        right: 180,
        width: 80,
        height: 32,
      });
    });

    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      get() {
        return this.getAttribute("role") === "tooltip" ? 120 : 80;
      },
    });

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      get() {
        return 32;
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("open=false이면 tooltip을 렌더하지 않는다", () => {
    renderWithTheme(
      <Tooltip open={false} message="숨김">
        <button type="button">트리거</button>
      </Tooltip>,
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("controlled open이면 tooltip 메시지를 portal로 렌더한다", async () => {
    renderWithTheme(
      <Tooltip open message="도움말 텍스트">
        <button type="button">트리거</button>
      </Tooltip>,
    );

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("도움말 텍스트");
    });
  });
});

describe("TOOLTIP_OFFSET", () => {
  it("spacing 토큰과 동기화되어 있다", () => {
    expect(TOOLTIP_OFFSET).toBe(spacing[2]);
  });
});
