import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

const REQUEST_NUMBERS_FILE = "./const/request-numbers.txt";

// Create the directory if it doesn't exist
const dir = dirname(REQUEST_NUMBERS_FILE);
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

export function generateRequestId() {
  try {
    if (!existsSync(REQUEST_NUMBERS_FILE)) {
      // If the file doesn't exist, create it with an initial request ID of 1
      writeFileSync(REQUEST_NUMBERS_FILE, "1", "utf8");
    }

    // Read the current request ID from the file
    let currentRequestId = parseInt(
      readFileSync(REQUEST_NUMBERS_FILE, "utf8"),
      10
    );

    // Increment the request ID
    currentRequestId++;

    // Write the updated request ID back to the file
    writeFileSync(REQUEST_NUMBERS_FILE, currentRequestId.toString(), "utf8");

    return currentRequestId;
  } catch (error) {
    console.error("Error:", error);
    return -1; // Handle the error as needed
  }
}
