const express = require('express');
const router=express.Router();
const app=express();
// const PORT = 4000;
// const path = require('path');
// require('./db/conn');
// const signupRecord = require('./models/signupschema')
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(path.join(__dirname, 'public/css')));
// app.use(express.urlencoded({ extended: false }))
const countries = [
    { name: 'India', imageUrl: 'https://i.natgeofe.com/k/42e832f5-fd48-43ff-b338-091bdf4048ca/india-tajmahal_16x9.jpg?w=1200' },
    { name: 'Japan', imageUrl: 'https://afar.brightspotcdn.com/dims4/default/55b4d7f/2147483647/strip/true/crop/1357x720+41+0/resize/1440x764!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fcf%2F8a%2F20b4a2c544a58be93512ad67084c%2Fbohler-japankk-4006.jpg' },
    { name: 'South-Korea', imageUrl: 'https://www.thoughtco.com/thmb/rn4UnyqlJMWo5mqpEOYbenaOjWA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/old-fortress-gate-with-light-trails-at-downtown-455242307-58dea6143df78c5162e1ff3d.jpg' },
    { name: 'Australia', imageUrl: 'https://www.avanse.com/blogs/images/blog-4-aug.jpg' },
    { name: 'America', imageUrl: 'https://static.toiimg.com/photo/msid-84475066,width-96,height-65.cms' },
    { name: 'Cuba', imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f5/33/cuba.jpg?w=700&h=500&s=1' },
    { name: 'Paris', imageUrl: 'https://i.natgeofe.com/k/04665f4a-3f8d-4b62-8ca3-09ce7dfc5a20/france-eiffel-tower.jpg?w=1084.125&h=609' },
    { name: 'Finland', imageUrl: 'https://www.visitfinland.com/dam/jcr:99e9d65f-cfd4-4bc6-93b5-8d524bb4227f/Finland_Aurora_dome_Jeris_Antti_Pietik%C3%A4inen.12422788202013340987_optimized.jpg' },
    { name: 'Denmark', imageUrl: 'https://i.natgeofe.com/k/c4b51a61-ac20-4b96-a52a-609ab6576a4e/denmark-copenhagen-canal.jpg?w=1084.125&h=609' },
    { name: 'Mexico', imageUrl: 'https://cdn.britannica.com/86/167886-050-E0D50805/Metropolitan-Cathedral-Mexico-City.jpg' },


]



router.get('/', (req, res) => {
    res.render('destinations', { countries: countries });
});


router.get('/:countryName', async (req, res) => {
    const countryName = req.params.countryName.toLowerCase();
    console.log(countryName);
    try {
        let dataUrl;
        switch (countryName) {
            case 'paris':
                dataUrl = 'https://api.npoint.io/62ddf20607d363468960';
                break;
            case 'finland':
                dataUrl = 'https://api.npoint.io/d133f5fcfac970ad3c2a';
                break;
            case 'america':
                dataUrl = 'https://api.npoint.io/ac212be885f34aa7e354';
                break;
            case 'india':
                dataUrl = 'https://api.npoint.io/7bbd3a59c401f616bb89';
                break;
            case 'denmark':
                dataUrl = 'https://api.npoint.io/62ddf20607d363468960';
                break;
            case 'japan':
                dataUrl = 'https://api.npoint.io/693fd517ef6e5ca11a0e';
                break;
            default:
                throw new Error('Invalid country');
        }
        // const fetch = require('node-fetch');
        const fetch = await import('node-fetch');
        const response = await fetch.default(dataUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        res.render(countryName, { places: data.places });
    } catch (error) {
     console.log(error);
    }
});



module.exports=router;