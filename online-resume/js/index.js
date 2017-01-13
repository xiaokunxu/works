/*----------------------------------------------------*/
/*  Preload
/*----------------------------------------------------*/
$(window).load(function(){
    $('.load').fadeOut();
    $('#preload').delay(350).fadeOut('slow');
    $('body').delay(350);
})


/*----------------------------------------------------*/
/*  Smooth Scroll
/*----------------------------------------------------*/

$('.smoothscroll').on('click', function(e){
    e.preventDefault();
    var target = this.hash,
        $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 800, 'swing', function () {
        window.location.hash = target;
    });
})



/*----------------------------------------------------*/
/*  Header 视觉差
/*----------------------------------------------------*/
$(window).scroll(function(e){
    parallax();
});

function parallax(){
    var scrollPosition = $(window).scrollTop();
    $('.banner').css('margin-top', (0 - (scrollPosition * 0.8)) + 'px');
}

/*----------------------------------------------------*/
/*  On scroll blur header
/*----------------------------------------------------*/
(function(){
    $(window).scroll(function(){
        var oVal;
        oVal = $(window).scrollTop() / 100;
        return $(".header-overlay").css("opacity", oVal); 
    })
}).call(this);

$(window).on('scroll', function(){
    var h = $('header').height();
    var y = $(window).scrollTop();
    var nav = $('#m-nav');
    if((y > h*.20) && (y < h) && ($(window).outerWidth() > 768)){
        nav.fadeOut('fast');
    }else{
        if(y < h*.20){
            nav.removeClass('opaque').fadeIn('fast');
        }
        else{
            nav.addClass('opaque').fadeIn('fast');
        }
    }
})

/*----------------------------------------------------*/
/*  contact form
/*----------------------------------------------------*/

$('.form#contactForm button.submit').on('click', function(){
    $('#image-loader').fadeIn();
    var contactName = $('#contactForm #contactName').val();
        contactEmail = $('#contactForm #contactEmail').val();
        contactSubject = $('#contactForm #contactSubject').val();
        contactMessage = $('#contactForm #contactMessage').val();

    var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail + 
        '&contactSubject=' + contactSubject + '&contactMessage' + contactMessage;

    $.ajax({
        url: "sendEmail.php",
        type: "post",
        data: data,
        success: function(msg){
            if(mag == 'OK'){
                $('#image-loader').fadeOut();
                $('#message-warning').hide();
                $('#contactForm').fadeOut();
                $('#message-success').fadeIn();
            }else{
                $('#image-loader').fadeOut();
                $('#message-success').html(msg);
                $('#message-warning').fadeIn();
            }
        }
    })
    return false;
});

/*----------------------------------------------------*/
/*  wechat
/*----------------------------------------------------*/
(function(){
  var $dialog = $('li.dialog');
var $modal = $('#modal');
var $cover = $('.cover');
$dialog.on('click', function(){
    $modal.show();
    $('body').addClass('remodal');
});
$cover.on('click', function(){
    $modal.hide();
    $('body').removeClass('remodal');
})
  
})(jQuery)

    

















