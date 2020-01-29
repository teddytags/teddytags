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
let checkTags: RegExp = /<(.)*?>/gm;
let inTagsRegex: RegExp = /((?!<).)+((?!>).)/gm;
let bothTagsRegex: RegExp = /(([^::])+)/gm;
/**
 * Sample format of definiton :
 * ```html
 * <customTag::htmlElement>
 * <!-- Where customTag is the name of yout custom element -->
 * <!-- Where htmlElement is any valid HTML5 element like h1, h2, etc -->
 * <!-- Will go in a .td file only. -->
 * ```
 * The default CLI function that will compile the .td files.
 * Dedicated to my lazy friends who want to easy compile and
 * use their awesome custom tags powered by TeddyTags.
 * @param args The arguments passed
 *
 * Usage:
 * ### Command Line:
 * #### A specific file in root
 * The command:
 *
 * `teddy foo`
 *
 * where foo points to ./foo.td
 * #### A file in a folder of root
 * The command
 *
 * `teddy lib/foo`
 *
 * where lib/foo points to ./lib/foo.td
 *
 * ### API:
 *
 * When compiling a file, say 'foo.td'
 * ```javascript
 * const cli = require('teddytags/lib/cli')
 * cli.start([
 * '', //Node install location
 * '', //Current directory
 * 'foo.td' //Filename
 * ])
 * ```
 * In the above example, the first two are left blank and are useless because Node by default
 * sends the two arguments to any Node CLI. These are spliced out anyways.
 */
export function start(args: Array<string>) {
  /**
   * Extract the required args
   */
  let requiredArgs: string[] = args.splice(2);
  /**
   * The filename to be compiled
   */
  let filename: string = requiredArgs[0];
  /**
   * Get other extension.
   *
   * Currently supported:
   * * (-w, --watch) Watch and compile file
   */
  let otherarg: string = requiredArgs[1];
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
  let exts: string[] = filename.match(/\.[^.]*$/g);
  /**
   * Variable to transform the `exts` to `string`.
   *
   * Full form : FileNAMEEXTension.
   */
  let fnameext: string;
  /**
   * If no extension, flush "" to fnamenext
   */
  if (exts === null) {
    fnameext = "";
  } else {
    /**
     * Or if already present, flush it to `fnameext`
     */
    fnameext = exts.join("");
  }
  /**
   * If extension already present, let it be or add the extension
   */
  if (fnameext === "") {
    filename += ".td";
  } else if (fnameext !== ".td") {
    /**
     * If extension other than `.td`, stop the CLI anyway.
     */
    console.log(chalk.red.bold("Sorry, teddy can only compile .td files."));
    return;
  }
  if (otherarg === "-w" || otherarg === "--watch") {
    watch(filename);
  } else {
    console.log("Compiling", chalk.yellow(filename));
    openFile(filename);
  }
}
/**
 * Function to open a file.
 * Will also run `compileData()` and `flushFile()`
 * @param fname
 */
const openFile = (fname: string) => {
  fs.readFile(fname, (err, res) => {
    /**
     * If the file entered does not exists, stop the CLI anyway.
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
const watch = (fname: string) => {
  console.log(chalk.redBright("Watching file"));
  openFile(fname);
  let timestamp = `[${chalk.grey(new Date().toISOString())}]`;
  fs.watchFile(fname, { persistent: true, interval: 10000 }, (curr, prev) => {
    console.log(timestamp);
    openFile(fname);
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
 * [
 *  "new TeddyTags('customTag').set('h1')"",
 *  "new TeddyTags('newTag').set('p')"",
 * ]
 * ```
 * @param data The data recieved from `openFile()`
 */
export const compileData = (data): string[] => {
  /**
   * Keep tract of line numbers
   */
  let lineNumber: number = 1;
  /**
   * If data not present, stop CLI
   */
  if (!data) {
    console.log(
      chalk.redBright("Not got anything. Check your file for errors"),
      `The correct syntax is ${chalk.cyan("<") +
        chalk.redBright("customTagName") +
        chalk.cyan("::") +
        chalk.redBright("HTMLTagName") +
        chalk.cyan(">")}`,
      chalk.redBright(`\nError occured at line ${chalk.gray(lineNumber)}`)
    );
  }
  let lines: string[] = data.split("\n");
  let output: string[] = [];
  for (let line of lines) {
    /**
     * Find comments and if present, skip the iteration
     */
    if (line.startsWith("#")) {
      /**
       * Extract the comment
       */
      let comment: string = `//${line.match(/\#(.*)/g)[0].match(/[^#].+/g)[0]}`;
      /**
       * push the comment
       */
      output.push(comment);
      continue;
    }
    if (!line.match(checkTags)) {
      /**
       * If not got anything, stop CLI
       */
      console.log(
        chalk.redBright(
          `Your tags do not look right. The correct syntax is ${chalk.cyan(
            "<"
          ) +
            chalk.redBright("customTagName") +
            chalk.cyan("::") +
            chalk.redBright("HTMLTagName") +
            chalk.cyan(">")}`
        ),
        chalk.redBright(`\nError occured at line ${chalk.gray(lineNumber)}`)
      );
      return;
    }
    /**
     * Get text between tags `<>`
     */
    let inTags: string = line.match(checkTags)[0].match(inTagsRegex)[0];
    /**
     * Extract custom tag name and html element name from `inTags`.
     *
     * Example:
     * ```javascript
     * "customTag::h1".match(bothTagsRegex)
     * //returns ['customTag', 'h1']
     * ```
     */
    let array: string[] = inTags.match(bothTagsRegex);
    let customTag: string = array[0];
    let htmltag: string = array[1];
    let boilerplate: string = `new TeddyTags('${customTag}').set('${htmltag}')`;
    output.push(boilerplate);
  }
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
