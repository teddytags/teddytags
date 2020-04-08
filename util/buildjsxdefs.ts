import * as fs from "fs";
const concatFiles = (finalName: string, ...files: string[]) => {
  files.forEach(file => {
    const fileData = fs.readFileSync(file, 'utf-8')  
    fs.appendFileSync(finalName, fileData)
  });
  console.log(`Concatenated ${files} into ${finalName}`)
};
concatFiles("./lib/teddytags.d.ts", "./src/jsx.d.ts")