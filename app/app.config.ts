import { ConfigContext } from "expo/config";
const withForegroundService = require("./manifest.plugin");

module.exports = withForegroundService(({ config }: ConfigContext) => {
  return {
    ...config,
  };
});
