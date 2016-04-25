Parse.Cloud.useMasterKey();

Parse.Cloud.define("copyColumnUsernameToUsernameBack", function(request, response) {

	var copyQuery = new Parse.Query("User");
	copyQuery.limit(1);
	copyQuery.doesNotExist("username_back");
	
    copyQuery.find({
        success: function(results) {
           for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var username = results[i].get("username");
					object.set("username_back",username);
                	object.save(null,{
                  			success: function (object) { 
                    			//response.success(object);
								console.log("success");
                  			}, 
                			error: function (object, error) { 
                  				//response.error(error);
								console.log("failed");
               	 			 }
              		});
		  }
        },
        error: function(error) {
			response.error(error);
            console.log("failed");
        }
    });

});

Parse.Cloud.define("copyColumnLowercaseUsernameToUsername", function(request, response) {

	var copyQuery = new Parse.Query("User");
	copyQuery.limit(1);
	//You must create a column called u_back_temp before running this script.
	//Then delete it after you run the script as many times as you need
	copyQuery.doesNotExist("u_back_temp");
	
    copyQuery.find({
        success: function(results) {
           for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var lowercaseUsername = results[i].get("lowercaseUsername");
					object.set("username", lowercaseUsername);
					object.set("u_back_temp","done");
                	object.save(null,{
                  			success: function (object) { 
                    			//response.success(object);
								console.log("success");
                  			}, 
                			error: function (object, error) { 
                  				//response.error(error);
								console.log("failed");
               	 			 }
              		});
		  }
        },
        error: function(error) {
			response.error(error);
            console.log("failed");
        }
    });

});
