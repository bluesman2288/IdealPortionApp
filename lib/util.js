function back(hide,show){
	
	document.getElementById(hide).style.display='none';
	document.getElementById(show).style.display='block';
	
}

function clearResults(){
	$('#food').html("");
	$('#item').html("");	
	$('#chart1').html("");	
	back('item', 'food');

	
}

function hide(dom){
	
	document.getElementById(dom).style.display='none';
	
}
function show(dom){
	
	document.getElementById(dom).style.display='block';
	
}
function buildFoodResult(response){
	
	var output="<a href='#' OnClick=\"show('form');clearResults();\">Search again</a><br>";
	output += "<table>";

	
	jQuery.each(response, function (index, item)  {
	
		output+="<tr><td><table  id='box-table-a' width='80%'>";
		
  	   var categoryName  = (item.category_name);
  	   output+="<thead><tr><th scope='col'>";	
  	   output+=categoryName;
  	   output+="</th></tr></thead><tbody>";
  	   var foodItemArray = item.food_item_array;
  	  jQuery.each(foodItemArray, function (index2, foodItem)  {
  		  
  		  var foodLink = "<a href='#' OnClick=\"searchFood('"+foodItem.id+"');\">"+foodItem.name+"</a>";
  		 // console.log(foodLink);
  		 output+="<tr><td>";
  		 output+=foodLink+"<br>";
      	 output+="</td></tr>";
  	  });
  	  output+="</tbody>";
  	  output+="</table></td></tr>";
	});
	
	output+="</table>"
	return output;
	
}
function buildFoodItem(item){
	
		var output = "";
		var id = item.id;
		var name = item.name;
	
		var servingOutput=parseServings(item.servings);
	    output+="<a href='#' OnClick=\"back('item','food');\">Back</a><br>";
		output+=" <table width='20%' class='hor-minimalist-b'>";
		output+=" <tr>";
		output+=" <th>";
		output+= name;
		output+=" </th>";
		output+=" </tr>";
		
		output+="<tr>";
		output+="<td>";
		output+="<input id='lastIndex' type='hidden' value='div1'>";
		output+="<b>Portion type:</b>";
		output+=createSelect(item.servings);
		output+="</td>";
		output+="</tr>";
		
		output+="<tr>";
		output+="<td>";
		output+="<input id='lastIndex' type='hidden' value='div1'>";
		output+="</td>";
		output+="</tr>";

		output+=" <tr>";
		output+=" <td>";
		output+= servingOutput;
		output+=" </td>";
		output+=" </tr>";
		output+=" </table>";
		
	
		return output;
	
}

function getFrame(url){
	
	output="<iframe src='"+url+"' width='345' height='345' frameborder=0>";
	output+="<p>Your browser does not support iframes.</p>";
	output+="</iframe>";
	
	return output;
}

function roundNumber(num){
	
	return parseFloat(num).toFixed(2);
}


function buildChart(fatCal, proteinCal, carbCal, servingIndex){
    //var divName  ='chart'+servingIndex;
    var divName = 'chart1';
//    alert(divName);

    
    var total = fatCal+proteinCal+carbCal;
	
    var fatPct = (fatCal/total)*100;
    var proteinPct = (proteinCal/total)*100;
    var carbPct = (carbCal/total)*100;
    
	chart = new Highcharts.Chart({
        chart: {
            renderTo: divName,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
      
        title: {
        	enabled:false,
            text: 'Calorie Breakdown'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>';
                        //+ this.percentage +' %';
                    }
                },
                showInLegend: true
            }
           
        },
        series: [{
            type: 'pie',
            name: 'Calories',
            data: [
                ['Fat',   parseFloat(fatCal)],
                ['Protein',  parseFloat(proteinCal)],
                ['Carb',   parseFloat(carbCal)]
            ]
        }]
    });
}


function parseServings(servings){
	var servingOutput = "";
	
	jQuery.each(servings, function (index, item)  {
		
		
		var servingName = item.serving_name;
		var servingIndex = item.serving_index;
		var calories =  roundNumber(item.calories);
		var fatCal = roundNumber(item.fat_cal);
		var proteinCal = roundNumber(item.protein_cal);
		var carbCal = roundNumber(item.carb_cal);
		
		calories = parseFloat(fatCal)+parseFloat(proteinCal)+parseFloat(carbCal);
		
		var url = item.url_address;
		if(servingIndex=="1")
			buildChart(fatCal,proteinCal, carbCal, servingIndex);
		
		var display = "none";
		
		if(servingIndex==1)display="block";
		
		var fat = roundNumber(item.fat);
		var protein = roundNumber(item.protein) ;
		var carbohydrate = roundNumber(item.carbohydrate);
		
		//servingOutput+=calories + "<br>" + protein + "<br>" + carbohydrate + "<br>" + fat  + "<br>" ;
		
		servingOutput+="<div id='div"+servingIndex+"' style='display:"+display+"' style='width:400px;'>";
	
		servingOutput+="<div class='table'>";
		servingOutput+=" <div class='tr'>";
		servingOutput+="	<div class='td' style='height:18px;'>";
		//servingOutput+="		 	<b>Ideal Portion: </b>";
		 	
		servingOutput+=" 	</div>";
		servingOutput+=" 		 <div style='clear: both;'></div>";
		servingOutput+=" </div>";
		servingOutput+=" <div class='tr'> ";
		servingOutput+="     <div class='td'>  ";
		servingOutput+="		<b>Calories:</b> ";
		servingOutput+= calories.toFixed(2);	
		servingOutput+="	 </div>";
		servingOutput+="	 <div style='clear: both;'></div>";
			 
		servingOutput+="  </div>";
		  
		servingOutput+="   <div class='tr'>";
		servingOutput+="     <div class='td'>  ";
		servingOutput+="		<b>Fat:</b> ";
		servingOutput+= fatCal + " calories (" + fat + "g)";	 	
		servingOutput+=" </div>";
		servingOutput+= "<div style='clear: both;'></div>";
			
		servingOutput+=" </div>";
		  
		servingOutput+=" <div class='tr'>";
		servingOutput+=" <div class='td'>  ";
		servingOutput+=" <b>Protein:</b> ";

		servingOutput+= proteinCal + " calories (" + protein + "g)";
		servingOutput+=" </div>";
		servingOutput+=" <div style='clear: both;'></div>";

		servingOutput+="    </div>";
		servingOutput+="     <div class='tr'>";
		servingOutput+="      <div class='td'>  ";
		servingOutput+=" <b>Carb:</b> ";

		servingOutput+= carbCal + " calories (" + carbohydrate + "g)";

		servingOutput+=" </div>";
		servingOutput+=" <div style='clear: both;'></div>";

		servingOutput+="    </div>";

		servingOutput+=" </div>";
		//servingOutput+="<div id='chart"+servingIndex+"' style='height:300px; width:500px;'></div>";
	
//	servingOutput+=getFrame(url);	
		servingOutput+=" </div>";
		
		
		servingOutput+=" </div>";
		
		
	});
	
	

	
	
	return servingOutput;
	
	
	
}


function createSelect(items){
	var output="";

	output+="<select onChange='showNutrient(this.value);'>";

	jQuery.each(items, function (index, item)  {
		var servingName = item.serving_name;
		var servingIndex = item.serving_index;
	output+="<option value='div"+servingIndex+"'>"+servingName+"</option>";
	
	
	});

	output+="</select>";

	return output;
}




function showNutrient(index){

var lastIndex=document.getElementById('lastIndex').value;

console.log(lastIndex);
document.getElementById(lastIndex).style.display='none';

document.getElementById(index).style.display='block';

document.getElementById('lastIndex').value=index;
}
