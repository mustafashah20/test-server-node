const http = require('http');
const express = require('express')
const fetch = require('node-fetch')
const corse = require('cors')
const port = 3005
const app = express();

app.use(
    corse({
        origin: "*",
    })
)

app.get("/artist", async (req, res) => {
    const url = `https://rest.bandsintown.com/artists/${req.query.name}?app_id=12345`
    const options = {
        "method": "GET",
    }
    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(e => ({
            "message": "oh no",
            error: e,
        })
        )
    res.json(response)
});

app.get("/search", async (req, res) => {
    const url = `https://www.bandsintown.com/searchSuggestions?searchTerm=${req.query.name}`
    const options = {
        "method": 'GET',
        headers: {'user-agent': 'node.js'}
    }
    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(e => ({
            "message": "something went wrong",
            error: e,
        })
        )
    res.send(response)
});

app.listen(port, () => {
    console.log("server is listening on port " + port);
});