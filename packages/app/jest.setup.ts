import "@testing-library/jest-native/extend-expect";
import { View } from "react-native";

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const inset = { top: 0, bottom: 0, left: 0, right: 0 };

  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => inset,
    initialWindowMetrics: {
      frame: { x: 0, y: 0, width: 390, height: 844 },
      insets: inset,
    },
  };
});

if (!View.prototype.measureInWindow) {
  View.prototype.measureInWindow = function measureInWindow(callback) {
    callback(10, 20, 100, 40);
  };
}

jest.mock("expo-image", () => {
  const { View: MockView } = require("react-native");
  return {
    Image: MockView,
  };
});

jest.mock("react-native-svg", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: View,
    Svg: View,
    Path: View,
  };
});
