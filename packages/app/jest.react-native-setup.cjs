jest.mock("expo/src/winter", () => ({}));
jest.mock("expo/src/winter/runtime.native", () => ({}));
jest.mock("expo/virtual/streams", () => ({}));

jest.mock("react-native-worklets", () => ({}));

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");

  const createAnimatedComponent = (Component) => Component;

  return {
    __esModule: true,
    default: {
      View,
      createAnimatedComponent,
      call: () => {},
    },
    View,
    createAnimatedComponent,
    useSharedValue: (value) => ({ value }),
    useAnimatedStyle: (factory) => factory(),
    withTiming: (value) => value,
    withSpring: (value) => value,
    Easing: {
      out: (value) => value,
      in: (value) => value,
      cubic: {},
    },
    cancelAnimation: () => {},
    runOnJS: (fn) => fn,
  };
});

require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  presets: ["babel-preset-expo"],
  ignore: [/node_modules\/(?!@react-native\/jest-preset)/],
});

require("@react-native/jest-preset/jest/setup.js");
