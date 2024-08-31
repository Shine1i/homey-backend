import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Listing from './models/listing'; // Adjust the path as necessary to where your Listing model is located

// ES Module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON file
const filepath = path.join(__dirname, 'output.json');
const rawData = fs.readFileSync(filepath, 'utf8');
const jsonData = JSON.parse(rawData);
const listings = jsonData.results;

// Function to insert listings into the database
const insertListings = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://wasimysdev:souJrp4mX9CsTxDF@homey.47bj1.mongodb.net/yourDatabaseName');

        // Iterate over each listing in the array and insert it
        for (const listingData of listings) {
            // Ensure audience is a string
            if (Array.isArray(listingData.audience)) {
                listingData.audience = listingData.audience.join(', '); // Join array elements into a single string
            }
            if (listingData.location && listingData.location.lat !== undefined && listingData.location.lon !== undefined) {
                listingData.location = {
                    type: 'Point',
                    coordinates: [listingData.location.lon, listingData.location.lat] // [longitude, latitude]
                };
            }

            const listing = new Listing(listingData);
            await listing.save();

        }

        console.log('All listings have been inserted successfully!');
    } catch (err) {
        console.error('Error inserting listings:', err);
    } finally {
        // Close the MongoDB connection
        await mongoose.disconnect();
    }
};

// Call the function to insert listings
insertListings();

