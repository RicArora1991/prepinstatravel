// // const express = require('express');
// // const router = express.Router();
// // const apiKey = 'IWR3pj7FQlbzkycxfjq8217ZPm39UIMj-LE-nXtQ2JA'; // Get your API key from Unsplash
// // async function getFetch() {
// //     try {
// //         // Attempt to import node-fetch using dynamic import
// //         const fetchModule = await import('node-fetch');
// //         return fetchModule.default;
// //     } catch (err) {
// //         throw new Error('Failed to import node-fetch');
// //     }
// // }

// // router.get('/', async (req, res) => {
// //     try {
// //         const location = req.query.location; // Get the location from the query parameters
// //         // Your API key from Unsplash

// //         // Fetch room data from Unsplash API based on location
// //         const response = await fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${apiKey}`);
// //         const data = await response.json();

// //         // Render the rooms.ejs template with the fetched data
// //         res.render('rooms', { location, rooms: data.results });
// //     } catch (error) {
// //         res.render('error', { error: error.message });
// //     }
// // });

// // router.get('/:location', async (req, res) => {
// //     try {
// //         const fetch = await getFetch(); // Get the fetch function
// //         const location = req.params.location; // Location input from the user

// //         // Fetch room data from Unsplash API based on location
// //         const response = await fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${apiKey}`);
// //         const data = await response.json();

// //         // Render the rooms.ejs template with the fetched data
// //         res.render('rooms', { rooms: data.results });
// //     } catch (error) {
// //         res.render('error', { error: error.message });
// //     }
// // });


// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// router.get('/', async (req, res) => {
//     try {
//         const { location } = req.query; // Extract location from query parameter

//         const options = {
//             method: 'GET',
//             url: `https://airbnb13.p.rapidapi.com/search-${location}`,
//             params: {
//                 location, // Use the extracted location
//                 checkin: '2023-09-16',
//                 checkout: '2023-09-17',
//                 adults: '1',
//                 children: '0',
//                 infants: '0',
//                 pets: '0',
//                 page: '1',
//                 currency: 'USD'
//             },
//             headers: {
//                 'X-RapidAPI-Key': 'dd31b4d27emsh313198917f70999p1989d9jsn2945a8c6aa98',
//                 'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
//             }
//         };

//         const response = await axios.request(options);
//         console.log(response.data);

//         // Render the rooms.ejs template with the fetched data
//         res.render('rooms', { rooms: response.data }); // Modify the data as needed
//     } catch (error) {
//         res.render('error', { error: error.message });
//     }
// });

// module.exports = router;



// roomRoutes.js
// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// router.get('/', async (req, res) => {
//     try {
//         const response = await axios.get('https://api.npoint.io/53a35811f6abec09035f');
//         const roomsData = response.data;

//         res.render('rooms', { rooms: roomsData });
//     } catch (error) {
//         res.render('error', { error: error.message });
//     }
// });

// module.exports = router;




///////////////////////////////////////////////////////////////////////////////////////////////
// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
// // router.get('/', async (req, res) => {
// //     try {
// //         const location = req.query.location; // Get the location from the query parameters
// //         // Your API key from Unsplash

// //         // Fetch room data from Unsplash API based on location
// //         const response = await fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${apiKey}`);
// //         const data = await response.json();

// //         // Render the rooms.ejs template with the fetched data
// //         res.render('rooms', { location, rooms: data.results });
// //     } catch (error) {
// //         res.render('error', { error: error.message });
// //     }
// // });

// router.get('/:location', async (req, res) => {
//     // try {
//     //     const fetch = await getFetch(); // Get the fetch function
//     //     const location = req.params.location; // Location input from the user

//     //     // Fetch room data from Unsplash API based on location
//     //     const response = await fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${apiKey}`);
//     //     const data = await response.json();

//     //     // Render the rooms.ejs template with the fetched data
//     //     res.render('rooms', { rooms: data.results });
//     // } catch (error) {
//     //     res.render('error', { error: error.message });
//     // }
//     try {
//                  const location = req.params.location;  // Default location if not provided in the query;
//                 console.log(location);
//                 const response = await axios.get(`https://api.npoint.io/53a35811f6abec09035f/${location}`);
//                 // console.log('response',response);
//                 const roomsData = response.data[location]; // Fetch data based on the location
//                 console.log(roomsData);
//                 if (!roomsData) {
//                     throw new Error('Rooms data not found for this location');
//                 }
        
//                 res.render('rooms', { rooms: roomsData, location }); // Pass both data and location for rendering
//             } catch (error) {
//                 res.render('error', { error: error.message });
//             }
// });


// module.exports = router;



/////////////////////
// roomRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const location = req.query.location; // Default location if not provided in the query;
        console.log(location);
        const response = await axios.get(`https://api.npoint.io/53a35811f6abec09035f?${location}`);
        console.log('response',response.data);
        const roomsData = response.data[location]; // Fetch data based on the location
        console.log(roomsData);
        if (!roomsData) {
            throw new Error('Rooms data not found for this location');
        }

        res.render('rooms', { rooms: roomsData, location }); // Pass both data and location for rendering
    } catch (error) {
        res.render('error', { error: error.message });
    }
});

module.exports = router;

