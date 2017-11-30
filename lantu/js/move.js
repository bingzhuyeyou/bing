

// (function(){
//     var $nav = $("#nav"),
//         $list1 = $nav.find(".n-list1 li");
//     $list1.click(function(e){
//         $(this).addClass("show").siblings().removeClass("show");
//         e.cancelBubble = true;
//     })
// })();


/*移动校园*/
(function(){
    var $campus = $("#campus"),
        $comtent = $("#comtent");
    $(window).resize(auto());
    function auto(){
        var winW = $(window).height();
        $campus.css({"height":winW-parseFloat($comtent.css("marginTop")),"width":"100%"});
        return auto
    }
})();

/*应用*/
(function(){
    var $cam5 = $("#cam5"),
        $picli = $cam5.find(".pic ul li"),
        $btnpan = $cam5.find(".btn ul li span"),
        $btnli = $cam5.find(".btn ul li"),
        length = $btnli.length,
        index = 0,
        timer = null;

        $btnli.eq(0).children().eq(0).addClass("show");
        $picli.eq(0).show();
        $btnli.click(function(){
            clearInterval(timer);
            change(function(){
                index = $(this).index();
            }.bind(this));
            auto();
        });

        auto();
        function auto(){
            timer = setInterval(function(){
                change(function(){
                    index++;
                    index%=length;
                });
            },3000)
        }
        function change(fn){
            $btnpan.eq(index).removeClass("show");
            fn();
            $btnpan.eq(index).addClass("show");
            $picli.eq(index).show().siblings().hide();
        }
})();

(function(){
    var $content = $("#comtent"),
        $pant = $content.find("span.pant"),
        $nav = $("#nav"),
        index = 0,
        length = $pant.length;

    $pant.click(function(){
        index = $(this).index(".pant");
        if ((index+1) < length){
            var $tiao = $pant.eq(index+1);
            var fuji = $tiao.parent().height();
            var navH = $nav.height();
            var panH = (($tiao.offset().top)+($tiao.height()/2))-((($(window).height() - (fuji+navH))/2)+fuji+navH);
            $("html,body").animate({
                scrollTop:panH
            },1000)
        }

    })
})();