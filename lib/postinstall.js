const chalk = require("chalk");
let teddyBanner =
  "___         ___       \r\n | _  _| _|  | _. _  _\r\n |(/_(_|(_|\\/|(_|(_|_>\r\n           /      _|  \r\n";
console.log(
  chalk.keyword("orange")("Thank you for installing \n"),
  chalk.magentaBright(teddyBanner),
  chalk.cyanBright(
    "Care to visit? Check the author at (https://github.com/obnoxiousnerd)"
  ),
  chalk.greenBright(
    `\nCompiler ${chalk.redBright(
      "teddy"
    )} is also installed. To compile .td files, simply do ${chalk.redBright(
      "teddy [filename]"
    )}`
  )
); 