(function() {
    var $otp = $("#tp"),
        $claTp = $otp.find(".tp"),
        $maxW = $(document).width();

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
})();

//导航的显示隐藏
(function(){
    var $Nav = $("#Nav"),
        $otp = $("#tp"),
        $logo = $("#logo"),
        $logo1 = $Nav.find(".logo1"),
        $unfold = $Nav.find(".Nav-ul li.unfold"),
        $ulHide = $Nav.find(".ulHide"),
        $hide = $Nav.find(".hide"),
        $mNav = $Nav.find("li.mNav");

    $logo.delay(1000).queue(function(){
        $(this).css({
            "left": "50px",
            "opacity": "1"
        });
    });

    //滚动时导航超过高度变为fixed
    $(window).scroll(function(){
        if($(document).scrollTop() >= $otp.outerHeight()){
            $Nav.addClass("posi");
            $logo1.stop().fadeIn();
            $logo.addClass("scale");
        }else{
            $Nav.removeClass("posi");
            $logo1.stop().fadeOut();
            $logo.removeClass("scale");
        }
    });

    //导航的下拉显示
    $mNav.hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    $unfold.hover(function(){
        $hide.hide().eq($(this).index(".unfold")).stop().fadeIn();
        $ulHide.stop().slideDown();
        $Nav.addClass("hover");
    },function(){
        $Nav.removeClass("hover");
        $hide.eq($(this).index(".unfold")).stop().fadeOut();
        $ulHide.stop().slideUp();
    });
    $hide.hover(function(){
        $mNav.eq($(this).index()).addClass("hover");
        $hide.eq($(this).index()).stop().fadeIn();
        $ulHide.stop().slideDown();
        $Nav.addClass("hover");
    },function(){
        $hide.eq($(this).index()).stop().fadeOut();
        $mNav.eq($(this).index()).removeClass("hover");
        $ulHide.stop().slideUp();
        $Nav.removeClass("hover");
    })
})();

//header里面人物左右显示
(function(){
    var $figure = $("#figure"),
        $server = $("#server"),
        $serv = $("#serv"),
        $clasE = $serv.find(".serv"),
        $delete = $serv.find(".delete"),
        $fig1 = $figure.find(".fig1 .figure"),
        $fig2 = $figure.find(".fig2 .figure"),
        $btn = $figure.find(".btn");

    $fig1.removeClass("hide");
    var mistake = false;
    $btn.click(function(){
        mistake?change($fig2,$fig1):change($fig1,$fig2);
        mistake = !mistake;
    });

    function change($1,$2){
        $1.stop();
        $2.stop();
        $1.addClass("hide").delay(900).queue(function(){
            $2.removeClass("hide");
        });
    }

    $server.click(function(){
        $serv.stop().fadeIn();
        $clasE.addClass("show");
    });

    $delete.click(function(){
        $serv.stop().fadeOut();
        $clasE.removeClass("show");
    })
})();

//下载公测
(function(){
    var $download = $("#download"),
        $Main = $download.find(".Main"),
        $sao = $download.find(".sao"),
        $arrows = $download.find(".arrows");

    $arrows.click(function(){
        $download.removeClass("add");
        $(this).stop().delay(200).queue(function(){
            $sao.show();
            $Main.hide();
        })
    });
    $sao.click(function(){
        $download.addClass("add");
        $(this).hide();
        $Main.show();
    });

})();

//游戏日历
(function(){
    var $calendar = $("#calendar"),
        $li = $calendar.find("li"),
        $hide = $calendar.find("div.hide");

    $li.hover(function(){
        $(this).stop().addClass("posi");
        $hide.eq($(this).index()).show();
    },function(){
        $(this).stop().delay(300).queue(function(){
            $(this).stop().removeClass("posi");
            $hide.eq($(this).index()).hide();
        });
    })

})();

/*
* Banone 和Bantwo的面对象
*
*/
(function(){
    function Banone(notul,notli,ulli){
        this.notul = notul;
        this.notli = notli;
        this.ulli = ulli;
        this.width = ulli.width();
        this.index = 0;
        this.timer = null;
        this.length = notli.length;
    }
    Banone.prototype = {
        exe : function(){
            this.mouse();
        },
        mouse : function(){
            var This = this;
            this.notli.mouseenter(function(){
                var $this = $(this);
                clearTimeout(This.timer);
                This.timer = setTimeout(function(){
                    This.index = This.notli.index($this);
                    This.notul.stop().animate({left:-This.index*This.width},500);
                    $this.addClass("show").siblings().removeClass("show");
                },300);
            });
        }
    };

    //继承
    function Bantwo(banUl,btnLi,banLi,not){
        Banone.call(this,banUl,btnLi,banLi);
        this.timerone = null;
        this.not = not;
    }
    function Fn(){}
    Fn.prototype = Banone.prototype;
    Bantwo.prototype = Fn.prototype;

    Bantwo.prototype.mine = Banone.prototype.exe;
    Bantwo.prototype.cute = function(){
        this.mine();
        this.auto();
        this.clear();
    };

    Bantwo.prototype.clear = function(){
        var This =  this;
        this.not.hover(function(){
            clearInterval(This.timerone)
        },function(){
            This.auto();
        });
    };

    Bantwo.prototype.auto = function(){
        var This = this;
        this.timerone = setInterval(function () {
            This.index++;
            This.index %= This.length;
            This.notul.stop().animate({left: -This.index * This.width}, 300);
            This.notli.eq(This.index).addClass("show").siblings().removeClass("show");
        }, 3000);
    };
    window.Banone = Banone;
    window.Bantwo = Bantwo;
})();


//游戏公告
(function(){
    var $notice = $("#notice"),
        $not1 = $notice.find(".not1"),
        $banUl = $notice.find(".banner ul.list"),
        $banLi = $notice.find(".banner ul li"),
        $btnLi = $notice.find(".btn ul li.bli"),
        $width = $banLi.width(),
        index = 0;
    var banner2 = new Bantwo($banUl,$btnLi,$banLi,$not1);
    banner2.cute();
})();

//游戏新闻
(function(){
    var $notice = $("#notice"),
        $notli = $notice.find(".not2 .head ul li"),
        $ulLi = $notice.find(".not2 .btn ul.notul li.neli"),
        $notul = $notice.find(".not2 .btn ul.notul"),
        num = 0;
    $ulLi.each(function(i){
        var $ul = $("<ul></ul>");
        for (var j = 0; j < data.length; j++) {
            if (!i || data[j].typeX === (i-1)){
                $ul.append("<li><a href=''><p>"+data[j].title+"</p></a><span>"+data[j].time+"</span></li>");
                num++;
                if (num == 5)break;
            }
        }
        $(this).append($ul);
    });
    var banner1 = new Banone($notul,$notli,$ulLi);
    banner1.exe();
})();

//平安之旅
(function(){
    var $safety = $("#safety"),
        $figure = $safety.find(".figure"),
        $chara= $safety.find(".chara"),
        $shishenUl = $safety.find(".person .impose .obtn ul"),
        $protag = $safety.find(".protag"),
        index = 0;

    $figure.click(function(){
        var i = $(this).index(".title .figure");
        $(this).addClass("show").siblings().removeClass("show");
        if (i){
            $chara.fadeOut();
            $protag.fadeIn();
        }else{
            $chara.fadeIn();
            $protag.fadeOut();
        }
        console.log(i)
    });

    var condata = [
        [0,null],
        [0,null],
        [0,null],
        [0,null],
        [0,null]
    ];
    index = 0;
    for (var i = 0; i < shishenData.length; i++) {
        switch(shishenData[i].level){
            case "SSR":
                index = 1;
                break;
            case "SR":
                index = 2;
                break;
            case "R":
                index = 3;
                break;
            case "N":
                index = 4;
                break;
        }
        condata[0][0]++;
        condata[index][0]++;
        if (condata[0][0] % 2){
            condata[0][1] = $("<li class='lison'></li>");
            $shishenUl.eq(0).append(condata[0][1]);
        }
        if (condata[index][0] % 2){
            condata[index][1] = $("<li class='lison'></li>");
            $shishenUl.eq(index).append(condata[index][1]);
        }

        var str = shishenData[i].isNew?"<em class='new'></em>":"";

        var $div = $("<div class='son'>" +
            "<img src='img/index/content/shishen/"+shishenData[i].id+".png' alt=''>" +
            "<b class='cover'><i>"+shishenData[i].name+"</i></b>"+str+"</div>");

        var clone = $div.clone();
        condata[0][1].append($div);
        condata[index][1].append(clone);
    }
})();

//式神列表
(function(){

    var $safety = $("#safety"),
        $impose = $safety.find(".chara .person .impose"),
        $shishenUl = $safety.find(".obtn ul"),
        $liss = $safety.find(".shen ul li.ss");

    $liss.click(function(){
        $shishenUl.css({left : 0});
        $impose.index = 0;
        var i = $(this).index();
        $(this).addClass("color").siblings().removeClass("color");
        $impose.eq(i).show().siblings().hide();
        var length = Math.ceil($impose.eq(i).find(".obtn ul>li").length/6);
        $impose.each(function(i){
        var $site = $(this).find(".site");
        this.index = 0;
        this.index !== 0?$site.eq(0).show():$site.eq(0).hide();
        this.index === length-1?$site.eq(1).hide():$site.eq(1).show();
        });
    });

    $impose.each(function(x){
        var $obtn = $(this).children(".obtn"),
            $ul = $obtn.children("ul"),
            $li = $ul.children("li"),
            $site = $(this).find(".site"),
            length = Math.ceil($li.length / 6);

        this.index = 0;
        this.index === length-1?$site.eq(1).hide():$site.eq(1).show();
        this.index !== 0?$site.eq(0).show():$site.eq(0).hide();
        $site.click(function(){
            var parent = this.parentNode.parentNode;
            var i = $(this).index();
            if (i){
                parent.index++;
                parent.index %= length;
            }else{
                parent.index--;
                if(parent.index < 0)parent.index = length-1;
            }
            parent.index !== 0?$site.eq(0).show():$site.eq(0).hide();
            parent.index === length-1?$site.eq(1).hide():$site.eq(1).show();
            $ul.stop().animate({
                left: -parent.index*828
            },500);
        })
    })
})();
//游戏主角
(function(){
    var $safety = $("#safety"),
        $torli = $safety.find(".protag .actor ul li.tor"),
        $referral = $safety.find(".referral ul>li"),
        $triangle = $safety.find("li.tor span.triangle");


    $torli.click(function(){
        var i = $(this).index();
        $(this).addClass("border").siblings().removeClass("border");
        $referral.eq(i).addClass("showli").siblings().removeClass("showli");
        $triangle.eq(i).addClass("showgle").siblings().removeClass("showgle");
        console.log(i)
    })

})();

//游戏攻略
(function(){
    var $strategy = $("#strategy"),
        $listul = $strategy.find("ul.list"),
        $listli = $strategy.find("ul.list li.listli"),
        arr = ["新手","式神","斗技","玩法","御魂","高阶"],
        $picul = $strategy.find(".banner .pic ul"),
        $picli = $picul.find("li"),
        $strban = $strategy.find(".banner"),
        $typeli = $strategy.find(".banner .type ul li"),
        $select = $strategy.find(".header ul li.select");

    $listli.each(function(i){
        var count = 0;
        var $ul = $("<ul></ul>");
        for (var j = 0; j < strateData.length; j++) {
            if (!i || new RegExp(i-1).test(strateData[j].type)){
                if (!i){
                    var index = strateData[j].type.charAt(strateData[j].type.length-1);
                    count++;
                }else{
                    index = i-1;
                    count++;
                }
                if (count >10){
                    break;
                }
                $ul.append("<li><p>【"+arr[index]+"】"+strateData[j].title+"</p><i></i><b>"+strateData[j].author+"</b></li>")
            }
            $(this).append($ul);
        }
    });


    var $banner = new Bantwo($picul,$typeli,$picli,$strban);
    $banner.cute();

    var $banner1 = new Banone($listul,$select,$listli);
    $banner1.exe();


    //$select.click(function(){
    //    console.log($select.index($(this)))
    //})
})();

//同人专区
(function(){
    var $colleagues = $("#colleagues"),
        $collList = $colleagues.find(".collList"),
        $collLi = $collList.find("li.collLi"),
        $li_coll = $colleagues.find(".li_coll");

    $collLi.each(function(i){
        var $ul = $("<ul></ul>");
        var count = 0;
        for (var j = 0; j < tongrenDate.length; j++) {
            if (i == tongrenDate[j].id){
                $ul.append("<li><div class='img'><img src='"+tongrenDate[j].img+"' alt=''><span><em></em></span></div><p>"+tongrenDate[j].content+"</p> </li>")
                count++;
                if (count >= 8){
                    break
                }
            }
        }
        $(this).append($ul);
    });
    var banner = new Banone($collList,$li_coll,$collLi);
    banner.exe();
})();

//点击返回到首页
(function(){
    var $activity = $("#activity"),
        $return = $activity.find(".return");
    $return.click(function(){
        $("html,body").animate({
            scrollTop : 0
        },500)
    })
})();
