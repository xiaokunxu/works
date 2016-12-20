
    var clock;
    $(window).on('scroll', function(){
      if(clock){
        clearTimeout(clock);
      }
      clock = setTimeout(function(){
        console.log(1);
        checkShow();
      }, 300);
    });
    checkShow();
    function checkShow(){
      $('.img img').each(function(){
        var $cur = $(this);
        if($cur.attr('isLoaded')){
          return;
        }
        if(isShow($cur)){
          showImg($cur);
        }
      });
    }
    function isShow($el){
      var scrollH = $(window).scrollTop(),
          winH = $(window).height(),
          top = $el.offset().top;
      if(top < winH + scrollH){
        return true;
      }else {
        return false;
      }
    }
    function showImg($el){
      $el.attr('src', $el.attr('data-src'));
      $el.attr('isLoaded', true);
    }
