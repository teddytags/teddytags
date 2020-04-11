import { symlink } from "fs";
import { resolve, join } from "path";
const DIR_LINK_TYPE :symlink.Type = ((process.platform === 'win32') ? 'junction' : 'dir');
const nmodules = resolve(__dirname, "..", "node_modules");
const moduleLinks = [
  {
    alias: "Lib",
    pointsTo: resolve(__dirname, "..", "./lib"),
  },
];
moduleLinks.forEach(link => {
  symlink(link.pointsTo, join(nmodules, link.alias), DIR_LINK_TYPE, () => {
    process.stdout.write(
      `Aliased ${link.alias} -> ${link.pointsTo} -> ${join(
        nmodules,
        link.alias
      )}`
    );
  });
});
