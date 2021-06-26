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