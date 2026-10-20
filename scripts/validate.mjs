// Reproducible validation of source and the production export. Writes actual process results.
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("docs/validation/raw", { recursive: true });
const records = [];
const run = async (label, executable, args) => {
  const record = { label, command: [executable, ...args], startedAt: new Date().toISOString() };
  const log = createWriteStream(`docs/validation/raw/${label}-final.log`);
  const code = await new Promise((resolve, reject) => {
    const child = spawn(executable, args, { stdio: ["ignore", "pipe", "pipe"], env: process.env });
    child.stdout.pipe(log, { end: false }); child.stderr.pipe(log, { end: false });
    child.on("error", reject); child.on("close", resolve);
  });
  log.end(`\nexit_code=${code}\n`);
  records.push({ ...record, finishedAt: new Date().toISOString(), exitCode: code });
  await writeFile("docs/validation/raw/commands.json", JSON.stringify(records, null, 2));
  console.log(`${label}: exit ${code}`);
  if (code !== 0) process.exit(code ?? 1);
};
await run("typecheck", "npm", ["run", "typecheck"]);
await run("vitest", "npm", ["run", "test:unit", "--", "--reporter=default", "--reporter=json", "--outputFile=docs/validation/raw/vitest.json"]);
await run("build", "npm", ["run", "build"]);
await run("e2e", process.execPath, ["tests/run-browsers.mjs", ...process.argv.slice(2)]);
