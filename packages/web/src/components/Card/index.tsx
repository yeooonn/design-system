import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { resolveCardStyles } from "./cardStyles";

type CardProps = {
  children: React.ReactNode;
  boxShadow?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

type CardSectionProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function CardHeader({ children, className, style }: CardSectionProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveCardStyles(theme, colorScheme);

  return (
    <div className={className} style={{ ...styles.header, ...style }}>
      {children}
    </div>
  );
}

function CardContent({ children, className, style }: CardSectionProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveCardStyles(theme, colorScheme);

  return (
    <div className={className} style={{ ...styles.content, ...style }}>
      {children}
    </div>
  );
}

function CardFooter({ children, className, style }: CardSectionProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveCardStyles(theme, colorScheme);

  return (
    <div className={className} style={{ ...styles.footer, ...style }}>
      {children}
    </div>
  );
}

function CardRoot({
  children,
  boxShadow = false,
  className,
  style,
}: CardProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveCardStyles(theme, colorScheme, { boxShadow });

  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      {children}
    </div>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
