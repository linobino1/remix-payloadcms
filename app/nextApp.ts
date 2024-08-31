import path from "path";
import { fileURLToPath } from "url";
import next from "next";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const dev = process.env.NODE_ENV !== "production";
export const nextApp = next({
  dev,
  customServer: true,
  dir: path.join(dirname, "../"),
});
