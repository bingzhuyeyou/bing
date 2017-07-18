//首屏的滑动动画
(function(){
    var $otp = $("#tp"),
    $obg = $("#bg"),
    $claTp = $otp.find(".tp"),
    $tobj = $obg.find(".bg object"),
    $wrp = $("#huado").find(".wrp"),
    $maxW = $(document).width();

    //setTimeout(function(){
    //    $tobj[0].onload = function(){
    //        $(this).css("opacity",1)
    //    }
    //},1500);
    setTimeout(function () {
        $otp.css("display", "block")
    }, 400);


    $(window).resize(function(){
        $maxW = $(document).width();
        wid($maxW);//监听浏览器的宽度判断
    });
    wid($maxW);//打开页面的时候判断
    function wid(maxW){
        if (maxW <= 1680){
            $claTp.css("width","1000px")
        }else{
            $claTp.css("width","1260px")
        }
    }

    setTimeout(function(){
        $otp.css("top", "0")
    },1000);

    $wrp.eq(0).animate({
        "left": "30px",
        "opacity": "1"
    },1800);

    $wrp.eq(1).animate({
        "right": "26px",
        "opacity": "1"
    },1800);

    $wrp.eq(2).animate({
        "top": "70px",
        "opacity": "1"
    },1200);

    $wrp.eq(3).animate({
        "top": "612px",
        "opacity": "1"
    },1200);
})();

//视频弹窗
(function(){
    var $wrp5 = $("#wrp5"),
        $video = $("#video"),
        $scroll = $video.find(".noScroll");

    $wrp5.click(function(){
        $video.show();
        $(document.body).addClass("boshow")
    });
    $scroll.click(function(){
        $video.hide();
        $(document.body).removeClass("boshow")
    })
})();

//新版本情报的滚轮动画
(function(){
    (function(){
        var $pop = $("#popwindow"),
            $newinf = $("#newinf"),
            $close = $pop.find(".close"),
            $btn = $pop.find(".btn"),
            $newinfLi = $newinf.find(".newrong ul li"),
            $txt = $pop.find(".txt"),
            $scro = $pop.find(".scroll"),
            $conLi = $pop.find("ul li"),
            txtH = $txt.height(),
            length = $conLi.length,
            index = 0;

        //自定义滚轮
        $txt.each(function(){
            var $mintxt = $(this).find(".mintxt"),
                $scroll = $(this).find(".scroll"),
                $call = $(this).find(".call"),
                minH = $mintxt.height(),
                top = (txtH/minH)*txtH,
                Topmax = txtH-top,
                Topmin = 0;

            $call.height(top);
            $call.mousedown(function(e){
                var y = e.clientY,
                    This = $(this),
                    callT = $(this).position().top,
                    mintxtT = $(this).parent().siblings();
                $(document).mousemove(function(e){
                    var downy = e.clientY,
                        Top = (downy - y)+ callT;
                    Top = Math.min(Top,Topmax);
                    Top = Math.max(Top,Topmin);
                    This.css("top",Top);
                    mintxtT.css("top",-Top*(minH/txtH));
                }).mouseup(function(){
                    $(this).off("mousemove").off("mouseup");
                });
                return false
            });

            //鼠标滚动上下移动
            $(this).mousewheel(function(e,d){
                var top = $call.position().top;
                if (d < 0){
                    top += 10;
                }else{
                    top -= 10;
                }
                top = Math.min(top,Topmax);
                top = Math.max(top,Topmin);
                $call.css("top",top);
                $mintxt.css("top",-top*(minH/txtH));
                return false
            });

            //点击向下和向上移动
            $scro.click(function(e){
                if (e.target == this){
                    var y = e.clientY - ($(this).offset().top - $(document).scrollTop()),
                        top = $call.position().top;

                    if (y > top){
                        top += 100;
                    }else{
                        top -= 100;
                    }
                    top = Math.min(top,Topmax);
                    top = Math.max(top,Topmin);
                    $call.stop().animate({"top":top},500);
                    $mintxt.stop().animate({"top":-top*(minH/txtH)},500);
                }
            })
        });

        $pop.hide().css("opacity",1);
        $conLi.hide();

        //点击显示
        $newinfLi.click(function(){
            index = $(this).index();
            $(document.body).addClass("boshow");
            $pop.show();
            $conLi.eq(index).show().siblings().hide();
        });

        //点击消失
        $close.click(function(){
            $(document.body).removeClass("boshow");
            $pop.hide();
        });

        //点击作业转换
        $btn.click(function(){
            if ($(this).index(".content .btn")){
                index++;
                index %= length;
            }else{
                index--;
                if (index<0)index = length-1;
            }
            $conLi.eq(index).show().siblings().hide();
        });
    })();

    //3D轮播图
    (function(){
        var $game = $("#game"),
            $dotuLi = $game.find(".dotu ul li"),
            $dian = $game.find(".dotu .dian"),
            length = $dotuLi.length,
            index = 0;

        $dotuLi.click(function(){
            if ($(this).index() !== index){
                index = $(this).index();
                change();
            }
        });

        $dian.click(function(){
            if ($(this).index(".dian")){
                index++;
                index %= length;
            }else{
                index--;
                if (index < 0)index = length-1;
            }
            change();
        });
        function change(){
            var inleft = index - 1,
                inright = index + 1;
            if (inleft < 0)inleft = length-1;
            inright %= length;
            $dotuLi.removeClass("hid left right");
            $dotuLi.eq(inleft).addClass("left");
            $dotuLi.eq(index).addClass("hid");
            $dotuLi.eq(inright).addClass("right");
        }
    })();

    //向下滑动时，元素往上慢慢出现
    (function(){
        var $newinf = $("#newinf"),
            $game = $("#game"),
            $bottom = $newinf.find(".bottom"),
            $show = $bottom.find(".show"),
            $floot = $bottom.find(".floot"),
            $gtiele = $game.find(".title"),
            $dotu = $game.find(".dotu"),
            $img = $game.find(".dotu ul li img"),
            $title = $newinf.find(".title"),
            $newLi = $newinf.find(".newrong li"),
            arr = [];

        inte($title,$newLi,$gtiele,$dotu,$bottom);
        $(window).scroll(function(){
            var height = $(document).scrollTop() + $(window).height();
            for (var i = arr.length - 1; i >= 0; i--) {
                var Arr = arr[i];
                if (height >= Arr.oTop){
                    (function(){
                        var $This = $(Arr);
                            setTimeout(function(){
                                $This.removeClass("hide");
                            },($This.index()%3)*300);
                        arr.slice(i,1);
                    })();
                }
            }
        });
        function inte(){
            for (var i = 0,length = arguments.length; i < length; i++) {
                arguments[i].each(function(){
                    this.oTop = $(this).offset().top;
                    arr.push(this);
                });
            }
        }
    })();
})();