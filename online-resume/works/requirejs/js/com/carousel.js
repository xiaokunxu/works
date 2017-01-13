define(['jquery'], function($){
  var $ = require('jquery');
  var Carousel = (function(){
    function carousel($node){
      var $ct = $node.find('.img-ct'),
          $items = $ct.children(),
          $pre = $('.pre'),
          $next = $('.next'),
          $bullet = $('.bullet'),
          imgWidth = $(window).width(),
          imgCount = $ct.children().size();

      $ct.prepend($items.last().clone());
			$ct.append($items.first().clone());
			$ct.find('.item').css('width', imgWidth);
			$ct.find('.cover').css('width', imgWidth);
			imgNewCount = $ct.children().size();
			$ct.css({left: 0-imgWidth, width: imgNewCount*imgWidth});

      var curIdx = 0;
			var isAnimate = false;

			$bullet.find('li').on('click', function(){
				var idx = $(this).index();
				if(idx > curIdx){
					playNext(idx - curIdx);
				}else if(idx < curIdx){
					playPre(curIdx - idx);
				}
			});
      $pre.on('click', function(e){
        e.preventDefault();
        playPre();
      });
      $next.on('click', function(e){
        e.preventDefault();
        playNext();
      });
      setBg(0);
      setBg(1);
			autoPlay();

      function playPre(idx){
				var idx = idx || 1;
				if(!isAnimate){
					isAnimate = true;
					setBg(curIdx);
					$ct.animate({left: '+='+(imgWidth*idx)},function(){
						curIdx = (imgCount + curIdx - idx)%imgCount;
						if(curIdx === (imgCount - 1)){
							$ct.css({left: 0-imgWidth*imgCount});;
						}
						isAnimate = false;
						setBullet();
					});
				}
			}

      function playNext(idx){
				var idx = idx || 1;
				if(!isAnimate){
					isAnimate = true;
					setBg(curIdx+2);
					$ct.animate({left: '-='+(imgWidth*idx)},function(){
						curIdx = (curIdx + idx)%imgCount;
						if(curIdx === 0){
							$ct.css({left: 0-imgWidth});
						}
						isAnimate = false;
						setBullet();
					});
				}
			}

      function setBullet(){
				$bullet.children().removeClass('active')
								  .eq(curIdx).addClass('active');
			}

      function setBg(idx){
				var idx = idx || 0,
  					$node = $ct.children().eq(idx),
  					$cover = $node.find('.cover'),
  					imgUrl = $cover.attr('data-bg-img');
				if($node.data('isBgSet')) return;
				$cover.css('background-image', 'url('+imgUrl+')');
				$node.data('isBgSet', true);

			}

      function stopAuto(){
				clearInterval(clock);
			}
			function autoPlay(){
				clock = setInterval(function(){
					playNext();
				}, 3000);
			}
    }

    return {
      init: carousel
    }
  })();
  return Carousel;
})
