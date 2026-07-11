import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../theme/ThemeProvider";
import {
  resolveToastContainerStyles,
  resolveToastItemStyles,
  TOAST_POSITIONS,
  type ToastPosition,
} from "./toastStyles";

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION: ToastPosition = "bottom-center";

export type ToastOpenOptions = {
  text: string;
  position?: ToastPosition;
  duration?: number;
  leftAddon?: React.ReactNode;
};

type ToastEntry = {
  id: string;
  text: string;
  position: ToastPosition;
  duration: number;
  leftAddon?: React.ReactNode;
};

type ToastContextValue = {
  open: (options: ToastOpenOptions) => string;
  close: (id: string) => void;
  closeAll: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function createToastId() {
  return `toast-${Math.random().toString(36).slice(2, 10)}`;
}

function ToastItemView({ toast }: { toast: ToastEntry }) {
  const { theme, colorScheme } = useTheme();
  const [entered, setEntered] = useState(false);
  const styles = resolveToastItemStyles(theme, colorScheme, {
    entered,
    position: toast.position,
  });

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div role="status" aria-live="polite" style={styles.root}>
      {toast.leftAddon != null && (
        <span style={styles.addon}>{toast.leftAddon}</span>
      )}
      <p style={styles.text}>{toast.text}</p>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const clearTimer = (id: string) => {
    const timer = timersRef.current.get(id);
    if (timer != null) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  };

  const close = (id: string) => {
    clearTimer(id);
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const closeAll = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  };

  const open = (options: ToastOpenOptions) => {
    const id = createToastId();
    const duration = options.duration ?? DEFAULT_DURATION;
    const entry: ToastEntry = {
      id,
      text: options.text,
      position: options.position ?? DEFAULT_POSITION,
      duration,
      leftAddon: options.leftAddon,
    };

    setToasts((prev) => [...prev, entry]);

    if (duration > 0) {
      const timer = setTimeout(() => {
        close(id);
      }, duration);
      timersRef.current.set(id, timer);
    }

    return id;
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const toastsByPosition = TOAST_POSITIONS.reduce(
    (grouped, position) => {
      grouped[position] = toasts.filter((toast) => toast.position === position);
      return grouped;
    },
    {} as Record<ToastPosition, ToastEntry[]>,
  );

  return (
    <ToastContext.Provider value={{ open, close, closeAll }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            {TOAST_POSITIONS.filter(
              (position) => toastsByPosition[position].length > 0,
            ).map((position) => (
              <div
                key={position}
                style={resolveToastContainerStyles(position)}
              >
                {toastsByPosition[position].map((toast) => (
                  <ToastItemView key={toast.id} toast={toast} />
                ))}
              </div>
            ))}
          </>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 내에서 사용되어야 합니다.");
  }
  return context;
}

export type { ToastPosition };
