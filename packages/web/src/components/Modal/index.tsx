import React from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../theme/ThemeProvider";
import { resolveModalStyles } from "./modalStyles";

type ModalProps = {
  children: React.ReactNode;
  onBackdropClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
};

type ModalSectionProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function ModalHeader({ children, className, style }: ModalSectionProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveModalStyles(theme, colorScheme);

  return (
    <div className={className} style={{ ...styles.header, ...style }}>
      {children}
    </div>
  );
}

function ModalContent({ children, className, style }: ModalSectionProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveModalStyles(theme, colorScheme);

  return (
    <div className={className} style={{ ...styles.content, ...style }}>
      {children}
    </div>
  );
}

function ModalFooter({ children, className, style }: ModalSectionProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveModalStyles(theme, colorScheme);

  return (
    <div className={className} style={{ ...styles.footer, ...style }}>
      {children}
    </div>
  );
}

function ModalRoot({
  children,
  onBackdropClick,
  className,
  style,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}: ModalProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveModalStyles(theme, colorScheme);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    onBackdropClick?.(event);
  };

  return createPortal(
    <div
      className={className}
      style={{ ...styles.backdrop, ...style }}
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        style={styles.panel}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

ModalRoot.displayName = "Modal";
ModalHeader.displayName = "Modal.Header";
ModalContent.displayName = "Modal.Content";
ModalFooter.displayName = "Modal.Footer";

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});
