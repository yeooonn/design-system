export type IconSize = "sm" | "md" | "lg";

const iconSizes: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

type IconProps = {
  src: string;
  size: IconSize;
};

export function Icon({ src, size }: IconProps) {
  const iconSize = iconSizes[size];

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
