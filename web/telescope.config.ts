import { join } from "path";
import { TelescopeOptions } from "@cosmology/types";

const config: TelescopeOptions = {
  protoDirs: ["../proto"], // adjust to point to your proto dir
  outPath: "./src/proto",
  options: {
    aminoEncoding: true,
    protoEncoding: true,
    bundler: {
      bundleFile: "bundle.ts",
      bundleName: "proto",
    },
  },
};

export default config;
