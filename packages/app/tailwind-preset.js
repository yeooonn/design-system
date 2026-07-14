const appTailwindConfig = require("./tailwind.config.js");

/** Consumer apps: presets: [require("@yeoooonn/ds-app/tailwind-preset")] */
module.exports = {
  content: appTailwindConfig.content,
  presets: appTailwindConfig.presets,
  theme: appTailwindConfig.theme,
  plugins: appTailwindConfig.plugins,
};
