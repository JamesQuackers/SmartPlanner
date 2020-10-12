const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("./home-living-bda75-firebase-adminsdk-bv4td-2edb292104.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://home-living-bda75.firebaseio.com"
});

//Routes
require('./routes/ingredients.routes')(app);

exports.app = functions.https.onRequest(app);
