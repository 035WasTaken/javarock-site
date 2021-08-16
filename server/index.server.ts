import express from 'express';
import path from 'path';
import { nanoid } from 'nanoid';

import {
    MAIN_PORT,
    ALT_PORT,
    PATH
} from './constants.server'

// todo
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test/stats", (req, res) => {
    res.status(404).send("404 not found")
})

app.get("/api/preview/home", (req, res) => {
    console.log("MMMM")
    res.send("Working!")
})

app.get("/", (req, res) => {
    res.sendFile(`${PATH}/html/index.html`)
})

// for some ungodly reason this has to be after i've handled requests
app.use(express.static(path.join(__dirname, "..", "src", "public")));

const PORT = process.env.PORT || MAIN_PORT;
const PORT_ALT = process.env.PORT || ALT_PORT;

app.listen(PORT, async () => {
    console.log(`App is listening on main port ${PORT}`);
}).on('error', (err) => {

    if (err.message.includes("EADDRINUSE")) {
        app.listen(PORT_ALT, () => {
            console.log(`App is listening on alternative port ${PORT_ALT}`);
        })
    } else {
        console.log("All ports are currently occupied.")
    }

})