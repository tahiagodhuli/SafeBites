const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express(); // Create the Express app
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Sample restaurant data
const restaurants = [
    {
        id: 1,
        name: "Big Daddy’s Restaurant NYC",
        address: "239 Park Avenue South, New York, NY 10003",
        phone: "212-477-1500",
        website: "https://www.bigdaddysnyc.com/",
        allergySafeOptions: ["Nut-Free", "Gluten-Free"],
    },
    {
        id: 2,
        name: "Murray’s Bagels",
        address: "500 6th Ave, New York, NY 10011",
        phone: "212-462-2830",
        website: "https://www.murraysbagels.com/",
        allergySafeOptions: ["Nut-Free", "Gluten-Free"],
    },
    {
        id: 3,
        name: "Alice’s Tea Cup",
        address: "102 W 73rd St, New York, NY 10023",
        phone: "212-799-3006",
        website: "http://alicesteacup.com/",
        allergySafeOptions: ["Nut-Free", "Gluten-Free", "Vegan"],
    },
    {
        id: 4,
        name: "Erin McKenna’s Bakery",
        address: "248 Broome St, New York, NY 10002",
        phone: "855-462-2292",
        website: "https://www.erinmckennasbakery.com/",
        allergySafeOptions: [
            "Nut-Free",
            "Gluten-Free",
            "Vegan",
            "Soy-Free",
            "Dairy-Free",
            "Egg-Free",
        ],
    },
    {
        id: 5,
        name: "Dylan’s Candy Bar",
        address: "1011 3rd Ave, New York, NY 10065",
        phone: "646-735-0078",
        website: "https://www.dylanscandybar.com/",
        allergySafeOptions: ["Allergen Guide Available"],
    },
    {
        id: 6,
        name: "A La Mode Ice Cream Shoppe",
        address: "360 E 55th St, New York, NY 10022",
        phone: "917-639-3401",
        website: "https://alamodeshoppe.com/",
        allergySafeOptions: ["Nut-Free", "Gluten-Free", "Dairy-Free"],
    },
    {
        id: 7,
        name: "George’s Pizza",
        address: "1771 1st Ave, New York, NY 10128",
        phone: "212-426-8100",
        website: "N/A",
        allergySafeOptions: ["Nut-Free", "Gluten-Free"],
    },
    {
        id: 8,
        name: "Sofia’s Pizza Shoppe",
        address: "980 2nd Ave, New York, NY 10022",
        phone: "212-888-8812",
        website: "https://sofiaspizzashoppe.com/",
        allergySafeOptions: ["Nut-Free"],
    },
    {
        id: 9,
        name: "Tony’s Di Napoli",
        address: "147 W 43rd St, New York, NY 10036",
        phone: "212-221-0100",
        website: "https://www.tonysnyc.com/",
        allergySafeOptions: ["Nut-Free", "Gluten-Free (upon request)"],
    },
    {
        id: 10,
        name: "The Smith",
        address: "1150 Broadway, New York, NY 10001",
        phone: "212-685-4500",
        website: "https://thesmithrestaurant.com/",
        allergySafeOptions: ["Peanut-Free"],
    },
    {
        id: 11,
        name: "La Grande Boucherie",
        address: "145 W 53rd St, New York, NY 10019",
        phone: "212-510-7714",
        website: "https://www.boucherie.com/",
        allergySafeOptions: ["Peanut-Free"],
    },
    {
        id: 12,
        name: "Margaritaville Times Square",
        address: "560 7th Ave, New York, NY 10018",
        phone: "332-242-4820",
        website: "https://www.margaritavilletimesquare.com/",
        allergySafeOptions: ["Peanut-Free"],
    },
    {
        id: 13,
        name: "Bierhaus NYC",
        address: "712 3rd Ave, New York, NY 10017",
        phone: "212-867-2337",
        website: "https://www.bierhausnyc.com/",
        allergySafeOptions: ["Peanut-Free"],
    },
    {
        id: 14,
        name: "Friedman’s",
        address: "132 W 31st St, New York, NY 10001",
        phone: "212-971-9400",
        website: "https://www.friedmansrestaurant.com/",
        allergySafeOptions: ["Gluten-Free (95% of menu)"],
    },
    {
        id: 15,
        name: "Goldberg’s Famous Bagels",
        address: "574 Warburton Ave, Hastings-On-Hudson, NY 10706",
        phone: "914-478-5696",
        website: "https://goldbergsfamousbagels.com/",
        allergySafeOptions: ["Dairy-Free Options"],
    },
    {
        id: 16,
        name: "Aunts et Uncles",
        address: "1407 Nostrand Ave, Brooklyn, NY 11226",
        phone: "347-955-9065",
        website: "https://www.auntsetuncles.com/",
        allergySafeOptions: ["Vegan"],
    },
    {
        id: 17,
        name: "Bloom Cafe",
        address: "277 E 10th St, New York, NY 10009",
        phone: "N/A",
        website: "https://bloomcafe.com/",
        allergySafeOptions: ["Nut-Free", "Allergen-Friendly"],
    },
    {
        id: 18,
        name: "Van Leeuwen Ice Cream",
        address: "Various locations across NYC",
        phone: "N/A",
        website: "https://vanleeuwenicecream.com/",
        allergySafeOptions: ["Vegan", "Nut-Free"],
    },
    {
        id: 19,
        name: "Bluestone Lane",
        address: "55 Hudson Yards, New York, NY 10001",
        phone: "N/A",
        website: "https://www.bluestonelane.com/",
        allergySafeOptions: ["Vegan", "Dairy-Free"],
    },
    {
        id: 20,
        name: "Springbone Kitchen",
        address: "90 W 3rd St, New York, NY 10012",
        phone: "N/A",
        website: "https://www.springbone.com/",
        allergySafeOptions: ["Gluten-Free", "Paleo-Friendly"],
    },
    {
        id: 21,
        name: "HanGawi Restaurant",
        address: "12 E 32nd St, New York, NY 10016",
        phone: "212-213-0077",
        website: "http://www.hangawirestaurant.com/",
        allergySafeOptions: ["Vegan", "Dairy-Free"],
    }
];

// Endpoint to get all restaurants
app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

// Export the app as a Netlify function
module.exports.handler = serverless(app);
