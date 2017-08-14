/**
 *
 *  module to simulate a db request
 *
 */

module.exports = (() => {
		/**
		*
		*  Return a list of fence
		*  @select = query to process
		*/
		let dbname = '';
		let port = '';
		
		let queryPostgresDB = function(select){
			let fenceResults = [];

			//ramdom functions to fail
			let fail1 = Math.floor(Math.random() * 10) 
			let fail2 = Math.floor(Math.random() * 10) 
			let fail3 = Math.floor(Math.random() * 10) 

			//add 10 elements to the fence array
			for(var i=0; i < 10; i++){

				//some elements of the array will cause error (element 5, 6 and 10)
				if(i === fail1|| i === fail2 || i === fail3) {
					fenceResults[i] = {
						ptOne: i + 1,
						fence: {},
						ruleQueryData: 'some rule',
						message : "this is a test",
						causeError: true
					}
				} else {
					//the rest of the elements wont cause any erros
					fenceResults[i] = {
						ptOne: i + 1,
						fence: {},
						ruleQueryData: 'some rule',
						message : "this is a test",
						causeError: false
					}
				}
			}

			//return a promise
			return Promise.resolve(fenceResults);
	  }

	return {
		//returning only the private function
		queryPostgresDB : (select) => {
			return queryPostgresDB(select);
		}
	}
})();