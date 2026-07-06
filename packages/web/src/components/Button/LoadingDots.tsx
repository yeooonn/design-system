type LoadingDotsSize = "sm" | "md" | "lg";

interface LoadingDotsProps {
  color: string;
  size: LoadingDotsSize;
}

const dotSizeBySize: Record<LoadingDotsSize, number> = {
  sm: 4,
  md: 6,
  lg: 8,
};

export function LoadingDots({ color, size }: LoadingDotsProps) {
  const dotSize = dotSizeBySize[size];
  const delays = [0, 0.15, 0.3];

  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>
        {`
          @keyframes ds-button-dot-bounce {
            0%, 80%, 100% {
              transform: translateY(0);
              opacity: 0.35;
            }
            40% {
              transform: translateY(-35%);
              opacity: 1;
            }
          }
        `}
      </style>
      <span
        role="status"
        aria-label="Loading"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: dotSize * 0.6,
          height: dotSize,
        }}
      >
        {delays.map((delay) => (
          <span
            key={delay}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              backgroundColor: color,
              animation: "ds-button-dot-bounce 0.9s ease-in-out infinite",
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </span>
    </span>
  );
}
