/*! *****************************************************************************
Copyright © 2020 Pranav Karawale. All rights reserved. 
Licensed under the MIT License (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at https://mit-license.org/  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the MIT License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
import * as fs from "fs";
import * as path from "path";
const chalk = require("chalk");
let regex1: RegExp = /((?!<).)+((?!>).)/gm;
let regex2: RegExp = /(([^::])+)/gm;
/**
 * Sample format of definiton :
 * ```html
 * <customTag::htmlElement>
 * <!-- Where customTag is the name of yout custom element -->
 * <!-- Where htmlElement is any valid HTML5 element like h1, h2, etc -->
 * ```
 * The default CLI function that will compile the .td files.
 * Dedicated to my lazy friends who want to easy compile and
 * use their awesome custom tags powered by TeddyTags.
 * @param args The arguments passed
 *
 * Usage:
 * #### A specific file in root
 * The command:
 * ```
 * teddy foo
 * ```
 * where foo points to ./foo.td
 * #### A file in a folder of root
 * The command
 * ```
 *  teddy lib/foo
 * ```
 * where lib/foo points to ./lib/foo.td
 */
export function cli(args: Array<string>) {
  /**
   * The filename to be compiled
   */
  let filename: string = args.splice(2)[0];
  /**
   * If there is no file input in argument, stop the CLI anyway.
   */
  if (filename === null || filename === undefined || filename === "") {
    console.log(
      chalk.red.bold("Try entering a filename after 'teddy' like:"),
      chalk.grey("teddy path/file")
    );
    return;
  }
  /**
   * Extract extension from file
   */
  let fnameext: string = filename.match(/(.td)?/g).join("");
  /**
   * I extension already present, let it be or add the extension
   */
  if (fnameext !== ".td") {
    filename += ".td";
  }
  console.log("Compiling", chalk.yellow(filename));
  openFile(filename);
}
/**
 * Function to open a file.
 * Will also run `compileData()` and `flushFile()`
 * @param fname
 */
const openFile = (fname: string) => {
  fs.readFile(fname, (err, res) => {
    /**
     * If the file entered does not exists, stop the CLI anywau.
     */
    if (err) {
      if (err.code === "ENOENT") {
        console.log(
          chalk.red.bold("That sounds like an imaginary file."),
          chalk.yellow.underline("Sorry but teddy can only compile real files.")
        );
        return;
      } else {
        throw err;
      }
    }
    let data = res.toString();
    let compiledData: string[] = compileData(data);
    flushFile(compiledData, fname);
  });
};
/**
 * Compile the data using Regular Expressions.
 * Will input data from a .td (Teddy Definitons) file
 * If input is
 * ```html
 * <customTag::h1>
 * <newTag::p>
 * ```
 * Will return output as:
 * ```javascript
 * [`window.onload = function(){`,
 *  `new TeddyTags('customTag').set('h1')`,
 *  `new TeddyTags('newTag').set('p')`,
 * `}`
 * ]
 * ```
 * @param data
 */
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
/**
 * Create the compiled .js file from a .td file.
 * If input from `compileData()` is
 * ```javascript
 * [`window.onload = function(){`,
 *  `new TeddyTags('customTag').set('h1')`,
 *  `new TeddyTags('newTag').set('p')`,
 * `}`
 * ]
 * ```
 * Output in the file
 * ```javascript
 * window.onload = function(){
 *  new TeddyTags('customTag').set('h1')
 *  new TeddyTags('newTag').set('p')
 * }
 * ```
 * @param data The data from compileData, must be type f string[]
 * @param filename The name of file to be flushed to disk
 */
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
