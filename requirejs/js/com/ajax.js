define(['jquery', 'com/waterFall', 'com/stickup'], function($,WaterFall,Stickup){
  function AJAX($node){
      this.getData();
      this.click($node);
      this.list = $node.find(".portfolio-item");
  }
  AJAX.prototype = {
      getData:function () {
          var that = this;
          $.ajax({
              url:"getData.php",
              dataType:"json",
              method:'get',
              data:{
                  status:1
              }
          }).done(function(ret){
              that.bind(ret);
          }).fail(function () {
              console.log("请求失败");
          })
      },
      click:function($node){
          var that = this;
          $node.find(".btn").on("click",function(){
              that.getData();
          });
      },
      bind:function (ret) {
          var $node = this.render(ret);
          var deferreds = [];
          $node.find("img").each(function () {
              var def = $.Deferred();
              $(this).on("load",function () {
                  def.resolve();
              });
              deferreds.push(def);
          });
          $.when.apply(null,deferreds).done(function(){
              WaterFall.init($(".portfolio"));
              Stickup.init($(".nav-bar"));
          })
      },
      render:function (ret) {
          var tpl = "";
          for(var i = 0; i < ret.length;i++){
              tpl += '<li class="portfolio-item-child">' +
                       '<a href ="#">' +
                        '<img src="' + ret[i].url + '" />' +
                        '<div class="img-hover">' +
                          '<i class="fa fa-plus"></i>' +
                        '</div>'+
                        '</a>' +
                        '<div class="project">'+
                         '<h3>'+ ret[i].title + '</h3>' +
                         '<h4>' + ret[i].content + '</h4>' +
                        '</div>'+
                      '</li>'
          }
          var $node = $(tpl);
          this.list.append($node);
          return $node;
      }
  };
  return {
  init:function ($node) {
    new AJAX($node);
  }
}
})
