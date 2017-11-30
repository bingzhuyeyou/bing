/*nav导航部分*/
(function(){
    var $nav = $("#nav"),
        $hide = $nav.find(".n-list2 .list-hide"),
        $nhide = $nav.find(".n-hide");
    $hide.click(function(){
        $nhide.stop().toggle()
    });
})();

/*banner轮播图部分*/
(function(){
    var $banner = $("#banner"),
        $pratli = $banner.find(".b-part ul li"),
        $btn = $banner.find(".btn ul li"),
        index = 0,
        length = $pratli.length;
    $pratli.eq(0).show();
    $btn.eq(0).addClass("show");

    $btn.click(function(){
        change(function(){
            index = $(this).index();
        }.bind(this))
    });
    auto();
    function auto(){
        $banner.timer = setInterval(function(){
            change(function(){
                index++;
                index %= length;
            })
        },3000)
    }
    $banner.hover(function(){
        clearInterval($banner.timer)
    },auto);
    function change(fn){
        $btn.eq(index).removeClass("show");
        $pratli.eq(index).stop().fadeOut(500);
        fn();
        $btn.eq(index).addClass("show");
        $pratli.eq(index).stop().fadeIn(500);
    }
})();

/*经典案例*/
(function(){
    var $case = $("#case"),
        $btn = $case.find(".btn div"),
        $ul = $case.find(".phone ul"),
        $picli = $case.find(".pic ul li"),
        $li = $ul.find("li"),
        length = $li.length,
        lileng = Math.floor($li.length/2),
        ulleft = 0,
        timer = 0,
        width = 0,
        time = null;
    change();
    $picli.eq(lileng).addClass("show");
    $li.each(function(){
        ulleft += $(this).width();
    });
    $ul.css("marginLeft",-ulleft/2);
    width = $li.eq(0).width();
    $(window).resize(function(){
        clearTimeout(time);
        time = setTimeout(function(){
            ulleft = 0;
            $li.each(function(i){
                ulleft += $(this).width();
            });
            $ul.css({"marginLeft":-ulleft/2});
            width = $li.eq(0).width();
        },300);
    });
    $btn.click(function(){
        if (new Date()-timer >= 300){
            if ($(this).index()){
                lileng++;
                lileng %= length;
                $ul.stop().animate({
                    "marginLeft":(-ulleft/2)-width
                },300,function(){
                    $ul.css({"marginLeft":-ulleft/2}).append($ul.children().first());
                })
            }else{
                lileng--;
                if(lileng < 0)lileng = length-1;
                $ul.stop().animate({
                    "marginLeft":(-ulleft/2)+width
                },300,function(){
                    $ul.css({"marginLeft":-ulleft/2}).prepend($ul.children().last());
                })
            }
            change();
            timer = new Date();
        }

    });
    function change(){
        var a,b,c;
        a = lileng;
        b = lileng-1;
        c = lileng+1;
        if(b<0)b = length-1;
        if(c>=length)c = 0;
        $li.removeClass("p-cen p-le");
        $li.eq(a).addClass("p-cen");
        $li.eq(b).addClass("p-le");
        $li.eq(c).addClass("p-le");
        $picli.eq(a).addClass("show").siblings().removeClass("show");
    }
})();