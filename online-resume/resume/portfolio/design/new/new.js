var clock;
  $(window).on('scroll', function(){
    if(clock){
      clearTimeout(clock);
    }
    clock = setTimeout(function(){
      checkShow();
    }, 100);
  });

  checkShow();

  function checkShow(){
    if(isShow($('#load'))){
      getData();
    }
  }
  function isShow($el){
    var scrollH = $(window).scrollTop(),
        winH = $(window).height(),
        top = $el.offset().top;
    if(top < scrollH + winH){
      return true;
    }else {
      return false;
    }
  }

  var page = 1,
      count = 10;
  function getData(){
    $.ajax({
      url: 'http://platform.sina.com.cn/slide/album_tech',
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      data: {
        app_key: '1271687855',
        num: count,
        page: page
      }
    }).done(function(ret){
      if(ret && ret.status && ret.status.code === "0"){
        place(ret.data)
      }else {
        console.log("出错啦！！！")
      }
    });
  }

  function place(nodeList){
    var $nodes = renderData(nodeList);
    var defereds = [];
    $nodes.find('img').each(function(){
      var defer = $.Deferred();
      $(this).load(function(){
        defer.resolve();
      });
      defereds.push(defer);
    });
    $.when.apply(null,defereds).done(function(){
      waterFall($nodes);
    })
  }

  var nodeWidth = $('.item').outerWidth(true),
      cols = Math.floor($('#ct-pic').width()/nodeWidth),
      colSumHeight = [];
  for(var i = 0; i < cols; i++){
    colSumHeight[i] = 0;
  }

  function waterFall($nodes){
    $nodes.each(function(){
      var $cur = $(this),
          idx = 0,
          minHeight = colSumHeight[0];
      for(var i= 0; i<colSumHeight.length; i++){
        if(minHeight > colSumHeight[i]){
          minHeight = colSumHeight[i];
          idx = i;
        }
      }
      $cur.css({
        left: nodeWidth*idx,
        top: minHeight,
        opacity: 1
      });
      colSumHeight[idx] = colSumHeight[idx] + $cur.outerHeight(true);
      $('#ct-pic').height(Math.max.apply(null,colSumHeight));
    });
  }

  function renderData(items){
    var str = '',
        $nodes;
    for(var i = 0; i<items.length; i++){
      str += '<li class="item">',
      str +=  '<a href="'+items[i].url+'" class="link"><img src="'+items[i].img_url+'" alt="" /></a>',
      str +=   '<h4>'+items[i].short_name+'</h4>',
      str +=  '<p>'+items[i].short_intro+'</p>',
      str += '</li>';
    }
    $nodes = $(str);
    $('#ct-pic').append($nodes);
    return $nodes;
  }