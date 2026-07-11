import { TOOLTIP_OFFSET, type TooltipPosition } from "./tooltipStyles";

export type TooltipCoords = {
  top: number;
  left: number;
};

export type TooltipSize = {
  width: number;
  height: number;
};

function getOppositePosition(position: TooltipPosition): TooltipPosition {
  switch (position) {
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    case "left":
      return "right";
    case "right":
      return "left";
  }
}

/** fixed 좌표: 트리거 rect + 툴팁 크기 기준으로 position별 top/left 계산 */
export function computeCoords(
  triggerRect: DOMRect,
  tooltipRect: TooltipSize,
  position: TooltipPosition,
  offset: number = TOOLTIP_OFFSET,
): TooltipCoords {
  const { width, height } = tooltipRect;

  switch (position) {
    case "top":
      return {
        top: triggerRect.top - height - offset,
        left: triggerRect.left + triggerRect.width / 2 - width / 2,
      };
    case "bottom":
      return {
        top: triggerRect.bottom + offset,
        left: triggerRect.left + triggerRect.width / 2 - width / 2,
      };
    case "left":
      return {
        top: triggerRect.top + triggerRect.height / 2 - height / 2,
        left: triggerRect.left - width - offset,
      };
    case "right":
      return {
        top: triggerRect.top + triggerRect.height / 2 - height / 2,
        left: triggerRect.right + offset,
      };
  }
}

function overflowsViewport(
  coords: TooltipCoords,
  tooltipRect: TooltipSize,
): boolean {
  const { top, left } = coords;
  const { width, height } = tooltipRect;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return top < 0 || left < 0 || top + height > vh || left + width > vw;
}

/**
 * autoFlip이 켜져 있으면 preferred가 viewport를 벗어날 때 주축 반대편만 시도.
 * 반대편도 부족하면 preferred를 유지한다 (클램프하지 않음).
 */
export function resolvePosition(
  triggerRect: DOMRect,
  tooltipRect: TooltipSize,
  preferred: TooltipPosition,
  autoFlip: boolean,
): TooltipPosition {
  if (!autoFlip) return preferred;

  const preferredCoords = computeCoords(triggerRect, tooltipRect, preferred);

  if (!overflowsViewport(preferredCoords, tooltipRect)) {
    return preferred;
  }

  const opposite = getOppositePosition(preferred);
  const oppositeCoords = computeCoords(triggerRect, tooltipRect, opposite);

  if (!overflowsViewport(oppositeCoords, tooltipRect)) {
    return opposite;
  }

  return preferred;
}

export function measureAndPlace(options: {
  trigger: HTMLElement;
  tooltip: HTMLElement;
  preferred: TooltipPosition;
  autoFlip: boolean;
}): { position: TooltipPosition; coords: TooltipCoords } {
  const { trigger, tooltip, preferred, autoFlip } = options;
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = {
    width: tooltip.offsetWidth,
    height: tooltip.offsetHeight,
  };
  const position = resolvePosition(
    triggerRect,
    tooltipRect,
    preferred,
    autoFlip,
  );
  const coords = computeCoords(triggerRect, tooltipRect, position);

  return { position, coords };
}
