import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(import.meta.dirname, "../.."),
    resolveAlias: {
      "vscode-languageserver-protocol": "./src/mocks/vscode-languageserver-protocol.js",
      "vscode-languageserver-types": "./src/mocks/vscode-languageserver-types.js",
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "vscode-languageserver-protocol": path.join(
          import.meta.dirname,
          "src/mocks/vscode-languageserver-protocol.js"
        ),
        "vscode-languageserver-types": path.join(
          import.meta.dirname,
          "src/mocks/vscode-languageserver-types.js"
        ),
      };
    }
    return config;
  },
};

export default nextConfig;
