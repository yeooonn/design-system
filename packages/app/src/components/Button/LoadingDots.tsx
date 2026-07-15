import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

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

function Dot({
  color,
  size,
  delay,
}: {
  color: string;
  size: number;
  delay: number;
}) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -size * 0.35,
            duration: 360,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 360,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 360,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.35,
            duration: 360,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(180),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [delay, opacity, size, translateY]);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateY }],
      }}
    />
  );
}

export function LoadingDots({ color, size }: LoadingDotsProps) {
  const dotSize = dotSizeBySize[size];
  const delays = [0, 150, 300];

  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: dotSize * 0.6,
          height: dotSize,
        }}
      >
        {delays.map((delay) => (
          <Dot key={delay} color={color} size={dotSize} delay={delay} />
        ))}
      </View>
    </View>
  );
}
