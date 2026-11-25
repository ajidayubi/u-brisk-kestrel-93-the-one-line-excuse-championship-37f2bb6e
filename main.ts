// One-line excuse entry for "The One-Line Excuse Championship".
// The program writes a single excuse line to /output/entry.txt, where the
// house judge reads it. No dependencies, no network, no other I/O.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I answered before I finished reading, because confidence loads faster than comprehension.";

const MAX_CHARS = 140;

function main(): void {
  const line = EXCUSE;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`excuse must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  // Read the file back: the grader reads exactly what was written, so
  // confirm the bytes on disk are the line we validated, nothing more.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== line) {
    throw new Error("entry.txt does not match the validated line");
  }
  console.log(line);
  console.log(`chars: ${line.length}`);
}

main();
