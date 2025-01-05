import { ConfigContext, ExpoConfig } from "expo/config";
import { withForegroundService } from "./manifest.plugin";

const config = (ctx: ConfigContext): ExpoConfig => {
  return ctx.config as ExpoConfig;
};

export default withForegroundService(config({} as ConfigContext));
