import fs from "fs";
import path from "path";

function main() {
  const file = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
  const [list] = file.split("\n");

  const result = list;

  fs.writeFileSync(path.join(__dirname, "output.txt"), result.toString());
}
main();
