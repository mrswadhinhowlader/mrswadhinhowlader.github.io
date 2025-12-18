const fs = require("fs");
const path = require("path");

const metaDir = path.join(process.cwd(), "posts", "meta");
const outFile = path.join(process.cwd(), "posts", "posts.json");

const files = fs.existsSync(metaDir) ? fs.readdirSync(metaDir) : [];
const posts = files
  .filter(f => f.endsWith(".json"))
  .map(f => JSON.parse(fs.readFileSync(path.join(metaDir, f), "utf8")))
  .sort((a,b) => (b.date || "").localeCompare(a.date || ""));

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
console.log(`✅ Generated ${outFile} (${posts.length} posts)`);
