<?php
	header("Content-type: ");
	$status = $_GET["status"];
	if($status == 1){
		$ret = array(
			"0"=>array(
				'url'=>"./image/portfolio/pro-1.jpg",
				'title'=>"Round Icons",
				'content'=>"Graphic Design"
			),
			"1"=>array(
				'url'=>"./image/portfolio/pro-2.jpg",
				'title'=>"Startup Frameword",
				'content'=>"Website Design"
			),
			"2"=>array(
				'url'=>"./image/portfolio/pro-3.jpg",
				'title'=>"Treehouse",
				'content'=>"Website Design"
			),
			"3"=>array(
				'url'=>"./image/portfolio/pro-4.jpg",
				'title'=>"Golden",
				'content'=>"Graphic Design"
			),
			"4"=>array(
				'url'=>"./image/portfolio/pro-5.jpg",
				'title'=>"Escape",
				'content'=>"Website Design"
			),
			"5"=>array(
				'url'=>"./image/portfolio/pro-6.jpg",
				'title'=>"Dreams",
				'content'=>"Graphic Design"
			)
		);
	}else{
		$ret = "refuse";
	}
	echo json_encode($ret);
 ?>
