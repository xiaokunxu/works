require.config({
    baseUrl: "./js",
    paths:{
        "jquery" :"lib/jquery.min"
    }
});
require(['jquery','com/ajax','com/exposure','com/carousel','com/gotop'],function($,AJAX,Exposure,Carousel,GoTop){
	GoTop.init();
	Exposure.init($(".exposure"));
	Carousel.init($("#header"));
	AJAX.init($(".portfolio"));
});
