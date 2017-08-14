
/**
 *
 * Fence Actions
 *
 */

module.exports = (function(){
  let Promise = require('q');

  /**
   *
   * function to check GeoFences one bye one
   * @param : list of parameters for the function
   */
  
	var checkGeoFences = (params) => {
			//getting the parameters
			let ptOne = params.ptOne;
			//this variable will let us know if we are rejecting a promise
			let hasError = params.causeError;

			//creating a deferred, representing the  work that is not yet finished
			let deferred = Promise.defer();

			//simulating async operation waiting 2 seconds
			setTimeout(() => {
				//if the work is done and has error
		   	if(hasError){
		   		//reject it
		   		deferred.reject(new Error("Error in checkGeoFences, ptOne : " + ptOne));
		   	}

				//if there is no erros resolve 
				deferred.resolve(params);
			}, 2000);

			//return the promise
			return deferred.promise;
	}


	/**
   *
   * function to check for all fences and the same time if one promise is rejected then stop executing
   * Implementation :
   	 		Promise.resolve(promisesArray)
         .then(geoFences.checkGeoFences)
         .then(fulfillmentHandler, errorHandler, progressHandler)
   *
   * 
   */
  
	var checkGeoFencesAll = function(params){
		return (function (items) {
			console.log(items)
			//acessing the element to process
			var itemToProcess = items;

			//getting the parameters
			var ptOne = itemToProcess.ptOne;
			var hasError = itemToProcess.causeError;


			var deferred = Promise.defer();
	  	var percentage = 0;
	  	var incrementRate = Math.round(100/items.length);

	  	// end
			if (items.length === 0) {
				return Promise.resolve(true);
			}

			//simulating async operation waiting 2 seconds
			setTimeout(function(){
				//incrementing the progress
				percentage += incrementRate;
		   	// deferred.notify(percentage);

		   	if(hasError){
		   		deferred.reject(new Error("there is an error, ptOne : " + ptOne));
		   	}

				// pop one item off the array of tags
				 deferred.resolve(items.splice(1));
			}, 2000);

		 	return deferred.promise.then(checkGeoFences);
		}(params));
	}


	return {
		//giving public access to the private function
		checkGeoFences : (params) => {
			return checkGeoFences(params);
		}
	}
})()