import fs from "fs";
import path from "path";
import axios from "axios";
import glob from "glob";

const MDX_PATTERN = "**/*.mdx";
const VIDEO_REGEX = /(https?:\/\/[^\s"']*video-demos[^\s"']*)/g;

async function downloadFile(url: string, targetPath: string) {
  const cleanUrl = url.split("?")[0];
  const fileName = path.basename(cleanUrl);
  const filePath = path.join(targetPath, fileName);
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url: cleanUrl,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(fileName));
    writer.on("error", reject);
  });
}

async function processMDX(file: string) {
  let content = fs.readFileSync(file, "utf-8");
  const dir = path.dirname(file);
  let updated = false;

  const matches = [...content.matchAll(VIDEO_REGEX)];
  for (const match of matches) {
    const url = match[1];
    const downloadedFile = await downloadFile(url, dir);
    content = content.replace(url, `./${downloadedFile}`);
    updated = true;
  }

  if (updated) fs.writeFileSync(file, content);
}

async function main() {
  const files = glob.sync(MDX_PATTERN);
  for (const file of files) {
    await processMDX(file);
  }
}

main().catch(console.error);
