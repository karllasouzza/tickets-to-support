import { getDefaultConfig, mergeConfig } from "@react-native/metro-config";
import { withNativeWind } from "nativewind/dist/metro/index.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = mergeConfig(getDefaultConfig(__dirname), {});

export default withNativeWind(config, {
  input: "./src/styles/global.css",
  inlineRem: 16,
});
