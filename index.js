#!/usr/bin/env node
"use strict";

// Create the app objekt
var express = require("express");
var app = express();
const path = require("path");
const DBWEBB_PORT = process.env.DBWEBB_PORT || process.env.LOCAL_DEV_PORT ||
process.env.PORT || 1550;

// Use app as template engine
app.set('view engine', 'pug');

if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

// Add a route
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
        urlPath: req.path
    });
});

app.get("/profile", (req, res) => {
    res.render("profile", {
        title: "Profile",
        urlPath: req.path
    });
});

app.get("/discover", (req, res) => {
    res.render("discover", {
        title: "Discover",
        urlPath: req.path
    });
});

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

// Serve static files
var staticFiles = path.join(__dirname, "public");

app.use(express.static(staticFiles));

// Testing routes with method
app.get("/user", (req, res) => {
    res.send("Got a GET request at " + req.originalUrl);
});

app.post("/user", (req, res) => {
    res.send("Got a POST request at " + req.originalUrl);
});

app.put("/user", (req, res) => {
    res.send("Got a PUT request at " + req.originalUrl);
});

app.delete("/user", (req, res) => {
    res.send("Got a DELETE request at " + req.originalUrl);
});

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

// Note the error handler takes four arguments
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    err.status = err.status || 500;
    res.status(err.status);
    res.render("error", {
        error: err
    });
});

// Start up server, keep last in file
console.log("Express is ready.");
console.log();
app.listen(DBWEBB_PORT, () => {
    console.log(`Server is listening on port ${DBWEBB_PORT}`);
});
