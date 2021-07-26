// Modules
const fs = require('fs');
const express = require('express');

// Variable
const app = express();

// Imports Routes
app.use(`/`, require(`./routes/index.js`)); // Index
fs.readdirSync('./src/server/routes').forEach(dirs => {
    if (!dirs.endsWith('.js')) {
        const routes = fs.readdirSync(`./src/server/routes/${dirs}`).filter(files => files.endsWith('.js'));
        for (const route of routes) {
            app.use(`/${dirs}/${route.slice(0,-3)}`, require(`./routes/${dirs}/${route}`));
        };
    } else {
        app.use(`/${dirs.slice(0,-3)}`, require(`./routes/${dirs}`));
    }

});

// Process
app.listen(process.env.PORT || 3000)
console.log(`Express Module Logged on Port ${process.env.PORT || 3000}！`)

// Exports
module.exports = app
