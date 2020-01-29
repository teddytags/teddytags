const { compileData } = require("../lib/cli");
const { assert } = require("chai");
describe("compileData function TeddyTags CLI", () => {
  let dataToBeCompiled = `<lol::h1>
  <foo::h2>
  <bar::button>`;
  let compiledData = compileData(dataToBeCompiled);
  let shouldBeCompiledData = [
    "new TeddyTags('lol').set('h1')",
    "new TeddyTags('foo').set('h2')",
    "new TeddyTags('bar').set('button')"
  ];
  compiledData.forEach((cline, index) => {
    let line = shouldBeCompiledData[index];
    it(`will check line ${index+=1} of the three compiled ot be equal to expected output`, () => {
      assert.equal(cline, line);
    });
  });
});
