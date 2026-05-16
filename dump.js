const fs = require("fs");
const path = require("path");
const glob = require("glob");

const patterns = [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.js",
    "src/**/*.scss",
];

console.log("===== PROJECT SNAPSHOT =====");

patterns.forEach((pattern) => {
    const files = glob.sync(pattern, {
        ignore: ["**/node_modules/**", "**/dist/**"],
    });

    files.forEach((file) => {
        const content = fs.readFileSync(file, "utf8");

        console.log("\n======================");
        console.log("FILE:", file);
        console.log("======================\n");
        console.log(content);
    });
});