import * as fs from 'fs';

type Result = {
    id: number;
    references: Record<string, any>;
    type: string;
    uri: string;
    municipality: string;
    county: string;
    city: string;
    location: { lat: number; lon: number };
    images: Array<{ image: string; caption: string; position: number }>;
    videos: any[];
    boost_value: number;
    title: string;
    audience: string;
    is_short_lease: boolean;
    early_access: { start: string; end: string; active: boolean; mode: string };
    rent: number;
    rooms: number;
    area: number;
    date_access: string;
    object_ad: Record<string, any>;  // Updated type of object_ad
};

type Data = {
    results: Result[];
};

// Function to process the array
function mergeNestedObjectAd(results: Result[]) {
    return results.map(result => {
        if (result.object_ad && result.object_ad.object_ad) {
            // Merge properties
            result.object_ad = {
                ...result.object_ad,
                ...result.object_ad.object_ad
            };
            // Remove the nested object_ad
            delete result.object_ad.object_ad;
        }
        return result;
    });
}

// Read the JSON data from the file
fs.readFile('../output.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    
    try {
        const parsedData: Data = JSON.parse(data);
        
        // Process the data
        const updatedData = mergeNestedObjectAd(parsedData.results);
        
        // Write the updated data back to the file
        fs.writeFile('output.json', JSON.stringify({ results: updatedData }, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing the file:', err);
                return;
            }
            console.log('File has been updated.');
        });
        
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});