import { run } from "./server.js";
run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
