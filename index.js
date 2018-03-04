require('dotenv').config();

const _ = require('lodash');
const express = require('express');
const request = require('request');
const Twit = require('twit');
const config = require('./config')

// Express
const app = express();
const PORT = process.env.PORT;

const T = new Twit(config);

const browserLog = function(req){
  return {
    'path': req.path,
    'query': req.query,
    // 'params': req.params,
    // 'route': req.route
  }
};

const searchTwitterErrorLogger = function(err, response){
  console.log(response.statusCode +": "+ response.statusMessage);

  if (err) {
    console.log(err);
    console.log("\n\n");
    console.log(response);
  }
};

const searchTwitter = function(req, res){

  if (!req.query.keyword){
    res.status(500).send('Search requires a keyword parameter.');
  }

  // the Twitter search parameters
  let params = {
    q: req.query.keyword,
    count: req.query.count || 100
  };

  // after Twitter comes back to us with a response, do this:
  let searchCallback = function(err, data, response){
    searchTwitterErrorLogger(err, response);
    res.send(data);
  };

  T.get('search/tweets', params, searchCallback);
};

// Lets start our server
app.listen(PORT, function () {
  console.log("node server app is listening on port: ", PORT);
});

// route: index
app.get('/', function(req, res) {
  res.send(browserLog(req));
});

// route: search tweets
app.get('/search', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  searchTwitter(req, res);
});
