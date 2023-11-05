import type { Config } from "jest";

const config: Config = {
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],
};

export default config;
