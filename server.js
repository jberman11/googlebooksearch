const express = require("express");
const keys = require('./keys')
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const uri = "mongodb+srv://jarretberman@gmail.com:"+keys.secrets.password+"@mycluster-lh5ii.mongodb.net/test?retryWrites=true";
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");
// mongoose.connect( "mongodb://localhost/reactreadinglist" || uri,{dbName: 'googlebooksearch'}, { useNewUrlParser: true });


// const MongoClient = require('mongodb').MongoClient;

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
