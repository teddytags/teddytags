import * as fs from "fs";
const removeNoConcats = (content:string) => {
  return content.replace(/\/\/NO-CONCAT-START((.|\r?\n)*)\/\/NO-CONCAT-END/gm, " ")
}
const concatFiles = (finalName: string, ...files: string[]) => {
  files.forEach(file => {
    const fileData = fs.readFileSync(file, 'utf-8').toString()
    fs.appendFileSync(finalName, removeNoConcats(fileData))
  });
  console.log(`Concatenated ${files} into ${finalName}`)
};
concatFiles("./lib/teddytags.d.ts", "./src/jsx.d.ts")