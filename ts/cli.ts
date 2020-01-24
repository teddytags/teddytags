// Sample format of definiton : <customTag::htmlElement>
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
const chalk = require("chalk");
let regex1: RegExp = /((?!<).)+((?!>).)/gm;
let regex2: RegExp = /(([^::])+)/gm;
let r: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
r.question(chalk.yellow.bold("Enter file directory to compile: "), fname => {
  fs.readFile(fname, (err, res) => {
    if (err) throw err;
    let data = res.toString();
    let compiledData: string[] = compileData(data);
    flushFile(compiledData, fname);
  });
  r.close();
});
const compileData = (data): string[] => {
  let lines: string[] = data.split("\n");
  let output: string[] = [];
  for (let line of lines) {
    let inTags: string = line.match(regex1)[0];
    let array: string[] = inTags.match(regex2);
    let customTag: string = array[0];
    let htmltag: string = array[1];
    let boilerplate: string = `new TeddyTags('${customTag}').set('${htmltag}')`;
    output.push(boilerplate);
  }
  output.unshift("window.onload = function(){");
  output.push("}");
  return output;
};
const flushFile = (data: string[], filename: string) => {
  let dirname = path.dirname(filename);
  let fname = path.parse(filename).name;
  //Creates file
  fs.closeSync(fs.openSync(`${dirname}/${fname}.js`, "w"));
  let lines: string = data.join("\n");
  fs.writeFile(`${dirname}/${fname}.js`, lines, err => {
    if (err) throw err;
    console.log(chalk.blue.bold.underline("Successfully compiled!!"));
  });
};
