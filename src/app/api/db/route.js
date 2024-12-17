import { getImageUrl } from "../../../shared" // Adjust the path to shared.js

import fs from 'fs'; // ES Module import

// Retrieve image URL
console.log("Retrieved Image URL:", getImageUrl());
const data = getImageUrl(); // Fetch image URL from shared.js

// Write data to a file asynchronously
fs.writeFile('output.txt', data, (err) => {
    if (err) {
        console.error("Error writing to file:", err);
    } else {
        console.log("File written successfully!");
    }
});