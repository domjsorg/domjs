/******************************************
 *  Copyright 2022 Alejandro Sebastian Scotti, Scotti Corp.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.

 *  Author : Alejandro Scotti
 *  Created On : Sat Feb 26 2022
 *  File : server.js
 *******************************************/
'use strict';

// Scope variables
const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const port = process.env.PORT || 8000;

// path bars by platform
const separator = process.platform === "win32" ? "\\" : "/";

//setting middleware
//Serves resources from public folder
app.use(express.static(`${__dirname}/`));

// Fetch a file
app.get("/getFile", handleGetFileRequest);

// Return Index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

function handleGetFileRequest(req, res) {
  // Allow any domain on this route
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const myPath = path.join(`${__dirname}${separator}${req.query.path}`);
  fs.readFile(myPath, 'utf8', (err, file) => {
    if (err) {
      res.send(err);
    }
    res.send(file);
  });
}

// Start up Application
app.listen(port);
console.log(`Listening on http://localhost:${port}`);
