import { useTheme } from "../../theme/ThemeProvider";
import { LoadingDots } from "../_shared/LoadingDots";
import {
  buttonBaseStyles,
  buttonIconGap,
  buttonIconSizes,
  buttonSizeStyles,
  resolveButtonStyles,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
} from "../_shared/buttonStyles";

type IconButtonBaseProps = {
  src: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};

type IconButtonProps =
  | (IconButtonBaseProps & { label: string; "aria-label"?: string })
  | (IconButtonBaseProps & { label?: never; "aria-label": string });

function ButtonIcon({ src, size }: { src: string; size: ButtonSize }) {
  const iconSize = buttonIconSizes[size];

  return (
    <span
      aria-hidden
      style={{
        width: iconSize,
        height: iconSize,
        flexShrink: 0,
        backgroundColor: "currentColor",
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export function IconButton({
  src,
  label,
  "aria-label": ariaLabel,
  variant = "filled",
  color = "primary",
  size = "md",
  onClick,
  disabled = false,
  loading = false,
  type = "button",
}: IconButtonProps) {
  const { theme, colorScheme } = useTheme();
  const hasLabel = Boolean(label);
  const accessibleLabel = ariaLabel ?? label;
  const colorStyles = resolveButtonStyles(variant, color, theme, colorScheme);
  const isInactive = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isInactive}
      aria-busy={loading}
      aria-label={hasLabel ? undefined : accessibleLabel}
      style={{
        ...buttonBaseStyles,
        gap: hasLabel ? buttonIconGap : 0,
        cursor: isInactive ? "not-allowed" : "pointer",
        opacity: isInactive ? 0.5 : 1,
        ...colorStyles,
        ...buttonSizeStyles[size],
      }}
    >
      <span
        aria-hidden={loading}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: hasLabel ? buttonIconGap : 0,
          visibility: loading ? "hidden" : "visible",
        }}
      >
        <ButtonIcon src={src} size={size} />
        {label}
      </span>
      {loading && (
        <LoadingDots color={colorStyles.color as string} size={size} />
      )}
    </button>
  );
}
