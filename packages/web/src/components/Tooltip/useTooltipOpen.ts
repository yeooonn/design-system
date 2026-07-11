import { useEffect, useRef, useState } from "react";

type UseTooltipOpenResult = {
  isOpen: boolean;
  isControlled: boolean;
  openUncontrolled: () => void;
  closeUncontrolled: () => void;
};

/**
 * open prop이 있으면 controlled, 없으면 hover/focus(uncontrolled).
 * uncontrolled + 스크롤 dismiss는 Tooltip에서 즉시 닫도록 연결한다.
 */
export function useTooltipOpen(
  openProp: boolean | undefined,
  delay: number,
): UseTooltipOpenResult {
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = isControlled ? openProp : uncontrolledOpen;
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDelayTimer = () => {
    if (delayTimerRef.current != null) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
  };

  useEffect(() => {
    return clearDelayTimer;
  }, []);

  const openUncontrolled = () => {
    if (isControlled) return;
    clearDelayTimer();
    if (delay > 0) {
      delayTimerRef.current = setTimeout(() => {
        setUncontrolledOpen(true);
      }, delay);
      return;
    }
    setUncontrolledOpen(true);
  };

  const closeUncontrolled = () => {
    if (isControlled) return;
    clearDelayTimer();
    setUncontrolledOpen(false);
  };

  return {
    isOpen,
    isControlled,
    openUncontrolled,
    closeUncontrolled,
  };
}
