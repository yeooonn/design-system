import {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { measureAndPlace, type TooltipCoords } from "./tooltipPosition";
import type { TooltipPosition } from "./tooltipStyles";

type UseTooltipPositionOptions = {
  isActive: boolean;
  preferred: TooltipPosition;
  autoFlip: boolean;
  /** 크기/내용 변경 시 재측정 트리거 */
  relayoutKey: string | number | boolean;
  /**
   * true면 스크롤 시 onScrollDismiss만 호출하고 재배치하지 않는다 (uncontrolled).
   * false면 스크롤 시 위치만 갱신한다 (controlled).
   */
  dismissOnScroll: boolean;
  onScrollDismiss: () => void;
  /** 스크롤로 닫히거나, 이후 닫힐 때 페이드를 건너뛰도록 표시 */
  onScroll: () => void;
  /** 좌표 확정 직후 (페이드인 시작용) */
  onPositioned: () => void;
};

type UseTooltipPositionResult = {
  coords: TooltipCoords | null;
  resolvedPosition: TooltipPosition;
  triggerRef: RefObject<HTMLSpanElement>;
  tooltipRef: RefObject<HTMLDivElement>;
  clearCoords: () => void;
};

export function useTooltipPosition({
  isActive,
  preferred,
  autoFlip,
  relayoutKey,
  dismissOnScroll,
  onScrollDismiss,
  onScroll,
  onPositioned,
}: UseTooltipPositionOptions): UseTooltipPositionResult {
  const [coords, setCoords] = useState<TooltipCoords | null>(null);
  const [resolvedPosition, setResolvedPosition] =
    useState<TooltipPosition>(preferred);

  const triggerRef = useRef<HTMLSpanElement>(null!);
  const tooltipRef = useRef<HTMLDivElement>(null!);

  const preferredRef = useRef(preferred);
  const autoFlipRef = useRef(autoFlip);
  const dismissOnScrollRef = useRef(dismissOnScroll);
  const onScrollDismissRef = useRef(onScrollDismiss);
  const onScrollRef = useRef(onScroll);
  const onPositionedRef = useRef(onPositioned);

  preferredRef.current = preferred;
  autoFlipRef.current = autoFlip;
  dismissOnScrollRef.current = dismissOnScroll;
  onScrollDismissRef.current = onScrollDismiss;
  onScrollRef.current = onScroll;
  onPositionedRef.current = onPositioned;

  const clearCoords = () => {
    setCoords(null);
  };

  const updatePosition = () => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const { position, coords: nextCoords } = measureAndPlace({
      trigger,
      tooltip,
      preferred: preferredRef.current,
      autoFlip: autoFlipRef.current,
    });

    setResolvedPosition(position);
    setCoords(nextCoords);
  };

  useLayoutEffect(() => {
    if (!isActive) return;

    updatePosition();
    onPositionedRef.current();
  }, [isActive, preferred, autoFlip, relayoutKey]);

  useEffect(() => {
    if (!isActive) return;

    const handleResize = () => {
      updatePosition();
    };

    const handleScroll = () => {
      onScrollRef.current();
      if (dismissOnScrollRef.current) {
        onScrollDismissRef.current();
        return;
      }
      updatePosition();
    };

    window.addEventListener("resize", handleResize);
    // capture: 내부 overflow 스크롤 컨테이너도 감지
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isActive]);

  return {
    coords,
    resolvedPosition,
    triggerRef,
    tooltipRef,
    clearCoords,
  };
}
