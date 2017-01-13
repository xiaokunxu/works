// define(['jquery'], function($){
//   function Stickup($node){
//     this.$node = $node;
//     this.clock = false;
//     this.init();
//   }
//   Stickup.prototype = {
//     init: function(){
//       this.fn();
//       this.bind(this.node);
//     },
//
//     fn: function(){
//       this.navHeight = $('#nav').height();
//       this.serviceHeight = $('.services').offset().top;
//       this.portfolioHeight = $('.portfolio').offset().top;
//       this.aboutHeight = $('.about').offset().top;
//       this.teamHeight = $('.team').offset().top;
//       this.logosHeight = $('.logos').offset().top;
//     },
//
//     bind: function(){
//       var that = this;
//       $(window).on('scroll', function(){
//         if(that.clock){
//           clearTimeout(that.clock);
//         }
//         that.clock = setTimeout(function(){
//           that.judge();
//           if(!that.span){
//               $node.removeClass("nav-bar-change");
//               $node.find("li").find("a").removeClass("nav-bar-active");
//           }else {
//               $node.addClass("nav-bar-change");
//               $node.find("li").find("a").removeClass("nav-bar-active");
//               $node.find("li").eq(that.span - 1).find("a").addClass("nav-bar-active");
//           }
//         },100);
//       });
//       $node.on("mouseenter","li",function () {
//           $node.find("li").find("a").removeClass("nav-bar-active");
//       });
//       $node.on("mouseleave",function () {
//           $node.find("li").eq(that.span-1).find("a").addClass("nav-bar-active");
//       })
//     },
//
//     judge:function () {
//       var windowScroll = $(window).scrollTop();
//       if(windowScroll<this.servicesHeight - this.navHeight){
//           this.span = 0;
//       }else if(windowScroll<this.portfolioHeight - this.navHeight){
//           this.span = 1;
//       }else if(windowScroll<this.aboutHeight+ - this.navHeight){
//           this.span = 2;
//       }else if(windowScroll<this.teamHeight - this.navHeight){
//           this.span = 3;
//       }else if(windowScroll<this.logosHeight - this.navHeight){
//           this.span = 4;
//       }else{
//           this.span = 5;
//       }
//     }
//   }
//
//   return {
//     init: function($node){
//       new Stickup($node);
//     }
//   }
// });





define(['jquery'],function($){
    var Stickup = function ($node) {
        this.$node = $node;
        this.clock = false;
        this.init();
    };
    Stickup.prototype = {
        init:function(){
            this.initPosition();
            this.bind(this.$node);
        },
        initPosition:function () {
            this.navLong = $("#nav").height();
            this.servicesBlockHeight = $(".services").offset().top;
            this.portfolioBlockHeight = $(".portfolio").offset().top;
            this.aboutBlockHeight = $(".about").offset().top;
            this.teamBlockHeight = $(".team").offset().top;
            this.logosBlockHeight = $(".logos").offset().top;
        },
        bind:function($node){
            var that = this;
            $(window).on("scroll",function () {
                if(that.clock){
                    clearTimeout(that.clock);
                }
                that.clock = setTimeout(function () {
                    that.judge();
                    if(!that.span){
                        $node.removeClass("nav-bar-change");
                        $node.find("li").find("a").removeClass("nav-bar-active");
                    }else {
                        $node.addClass("nav-bar-change");
                        $node.find("li").find("a").removeClass("nav-bar-active");
                        $node.find("li").eq(that.span - 1).find("a").addClass("nav-bar-active");
                    }
                },100);
            });
            $node.on("mouseenter","li",function () {
                $node.find("li").find("a").removeClass("nav-bar-active");
            });
            $node.on("mouseleave",function () {
                $node.find("li").eq(that.span-1).find("a").addClass("nav-bar-active");
            })
        },
        judge:function () {
            var windowScroll = $(window).scrollTop();
            if(windowScroll<this.servicesBlockHeight - this.navLong){
                this.span = 0;
            }else if(windowScroll<this.portfolioBlockHeight - this.navLong){
                this.span = 1;
            }else if(windowScroll<this.aboutBlockHeight+ - this.navLong){
                this.span = 2;
            }else if(windowScroll<this.teamBlockHeight - this.navLong){
                this.span = 3;
            }else if(windowScroll<this.logosBlockHeight - this.navLong){
                this.span = 4;
            }else{
                this.span = 5;
            }
        }
    };
    return {
        init:function ($node) {
            new Stickup($node);
        }
    }
});
