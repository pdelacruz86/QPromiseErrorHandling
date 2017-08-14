
(function(){
  let db = require('./lib/db.js');
  let geoFences = require('./lib/geoFences.js')

  //using "Q" a promise library for JavaScript 
  let Promise = require('q');

  //simulating query 
  let select = 'select * from geofences where rule == XXX'

  //call the queryPostgresDB promise function
  db.queryPostgresDB(select)
    .then((results) => {
      if(results.rowCount === 0){
          console.log('No geofence for rule, XXX');
          return resolve("data");
      }

      let promisesArray = [];
      for(let i = 0; i < results.length; i++){
          //get the params.ptOne, params.fence, params.ruleQueryData, params.message
          var result = results[i];
          promisesArray.push(geoFences.checkGeoFences(result));
      }

      //check all Geo Fences, if a promise fail or is rejected keep procesing all promises
      return  Promise.allSettled(promisesArray);
    })
    .then((data) => {
      //here we check for fulfilled or failures
      var results = [];
      var resultsRejected = [];

      data.forEach(function(result) {
        if (result.state === "fulfilled") {
           results.push(result.value);
        } else {
           resultsRejected.push("Rejected promise :  " + result.reason);
        }            
      });

      //do as you please with the results
      console.log("Results - fullfilled");
      console.log(results);

      console.log("Results - rejected");
      console.log(resultsRejected);

      //ending the promise chain 
      return results;
    })
})()
