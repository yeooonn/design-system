const path = require("node:path");
const expoPreset = require("jest-expo/jest-preset");

const rnSetupPath = require.resolve("@react-native/jest-preset/jest/setup.js");

const filteredSetupFiles = (expoPreset.setupFiles ?? []).filter(
  (file) => file !== rnSetupPath,
);

/** @type {import('jest').Config} */
module.exports = {
  ...expoPreset,
  setupFiles: [path.resolve(__dirname, "jest.react-native-setup.cjs"), ...filteredSetupFiles],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    ...(expoPreset.moduleNameMapper ?? {}),
    "^@yeoooonn/ds-tokens$": path.resolve(__dirname, "../tokens/src/index.ts"),
  },
};
