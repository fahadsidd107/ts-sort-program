import fs from "fs";
import path from "path";
import readline from "readline";

// A interface for classes that can be sorted
interface Sortable {
  sort(): void;
}

// A class that represents a list of numbers that can be sorted
class NumberList implements Sortable {
  // The list of numbers to be sorted
  private numbers: number[] = [];

  // Constructs a NumberList object from a file
  constructor(inputFile: string) {
    // Read the input file and split it into an array of number strings
    const file = fs.readFileSync(path.join(__dirname, inputFile), "utf-8");
    const numStrings = file.split(", ");
    // Parse each string as an integer and add it to the numbers array
    this.numbers = numStrings.map((s) => parseInt(s, 10));
  }

  // Sorts the list of numbers in descending order by default
  sort(order: "asc" | "desc" = "desc") {
    if (order === "asc") {
      this.numbers.sort((a, b) => a - b);
    } else {
      this.numbers.sort((a, b) => b - a);
    }
  }

  // Returns the list of numbers as a string
  toString() {
    return this.numbers.join(", ");
  }
}

// A class that provides static methods for reading and writing files
class FileIO {
  // Reads the contents of an input file
  static readInputFile(inputFile: string): string {
    try {
      return fs.readFileSync(path.join(__dirname, inputFile), "utf-8");
    } catch (error) {
      // Handles errors if the input file cannot be read
      console.error(`Error reading input file: ${error}`);
      process.exit(1);
    }
  }

  // Writes contents to an output file
  static writeOutputFile(outputFile: string, contents: string) {
    try {
      fs.writeFileSync(path.join(__dirname, outputFile), contents);
    } catch (error) {
      // Handles errors if the output file cannot be written
      console.error(`Error writing output file: ${error}`);
      process.exit(1);
    }
  }
}

// The main function of the program
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt the user for input
  rl.question("Enter the name of the input file (enter filename with extension like 'input.txt'): ", function (inputFile) {
    // Create a new NumberList object from the input file
    const numbers = new NumberList(inputFile);

    // Prompt the user for sorting order
    rl.question("Enter the sorting order (1 for ascending, anything else for descending): ", function (order) {
      // Sort the numbers in the specified order
      numbers.sort(order === "1" ? "asc" : "desc");

      // Convert the sorted numbers to a string
      const result = numbers.toString();

      // Prompt the user for output file name
      rl.question("Enter the name of the output file (default: output.txt): ", function (outputFile) {
        rl.close();
        // Use default name if no name provided
        outputFile = outputFile || "output.txt";
        // Write the sorted numbers to the output file
        FileIO.writeOutputFile(outputFile, result);
      });
    });
  });
}

// Call the main function to run the program
main();
