function Dialog(){
      this.createDialog();
      this.bindEvent();
    }
    Dialog.prototype = {
      defaultOpts: {
        title: '',
        message: '',
        isShowCloseBtn: true,
        isShowConfirmBtn: false,
        onClose: function(){},
        onConfirm: function(){}
      },
      open: function(opts){
        this.setOpts(opts);
        console.log(this.opts);
        this.setDialog();
        this.showDialog();
      },
      colse: function(){
        this.hideDialog();
      },
      setOpts: function(opts){
        if (typeof opts === 'string') {
          this.opts = $.extend({}, this.defaultOpts, {
            message: opts
          });
        } else if (typeof opts === 'object') {
          this.opts = $.extend({}, this.defaultOpts, opts);
        }
      },

      bindEvent: function() {
        var that = this;
        that.$dialog.find('.btn-close').on('click', function(e) {
            e.preventDefault();
            that.opts.onClose();
            that.hideDialog();
        });
        that.$dialog.find('.btn-confirm').on('click', function(e) {
            e.preventDefault();
            that.opts.onConfirm();
            that.hideDialog();
        });
        that.$dialog.on('mousedown', function(e) {
          var $dialog = $(this),
            evtX = e.pageX - $dialog.offset().left,
            evtY = e.pageY - $dialog.offset().top;
          $dialog.addClass('draggable').data('evtPos', {
            x: evtX,
            y: evtY
          });
        });
        $('body').on('mousemove', function(e) {
          $('.draggable').length && $('.draggable').offset({
            top: e.pageY - $('.draggable').data('evtPos').y,
            left: e.pageX - $('.draggable').data('evtPos').x
          });
        });
        $('body').on('mouseup', function() {
          $('.draggable').length && $('.draggable').removeClass('draggable').removeData('pos');
        })
      },

      createDialog: function(){
        var tp1 = '<div class="dialog" style="display:none">' + '<div class="dialog-box">' + '<div class="dialog-header"><h3></h3><span class="btn-close">x</span></div>' + '<div class="dialog-content">' + '</div>' + '<div class="dialog-footer">' + '  <a href="#" class="btn btn-close">取消</a>' + '  <a href="#" class="btn btn-confirm">确定</a>' + '</div>' + '</div>' + '</div>';
        this.$dialog = $(tp1);
        $('body').append(this.$dialog);
      },

      setDialog: function(){
        var $dialog = this.$dialog;
        if(!this.opts.title){
          $dialog.find('.dialog-header').hide();
        } else {
          $dialog.find('.dialog-header').show();
        }
        if(!this.opts.isShowCloseBtn){
          $dialog.find('.dialog-footer .btn-close').hide();
        } else {
          $dialog.find('.dialog-footer .btn-close').show();
        }
        if(!this.opts.isShowConfirmBtn){
          $dialog.find('.btn-confirm').hide();
        } else {
          $dialog.find('.btn-confirm').show();
        }
        $dialog.find('.dialog-header h3').text(this.opts.title);
        $dialog.find('.dialog-content').html(this.opts.message);
      },

      showDialog: function(){
        this.$dialog.show();
      },

      hideDialog: function() {
        this.$dialog.hide();
      },

      distoryDialog: function(){
        this.$dialog.remove();
      },
    }

    $('#open1').on('click', function(){
      var dialog1 = new Dialog();
      dialog1.open('hello, 这里是徐小坤的个人站');
    });
    $('#open2').on('click', function(){
      var dialog2 = new Dialog();
      dialog2.open('<a href="https://xiaokunxu.github.io/"">个人站</a>')
    });
    $('#open3').on('click', function(){
      var dialog3 = new Dialog();
      dialog3.open({
        title: '欢迎来到我的个人站',
        message: 'hello',
        isShowCloseBtn: true,
        isShowConfirmBtn: true,
        onClose: function(){
          alert('close');
        },
        onConfirm: function(){
          alert('确定');
        }
      });
    });

    var tp1 = '<ul><li>列表1</li><li>列表2</li><li>列表3</li><li>列表4</li></ul>';
    $('#open4').on('click', function(){
      var dialog4 = new Dialog();
      dialog4.open({
        title: '欢迎来到我的个人站',
        message: tp1,
        isShowCloseBtn: true,
        isShowConfirmBtn: true,
        onClose: function(){
          alert('close');
        },
        onConfirm: function(){
          alert('确定');
        }
      });
    });

    $('#open5').on('click', function(){
      var dialog5 = new Dialog();
      dialog5.open({
        title: '欢迎来到我的个人站',
        message: 'hello',
        isShowCloseBtn: false,
        isShowConfirmBtn: false
      });
    });