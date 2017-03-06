;(function (window,document,undefined,$) {
    $.leafDialog = {
        init:function (option) {
            var opts = $.extend({},$.leafDialog.defaults,option);
            var dialogDom = this.template(opts);
            this.position(dialogDom);
            this.resize(this,dialogDom);
            this.events(dialogDom,opts.callback);
            if(opts.isDrag)this.drag(dialogDom,opts);
        },
        template:function (opts) {
        	var dialogDom = $("#dialog");
        	var overlayDom = $("#leaf-overlay");
            if(dialogDom)dialogDom.remove();
            if(overlayDom)overlayDom.remove();
            var dialog = $("<div class='dialog'>"+
	    		"	<div class='dialog-header'>"+
			    "        <h2 class='dialog-title'>"+
			    "           <i class='iconfont icon-tip'></i>"+
			    "            <span>"+opts.title+"</span>"+
			    "        </h2>"+
			    "        <a href='javascript:void(0)' class='close' id='close'><i class='iconfont icon-close'></i></a>"+
			    "    </div>"+
			    "    <div class='dialog-body clearfix'>"+
			    "        <span class='icon'><i class='iconfont icon-jinggao-copy'></i>"+
			    "        </span>"+
			    "       <div class='dialog-content'>"+opts.content+"</div>"+
			    "    </div>"+
			    "    <div class='dialog-footer'>"+
			    "        <a href='javascsript:void(0)' class='btn' id='sure'>"+opts.stext+"</a>"+
			    "   </div>"+
			    "</div>");
            
            var overlay = $("<div class='leaf-overlay'></div>");
            $("body").append(dialog);
            $("body").append(overlay);
            dialog.prop("id","leaf-dialog");
            overlay.prop("id","leaf-overlay");
            return dialog;
        },
        position:function(dialogDom){
            var left = ($(window).width() - dialogDom.width())/2;
            var top = ($(window).height() - dialogDom.height())/2;
            dialogDom.css({
                left:left,
                top:top
            });
        },
        resize:function(that,dialogDom){
            $(window).resize(function () {
                that.position(dialogDom);
            });
        },
        events:function (dialogDom,callback) {
            var top = dialogDom.offset().top+10;
            function animate(){
                dialogDom.animate({
                    top:-top
                },function () {
                    dialogDom.remove();
                    $("#leaf-overlay").fadeOut("fast",function(){
                    	$(this).remove();
                    });
                });
            }
            $("#close").on("click",function () {
                animate();
                callback && callback();
            });
            $("#sure").on("click",function () {
                animate();
                callback && callback();
            });
        },
        drag:function(dialogDom,opts){
            dialogDom.on("mousedown",".dialog-header",function (e) {
            	dialogDom.addClass("noSelection");
                var left = dialogDom.offset().left,
                    top = dialogDom.offset().top,
                    x = e.pageX,
                    y = e.pageY;
                $(document).on("mousemove",function (e) {
                    var newX = e.pageX,
                        newY = e.pageY,
                        nleft = newX - x + left,
                        ntop = newY - y + top,
                        maxleft = $(window).width() - dialogDom.width(),
                        maxtop = $(window).height() - dialogDom.height();
                        if(nleft<0)nleft=0;
                        if(nleft>maxleft)nleft=maxleft;
                        if(ntop<0)ntop=0;
                        if(ntop>maxtop)ntop=maxtop;
                        dialogDom.css({
                            left:nleft,
                            top:ntop
                        });
                }).on("mouseup",function () {
                    $(this).off("mousemove");
                    $(this).off("mouseup");
                    dialogDom.removeClass("noSelection");
                });
            });
        }
    };
    $.leafDialog.defaults = {
        title:"提示",
        content:"请输入你的内容...",
        stext:"确定",
        isDrag:true
    };
})(window,document,undefined,jQuery);