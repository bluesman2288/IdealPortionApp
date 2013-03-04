	var server = "http://www.myidealportion.com/";

	//var phoneName = window.device.uuid;

  if(location.host=='localhost'){
	 // var server = "http://localhost/myidealportion/";
  }
  
  
  document.addEventListener("deviceready", onDeviceReady, false);

  // Cordova is ready
  //
  function onDeviceReady() {
      var element = document.getElementById('deviceProperties');

      element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
                          'Device Cordova: '  + device.cordova + '<br />' + 
                          'Device Platform: ' + device.platform + '<br />' + 
                          'Device UUID: '     + device.uuid     + '<br />' + 
                          'Device Version: '  + device.version  + '<br />';
  }

  
function searchFood(id){
		hide('form');
	   $.post(server + "rest/getFood", { id: id, systemId: "" },
      		 function(response) {
		   		
		   		$('#item').html("");
			       	jQuery.each(response, function (index, item)  {
			       		document.getElementById("item").innerHTML=buildFoodItem(item);
			       	});
			       	
			       	back('food', 'item');
		   
	   },
	   "json"
	   );
	   
   }
 

$(document).ready(function(){

   $('#term').focus(function(){
      var full = $("#poster").has("img").length ? true : false;
      if(full == false){
         $('#poster').empty();
      }
   });


   var searchFood = function(){
	   clearResults();
        var film = $('#term').val();

         if(film == ''){

            $('#poster').html("<h2 class='loading'>Ha! We haven forgotten to validate the form! Please enter something.</h2>");

         } else {
        	 
            $('#status').html("<h2 class='loading'>searching food...</h2>");

            
            $.ajax({
                type: "POST",
                url: server + "rest/getCategory",
                data: { value: document.getElementById("term").value, systemId: ""  },
                dataType: "json",
                timeout: 0, // in millisecond
                success: function(response) {
                	$('#status').html("");
                	hide('form');
	            	
	    	             	 document.getElementById("food").innerHTML=buildFoodResult(response);
			    	          
	    	             	
	    	            
	    	        
                },
                error: function(request, status, err) {
                	console.log(status + "---" + err + "===="+ JSON.stringify(request));
                }
            });
            
            back('item', 'food');
        
          }

        return false;
   }
   
   
  

   $('#search').click(searchFood);
 
});