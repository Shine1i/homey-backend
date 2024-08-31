// import { Hono } from 'hono';
// import mongoose from 'mongoose';
// import type { User as LUser, Session as LSession } from 'lucia';
// import { authMiddleware } from './middleware.ts';
// import Listing from "../database/models/listing.ts";
//
// const app = new Hono()
//
// mongoose.connect('mongodb+srv://wasimysdev:souJrp4mX9CsTxDF@homey.47bj1.mongodb.net/yourDatabaseName').then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB:', err);
// });
//
// //  number of rooms and closest coordinates
// app.get('/listings', async (c) => {
//     const { rooms, lon, lat } = c.req.query();
//
//     if (!lon || !lat) {
//         return c.json({ error: 'Missing required query parameters' }, 400);
//     }
//
//     try {
//         const query: any = {
//             location: {
//                 $near: {
//                     $geometry: {
//                         type: "Point",
//                         coordinates: [Number(lon), Number(lat)]
//                     },
//                     $maxDistance: 25000
//                 }
//             }
//         };
//
//         if (rooms) {
//             query.rooms = Number(rooms);
//         }
//
//         const listings = await Listing.find(query)
//           .limit(15)
//           .exec();
//
//         console.log(`Found ${listings.length} listings`);
//
//         return c.json(listings);
//     } catch (err) {
//         console.error('Error fetching listings:', err);
//         return c.json({ error: 'Error fetching listings' }, 500);
//     }
// });
// app.get('/', (c) => {
//     return c.text('Hello');
// });
// export { app };
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import mongoose from 'mongoose';
import Listing from "../database/models/listing.ts";

const app = new Hono();

// Configure CORS
app.use('*', cors({
    origin: '*', // Allows all origins. Adjust this as per your requirements.
}));

mongoose.connect('')
  .then(() => {
      console.log('Connected to MongoDB');
  })
  .catch(err => {
      console.error('Error connecting to MongoDB:', err);
  });

// Number of rooms and closest coordinates
app.get('/listings', async (c) => {
    const { rooms, lon, lat, page = '1' } = c.req.query();
    
    if (!lon || !lat) {
        return c.json({ error: 'Missing required query parameters' }, 400);
    }
    
    const pageNumber = Number(page);
    const limit = 15;
    const skip = (pageNumber - 1) * limit;
    
    try {
        const query: any = {
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [Number(lon), Number(lat)]
                    },
                    $maxDistance: 25000
                }
            }
        };
        
        if (rooms) {
            query.rooms = Number(rooms);
        }
        
        const listings = await Listing.find(query)
          .limit(limit)
          .skip(skip)
          .exec();
        
        console.log(`Found ${listings.length} listings`);
        
        return c.json(listings);
    } catch (err) {
        console.error('Error fetching listings:', err);
        return c.json({ error: 'Error fetching listings' }, 500);
    }
});

app.get('/', (c) => {
    return c.text('Hello');
});

export { app };