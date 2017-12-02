$.fn.extend({
    banner : function(myjson){
        /*
            banner的api：
                type ：默认fade淡入淡出，填seam就是有缝轮播图；
                seamless ：默认false不无缝，填true变成无缝轮播，但首先type要是seam；
                pic ：轮播的图，请按规定("div ul li")这种格式写，写什么无所谓，但是要按格式写；
                tab ：可以有可无，但是要按格式写("div ul li");
                btn : 左右点击，可有可无，但要按格式写("div div")或者("div ul li")；
                time : 每次轮播间隔的时间，默认3000毫秒；
                tabType : 触发tab的事件，默认click，还可以填mouseenter，
                fadeTime ：淡入淡出的时间，和有缝和无缝滑动的时间，默认300毫秒；
                interval ：是否开始定时器，默认true开启，填false关闭；
                seamDown ：有缝或者无缝轮播的方位，默认fals左右轮播，填true就是上下轮播；
                easing ：前提是必须要先引入” jquery-easing插件 “，还有就是必须是有缝或者无缝，默认swing;

                注意：填写的样式一定是on；
        */
        var type = myjson.type || "fade", //轮播图类型,默认淡入淡出
            seamless = myjson.seamless || false,//无缝还是不无缝，默认不无缝
            pic = myjson.pic,
            tab = myjson.tab,
            btn = myjson.btn,
            time = myjson.time || 3000, //自动轮播时间
            tabType = myjson.tabType || "click", //tab事件
            fadeTime = myjson.fadeTime || 300,//淡入淡出时间，和有缝和无缝滑动的时间
            interval = myjson.interval !== false,  //是否开启定时器
            seamDown = myjson.seamDown || false,   //轮播方位
            easing = myjson.easing || "swing";     //轮播时的动画

        var $pic = this.find(pic),
            $tab = this.find(tab),
            $btn = this.find(btn),
            index = 0,
            timer = null,
            timer1 = null,
            clickback = 0,
            length = $pic.length,
            $picul,width,height;

        //初始化样式
        $tab.eq(0).addClass("on");
        if (type === "fade"){
            $pic.stop().hide();
            $pic.eq(0).stop().show();
        }else if(type === "seam"){
            $picul = $pic.parent();
            width = $pic.width();
            height = $pic.height();
            $pic.css({"position":"static","float":"left","width":width,"height":height});
            if (seamDown){
                $picul.css({
                    "position": "absolute",
                    "left" : 0,
                    "top" : seamless?-height:0,
                    "width": width,
                    "height": (length+10)*height
                })
            }else{
                $picul.css({
                    "position": "absolute",
                    "left" : seamless?-width:0,
                    "top" : 0,
                    "width": (length+10)*width,
                    "height": height
                });
            }
            $picul.parent().css("overflow","hidden");
            if (seamless){
                $picul.append($pic.first().clone(true,true));
                $picul.prepend($pic.last().clone(true,true));
            }
        }

        //tab事件
        $tab[tabType](function(){
            var x = $(this).index();
            if (x !== index){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    change(x);
                },tabType === "click"?10:300,x);
            }
        });

        //tab左右点击事件
        $btn.click(function(){
            var a = index;
            if (new Date - clickback >= 300){
                $(this).index()?a++:a--;
                change(a);
                clickback = new Date;
            }
        });

        //移入关闭定时器,移出开启定时器
        this.hover(function(){
            clearInterval(timer1);
        },interval && auto());

        //自动轮播
        function auto(){
            timer1 = setInterval(function(){
                var x = index;
                x++;
                change(x)
            },time);
            return auto;
        }

        //变化函数
        function change(i){
            var ifFade = type === "fade",
                moveindex = i,
                position = seamDown?height:width,
                posi = seamDown?"top":"left";
            i %= length;
            if(i < 0)i=length-1;
            $tab.eq(index).removeClass("on");
            ifFade && $pic.eq(index).stop().fadeOut(fadeTime);
            index = i;
            if (type === "fade"){
                $pic.eq(index).stop().fadeIn(fadeTime);
            }else{
                moveindex = seamless?moveindex+1:i;
                $picul.stop().animate({
                    [posi] : -moveindex*position
                },fadeTime,easing,function(){
                    if (seamless){
                        if (index === 0 || index === length-1){
                            $(this).css({[posi] : -(index+1)*position});
                        }
                    }
                });
            }
            $tab.eq(index).addClass("on");
        }


    }
});