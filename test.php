<?php
$url = 'http://localhost/myidealportion/getFood';
$fields = array(
		'id' => "b2878129-0a0b-4cd6-92d3-e4c1d8720dff",
		'systemId' => ""
		
);

//url-ify the data for the POST
foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string, '&');

//open connection
$ch = curl_init();

//set the url, number of POST vars, POST data
curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_POST, count($fields));
curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//execute post
$result = curl_exec($ch);



print_r($result);

//close connection
curl_close($ch);


function getCategory(){

	$url = 'http://localhost/myidealportion/getCategory';
	$fields = array(
			'value' => "beef",
			'systemId' => ""
	
	);
	
	//url-ify the data for the POST
	foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
	rtrim($fields_string, '&');
	
	//open connection
	$ch = curl_init();
	
	//set the url, number of POST vars, POST data
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch,CURLOPT_POST, count($fields));
	curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	//execute post
	$result = curl_exec($ch);
	
	
	
	
	$result_array=(json_decode($result));
	
	for($x=0;$x<count($result_array);++$x){
	
		$food=$result_array[$x];
	
		$category_name=$food->category_name;
		$food_array = $food->food_array;
	
		$food_item_array=$food->food_item_array;
		echo $food_item_array[0]->id."xxx";
		//	print_r($food);
	
	
	}
	
	//close connection
	curl_close($ch);
}