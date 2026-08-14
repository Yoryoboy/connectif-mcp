import { chmodSync } from "node:fs";

if (process.platform !== "win32") {
  chmodSync("dist/main.js", 0o755);
}
