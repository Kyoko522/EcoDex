
import { getImageUrl } from "../../../shared" // Adjust the path to shared.js

import fs from 'fs'; // ES Module import

// Retrieve image URL
console.log("Retrieved Image URL:", getImageUrl());

//TODO: the get statement isn't working as expected
const data = getImageUrl(); // Fetch image URL from shared.js

// Write data to a file asynchronously
fs.writeFile('output.txt', data, (err) => {
    if (err) {
        console.error("Error writing to file:", err);
    } else {
        console.log("File written successfully!");
    }
});

// ----------------------------------------------------------------
import { createClient } from '@supabase/supabase-js';

const supabaseURL = 'in env file';
const supabaseAnoKey = 'in env file';

const supabase = createClient(supabaseURL, supabaseAnoKey);

async function getUsers(){
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.error('Error fetching users:', error);
    } else {
        console.log('Users:', data);
    }
}

getUsers();

asy