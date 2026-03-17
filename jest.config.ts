
import type {Config} from 'jest';
const config: Config = {
  clearMocks: true,
  //collectCoverage: true,
  //coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",

  testMatch: [
    "**/__tests__/**/*.?([mc])[jt]s?(x)",
    "**/?(*.)+(spec|test).?([mc])[jt]s?(x)"
  ],
  setupFilesAfterEnv: ["<rootDir>/Tests/setup/global.ts"],
  testTimeout: 30000,
  maxWorkers: 1,

};

export default config;