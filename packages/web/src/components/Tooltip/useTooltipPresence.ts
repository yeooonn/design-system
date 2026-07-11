import { useEffect, useRef, useState } from "react";
import { TOOLTIP_FADE_MS } from "./tooltipStyles";

type UseTooltipPresenceOptions = {
  isOpen: boolean;
  /** 언마운트 완료 시 coords 등 정리 */
  onExited?: () => void;
};

type UseTooltipPresenceResult = {
  /** opacity 페이드인 여부 (0 → 1) */
  entered: boolean;
  /**
   * 페이드아웃 동안에도 DOM에 남겨두기 위한 마운트 플래그.
   * isOpen=false여도 TOOLTIP_FADE_MS 동안 true를 유지한다.
   */
  isMounted: boolean;
  /** 다음 닫힘에서 페이드를 건너뛰도록 표시 (스크롤 dismiss 등) */
  requestSkipExitAnimation: () => void;
  /** 좌표가 잡힌 뒤 페이드인 시작 */
  enterAfterPaint: () => void;
};

/**
 * open 상태에 따른 mount / opacity 페이드인·아웃 생명주기.
 * - mouseleave 등: TOOLTIP_FADE_MS 페이드 후 언마운트
 * - requestSkipExitAnimation 후 닫힘: 즉시 언마운트
 */
export function useTooltipPresence({
  isOpen,
  onExited,
}: UseTooltipPresenceOptions): UseTooltipPresenceResult {
  const [entered, setEntered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterFrameRef = useRef<number | null>(null);
  const skipExitAnimationRef = useRef(false);
  const onExitedRef = useRef(onExited);
  const isOpenRef = useRef(isOpen);

  onExitedRef.current = onExited;
  isOpenRef.current = isOpen;

  const clearExitTimer = () => {
    if (exitTimerRef.current != null) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  };

  const clearEnterFrame = () => {
    if (enterFrameRef.current != null) {
      cancelAnimationFrame(enterFrameRef.current);
      enterFrameRef.current = null;
    }
  };

  const unmountInstant = () => {
    clearExitTimer();
    clearEnterFrame();
    setEntered(false);
    setIsMounted(false);
    skipExitAnimationRef.current = false;
    onExitedRef.current?.();
  };

  useEffect(() => {
    if (isOpen) {
      clearExitTimer();
      skipExitAnimationRef.current = false;
      setIsMounted(true);
      return;
    }

    if (!isMounted) return;

    if (skipExitAnimationRef.current) {
      unmountInstant();
      return;
    }

    setEntered(false);
    exitTimerRef.current = setTimeout(() => {
      setIsMounted(false);
      exitTimerRef.current = null;
      onExitedRef.current?.();
    }, TOOLTIP_FADE_MS);

    return clearExitTimer;
  }, [isOpen, isMounted]);

  useEffect(() => {
    return () => {
      clearExitTimer();
      clearEnterFrame();
    };
  }, []);

  const requestSkipExitAnimation = () => {
    skipExitAnimationRef.current = true;
  };

  const enterAfterPaint = () => {
    if (!isOpenRef.current) return;
    clearEnterFrame();
    enterFrameRef.current = requestAnimationFrame(() => {
      setEntered(true);
      enterFrameRef.current = null;
    });
  };

  return {
    entered,
    isMounted,
    requestSkipExitAnimation,
    enterAfterPaint,
  };
}
