var trunks = new Array();

function getTrunksForUser(myObject,limit,callback) {
    		var trunkQuery = new Parse.Query("Activity");
  			trunkQuery.equalTo('type', "addToTrip");
  			trunkQuery.equalTo('toUser', myObject); 
  			trunkQuery.include('trip');
 			trunkQuery.include('trip.publicTripDetail');
  			trunkQuery.include('toUser');
 			trunkQuery.include('creator');
 			trunkQuery.include('createdAt');
  			trunkQuery.descending('createdAt');
  			trunkQuery.exists('trip');
  			trunkQuery.limit = limit;
  
  			var objects = new Array();
    		trunkQuery.find().then(function (objects) {
				for (var i = 0; i < objects.length; i++) {
					var object = objects[i];
					if(!containsObject(object,trunks)){
						//add objec to trunk array
						trunks.push(object);
					}
				}
        		callback.success(trunks);
    		}, function (error) {
        		//handle error here
				callback.error("Error");
    		});
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

Parse.Cloud.define("queryForUniqueTrunks", function(request, response) {
	var MyObject = Parse.Object.extend("User"); 
    var myObject = new MyObject(); 

    myObject.id = request.params.objectId;
    myObject.fetch().then
    (
        function( myObject ){
			getTrunksForUser(myObject,parseInt(request.limit), {
    			success: function(returnValue) {
      				response.success(trunks);
    			},
    			error: function(error) {
      				response.error(error);
    			}
  			});
			
			
            //var trunkQuery = new Parse.Query("Activity");
  			//trunkQuery.equalTo('type', "addToTrip");
  			//trunkQuery.equalTo('toUser', myObject); 
  			//trunkQuery.include('trip');
 			//trunkQuery.include('trip.publicTripDetail');
  			//trunkQuery.include('toUser');
 			//trunkQuery.include('creator');
 			//trunkQuery.include('createdAt');
  			//trunkQuery.descending('createdAt');
  			//trunkQuery.exists('trip');
  			//trunkQuery.limit = parseInt(request.limit);
  
  			//var objects = new Array();
    		//trunkQuery.find().then(function (objects) {
			//	for (var i = 0; i < objects.length; i++) {
			//		var object = objects[i];
			//		if(!containsObject(object,trunks)){
			//			//add objec to trunk array
			//			trunks.push(object);
			//		}
			//	}
        	//	response.success(trunks);
    		//}, function (error) {
        	//	response.error(error);
    		//});
        },
        function( error ) {
            response.error("There was an error trying to fetch User with objectId " + request.params.objectId + ": " + error.message);
        }
    );
});

//Parse.Cloud.beforeSave('trunkQuery', function(request) {
	
//});

//Parse.Cloud.afterSave('trunkQuery', function(request) {
	
//});

