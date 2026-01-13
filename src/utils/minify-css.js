#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import CleanCSS from "clean-css";

async function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function generateOutputFilename(inputFile) {
  const dir = path.dirname(inputFile);
  const ext = path.extname(inputFile);
  const basename = path.basename(inputFile, ext);
  return path.join(dir, `${basename}.min${ext}`);
}

async function main() {
  let args = process.argv.slice(2).filter((arg) => arg !== "--");

  let inputFile;
  let outputFile;

  if (args.length === 0) {
    inputFile = await askQuestion("Enter the CSS file path to minify: ");
    inputFile = inputFile.trim();
  } else {
    inputFile = args[0];
  }

  if (!inputFile) {
    console.error("Error: No input file provided.");
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`Error: File "${inputFile}" does not exist.`);
    process.exit(1);
  }

  // Auto-generate output filename if not provided
  if (args.length < 2) {
    outputFile = generateOutputFilename(inputFile);
  } else {
    outputFile = args[1];
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`Error: File "${inputFile}" does not exist.`);
    process.exit(1);
  }

  // Auto-generate output filename if not provided
  if (args.length < 2) {
    outputFile = generateOutputFilename(inputFile);
  } else {
    outputFile = args[1];
  }

  try {
    const cssContent = fs.readFileSync(inputFile, "utf8");
    const cleanCSS = new CleanCSS({ level: 2 });
    const output = cleanCSS.minify(cssContent);

    if (output.errors.length > 0) {
      console.error("Errors during minification:");
      output.errors.forEach((err) => console.error(err));
      process.exit(1);
    }

    if (output.warnings.length > 0) {
      console.warn("Warnings:");
      output.warnings.forEach((warn) => console.warn(warn));
    }

    const minifiedCSS = output.styles;

    fs.writeFileSync(outputFile, minifiedCSS);
    console.log(`✓ CSS minified and saved to: ${outputFile}`);

    const originalSize = cssContent.length;
    const minifiedSize = minifiedCSS.length;
    const savings = (((originalSize - minifiedSize) / originalSize) * 100).toFixed(2);

    console.log(`  Original size: ${originalSize} bytes`);
    console.log(`  Minified size: ${minifiedSize} bytes`);
    console.log(`  Size reduction: ${savings}%`);

    if (output.stats.efficiency) {
      console.log(`  Efficiency: ${output.stats.efficiency.toFixed(2)}%`);
    }
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    process.exit(1);
  }
}

main();
