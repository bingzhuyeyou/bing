
    var $topli = $("#topli"),
        $home = $("#home"),
        $roll = $("#roll"),
        $audio = $("#audio"),
        $describe = $("#describe"),
        $footer = $("#footer"),
        $hintalert = $("#hintalert"),

        //歌词弹窗
        $lyric = $("#lyric"),
        $shrik = $lyric.find(".shrik"),
        $gattop = $lyric.find(".lyleft .gattop"),
        $gatcen = $lyric.find(".lyleft .gatcen"),
        $bgtu = $gatcen.find(".bgtu"),
        $titleP1 = $lyric.find(".lyright .rigtop .p1"),
        $titleEm = $lyric.find(".lyright .rigtop>ul>li>em"),
        $rbot = $lyric.find(".lyright .rigbot .rbot"),
        $rbotH = $rbot.outerHeight(),
        $lygeci = $rbot.find(".geci"),
        $lyroll = $lyric.find(".lyright .rigbot .scroll .roll"),
        $lyrollH = $lyroll.outerHeight(),
        $lydown = $lyroll.find(".down"),

        //播放音乐
        $control = $footer.find(".right i"), //上一曲下一曲，和播放暂停
        $back = $describe.find(".back"),
        $descp = $describe.find(".desc p"),
        $down = $roll.find(".down"),
        $schdule = $("#schdule"),
        $startTime = $schdule.find(".statime span"), //播放音乐的时间
        $endTime = $schdule.find(".endtime span"),   //音乐的目标时间

        //播放进度条
        $schedule = $("#schedule"),
        $jindu = $schedule.find(".jindu"),
        $scdown = $schedule.find(".down"),

        //音量进度条
        $sound = $("#sound"),
        $volume = $("#volume"),
        $soundL = $sound.offset().left,
        $soundW = $sound.outerWidth(),
        $soundDu = $sound.find(".jindu"),
        $soundDown = $sound.find(".down"),

        //搜索框
        $seek = $("#seek"),
        $textem = $("#textem"),
        $sou = $("#sou"),
        $homeseek = $("#homeseek"),

        //注册登录
        $register = $("#register"),
        $regbox = $register.find(".reg-box"),
        $regdelete = $register.find(".reg-delete"),
        $enter = $regbox.find(".register .enter"),
        $enroll = $regbox.find(".register .enroll"),
        $regboz = $register.find(".reg-boz"),
        $regenroll = $regboz.find(".reg-enroll"),
        $regenter = $regboz.find(".reg-enter"),
        $enrollput = $regenroll.find(".reglist>div>input"),
        $enrolltuo = $regenroll.find(".portrait>ul>li"),
        $enterput = $regenter.find(".reglist>.regport>input"),
        $regterbtn = $regenter.find(".reglist .regbtn"),
        $regtershink = $regenter.find(".reglist .regshink"),
        $regtershinkUl = $regtershink.find("ul"),
        $regreturn = $regboz.find(".reg-return"),
        $returnem = $regreturn.find("em"),
        $enrollclick = $regenroll.find(".clickroll"),
        $enterclick = $regenter.find(".clickroll"),
        $regalert = $register.find(".reg-alert"),
        $regderma = $("#derma"),
        $dermai = $regderma.find(".der-i>img"),
        $dermap = $regderma.find("p"),
        $demaregquit = $regderma.find(".reg-quit"),
        $dermaquit = $demaregquit.find(".quit-quit"),
        $deramdelete = $demaregquit.find(".quit-delete"),
        $regapp = $regbox.find(".register .reg-app"),

        //添加喜欢的音乐
        $establish = $("#establish"),
        $eslist = $establish.find(".list"),
        $esi = $eslist.find("i"),
        $esul = $establish.find("ul li"),
        $homelike = $("#homelike"),
        $updateb = $homelike.find(".update .updatediv>b"),
        $updateem = $homelike.find(".update .updatediv>em"),
        $updateimg = $homelike.find(".update .updateimg>img"),
        $updatai = $describe.find(".icon-xihuan1"),
        $updataul = $homelike.find(".coll .classify"),
        $updatiani = $lyric.find(".lyleft .gatbot>ul>li>i.icon-xihuan1"),
        $updatacoleft = $homelike.find(".coll .coleft"),

        $mcicot = ["icon-yinle21", "icon-yinle3", "icon-yinle-copy", "icon-mmp", "icon-ic_my_library_music_", "icon-yinle2", "icon-yinle1", "icon-yinle", "icon-yinlehe", "icon-66713", "icon-iconfontbiaozhunmoban01"],
        $mclist = {"3":"欧美", "4":"流行榜","5":"内地","6":"港台","16":"韩国","17":"日本","26":"热歌","27":"新歌","28":"网络歌曲", "32":"音乐人","36":"K歌金曲"},
        regarr = ["请输入用户名","请输入密码"],
        regzhe = [/^[\u4E00-\u9FA5A-Za-z]+$/,/^[\w~@!$%^&*()_+}{:">?<\|`\-=\[\]\\';\.,\/]{6,18}$/],
        regarc = ["用户必须是汉字和字母","密码不能短于6位","前后密码不相同"],
        regimg = ["img/tuo.png","img/tuo1.png","img/tuo2.png","img/tuo3.png","img/tuo4.png"],
        index = 0,
        thindex = 0,
        outTime = 0,
        timer = null,
        subtime = 0,
        scheW = $schedule.width(),
        auto = null,
        geciTimer = null,
        moveBler = true,
        $lyli = null,
        lybili = null,
        gundMax = null,
        lyopen = false, //弹窗是否开启判断的值
        ontime = 0,
        req = null,            //清除上一次的ajax请求
        ajreq = null,          //清除上一次的ajax请求
        lyricScroll = null, //歌词滚动函数
        lytwoscro = null,
        setTime = null,
        urll = null,
        cla = null,
        datanext = null,
        bevalue = null,
        judgeclick = false,
        regtuoxiang = true,
        enterLike = null, //登录时判断当前歌曲是不是已经添加喜欢的
        mcdext = null,   //判断搜索框里面的音乐是否重复点击
        likeDex = null,  //判断喜欢音乐列表是否重复点击
        musicindex = 0,  //存储音乐序列号
        judegenter = false,
        enterName = null, //存储每次登陆的用户名
        clearColl = null, //当点击下个排行榜内容的时候清除上一次排行榜点击的collindex值
        conteJson = {},  //储存已经加载的ajax请求的排行榜数据
        contentArr = {}, //存储已经加载的html内容
        localmusic = {}, //存储喜欢的音乐信息
        localList = {},  //存储每首歌单独的序列号
        storage = window.localStorage;  //储存喜欢的音乐信息和账号密码

    // storage.clear();

    //点击显示隐藏喜欢的音乐
    $eslist.on("click",function(){
        $esul.stop().toggle();
        $esi.toggleClass("icon-shou");
    });

    //点击我喜欢的音乐
    $esul.on("click",function(){
        var $li = $topli.find("li");
        $li.removeClass("borshow");
        $home.hide();
        $homeseek.hide();
        $homelike.show();
        $(this).addClass("borshow");
        thindex = null;
        //触发滚动条
        $homelike.find(".coll").css("top",0);
        return gundongTiao($homelike,".coll");
    });

    //创建我喜欢的音乐里面里面音乐
    function esttablishLike(data,dataindex){
        var likeLi = $updataul.find("li");
        var liLength = likeLi.length;
        var panduan = true;
        musicindex = liLength || musicindex;
        if(!dataindex && musicindex){
            musicindex++;
            for (var i = 0; i < musicindex; i++) {
                panduan = true;
                for (var j = 0; j < liLength; j++) {
                    if(parseInt(likeLi.eq(j).data("indexid")) === i){
                        panduan = false;
                        break;
                    }
                }
                if(panduan){
                    musicindex = i;
                }
            }
        }
        musicindex = dataindex || musicindex;
        var $li = $("<li></li>");
        //存储li的index值和判断li是否存在的歌词id
        localList[data.songid] = musicindex;
        $li.data("indexid",musicindex);
        $li.addClass("li"+musicindex);
        $li.on("click",function(){
            $(this).addClass("show").siblings().removeClass("show");
        });
        $li.on("dblclick",function(){
            var lidex = $(this).data("indexid");
            if (lidex !== likeDex){
                likeDex = lidex;
                mcdext = null;  //让判断搜索框重复点击的值等于null
                judgeclick = true; //让判断排行榜是否重复点击的值等于true
                return mcplay(data,datanext)
            }
        });
        $li.html("<div class=\"xulie\">00</div>\n" +
            "<div class=\"caozuo\">\n" +
            "   <i class=\"iconfont icon-xihuan1\"></i>\n" +
            "   <i class=\"iconfont icon-xiazai\"></i>\n" +
            "</div>\n" +
            "<div class=\"mictit\">"+data.songname+"</div>\n" +
            "<div class=\"micname\">"+data.singername+"</div>\n" +
            "<div class=\"zuanji\">"+data.songname+"</div>\n" +
            "<div class=\"mctime\">"+timeBack(data.seconds)+"</div>");
        $li.find(".caozuo i.icon-xihuan1").on("click",function(){
            var valid = data.songid;
            return clearLike(valid);
        });
        localmusic[musicindex] = data;
        $updataul.prepend($li);
        $updatacoleft.css("backgroundImage","url("+data.albumpic_big+")");
        return localMessage();
    }

    //localstorage保存音乐数据
    function localMessage(){
        var data = {};
        var json = JSON.parse(storage.getItem(enterName));
        for (var key in localmusic) {
            data[key] = localmusic[key];
        }
        if(json){
            json.regdata = data;
            storage.setItem(enterName,JSON.stringify(json));
        }
        $updataul.find("li").each(function(i){
            i = i > 9?i:"0"+i;
            $(this).find(".xulie").html(i);
        });
        //触发滚动条
        if($homelike.css("display") === "block"){
            $homelike.find(".coll").css("top",0);
            return gundongTiao($homelike,".coll");
        }

    }

    //清除storage存储信息和喜欢的音乐列表里面的音乐
    function clearLike(local){
        var listindex = localList[local];
        if(!(enterLike) || listindex === localList[enterLike.songid]){
            $updatai.addClass("icon-iconxihuan");
            $updatiani.addClass("icon-xihuan");
        }
        $updataul.find(".li"+listindex).remove();  //清除$updataul下面的li
        delete localList[local];            //清除判断是否添加为喜欢的歌词id
        delete localmusic[listindex];       //清除存储的歌词歌名和图片等信息
        return localMessage()
    }

    //点击以后判断是否是已经添加为喜欢
    function addLike(localdata){
        //判断是不是登录状态
        if (!judegenter){
            tishiAlert("请先登录账号");
            return;
        }
        if(localdata || localdata === 0){
            var local = localList[localdata.songid];
            if(local){
                enterLike = null;  //把判断当前音乐是否添加喜欢的等于null
                return clearLike(localdata.songid);
            }else{
                $updatai.removeClass("icon-iconxihuan");
                $updatiani.removeClass("icon-xihuan");
                enterLike = localdata;
                return esttablishLike(localdata);
            }
        }else{
            //登录时判断当前音乐是不是添加喜欢的
            if(enterLike && localList[enterLike.songid]){
                $updatai.removeClass("icon-iconxihuan");
                $updatiani.removeClass("icon-xihuan");
            }

        }
    }

    //注册登录
    entrypage();
    function entrypage(){
        //如果注册过，下次打开自动选择已有的账号打开
        regaccount();
        function regaccount(){
            var length = storage.length,json,jsonpass,jsonimg,namekey,jsondate;
            var fragment = document.createDocumentFragment();
            $regapp.show();
            $regtershinkUl.html("");
            $register.stop().fadeIn();
            if(length > 0){
                for (var i = 0; i < length; i++) {
                    namekey = storage.key(i);
                    json = regpass(namekey);
                    if(json){
                        jsonpass = json.password;
                        jsonimg = json.imgurl;
                        jsondate = json.timedate;
                    }
                    if (jsonpass && jsonimg && jsondate){
                        $regapp.hide();
                        if(!$enterput.eq(0).val()){
                            createPassword(namekey,jsonpass);
                            regturn($regenroll,$regenter,"返回注册");
                        }
                        var $li = $("<li><span></span><em>"+namekey+"</em></li>");
                        $li.find("span").css("backgroundImage","url("+jsonimg+")");
                        $li.data({"password":jsonpass,"dataname":namekey});
                        $li.on("click",function(){
                            return createPassword($(this).data("dataname"),$(this).data("password"))
                        });
                        $(fragment).append($li);
                    }
                    $regtershinkUl.append(fragment);
                }
            }
        }

        function createPassword(name,pass){
            $enterput.eq(0).val(name);
            $enterput.eq(1).val(pass);
            $enterput.parent().addClass("show");
        }

        //返回调用的用户名的值
        function regpass(str){
            var jsonstr = storage.getItem(str);
            if(jsonstr && (/\{.+\}/g.test(jsonstr))){
                return JSON.parse(jsonstr);
            }else{
                return undefined;
            }
        }

        //点击隐藏注册框
        $regdelete.on("click",function(){
            $regreturn.click();
            $register.stop().fadeOut();
            return clearreg();
        });

        //点击注册出现注册内容；
        $enroll.on("click",function(){
            if (enrollNum() >= 3){
                return enalert("账号数量不能超过3个");
            }
            return regturn($regenter,$regenroll,"返回登录");
        });

        //点击登录出现登录的内容
        $enter.on("click",function(){
            return regturn($regenroll,$regenter,"返回注册");
        });

        //判断是否注册过账号
        function enrollNum(){
            var length = storage.length,json,index = 0,namekey;
            if(length > 0){
                for (var i = 0; i < length; i++) {
                    namekey = storage.key(i);
                    json = regpass(namekey);
                    if(json){
                        if (json.password && json.imgurl && json.timedate){
                            index++;
                        }
                    }

                }
            }
            return index;
        }

        $regterbtn.on("focus",function(){
            $regtershink.stop().slideDown()
        });
        $regterbtn.on("blur",function(){
            $regtershink.stop().slideUp()
        });

        //点击注册
        $enrollclick.on("click",function(){
            if(regtuoxiang){
                return enalert("请先选择头像");
            }
            $enrollput.each(function(i){
                var value = $.trim($enrollput.eq(i).val());
                if(i !== 2){
                    if(!value){
                        enalert(regarr[i]);
                        return false;
                    }else if(!(regzhe[i].test(value))){
                        enalert(regarc[i]);
                        return false;
                    }else if(i === 0 && storage.getItem(value)){
                        enalert("这个用户名已被注册");
                        return false;
                    }
                }else{
                    var val2 = $.trim($enrollput.eq(1).val());
                    var val1 = $.trim($enrollput.eq(0).val());
                    if(value && value === val2){
                        var lishow = $regenroll.find(".portrait>ul>li.show").index();
                        var url = regimg[lishow];
                        var json = {"password":value,"imgurl":url,"timedate":chuangdate()};
                        var str = JSON.stringify(json);
                        clearreg();
                        storage.setItem(val1,str);
                        $enterput.eq(0).val(val1);
                        $enterput.eq(1).val(val2);
                        $enterput.parent().addClass("show");
                        return regturn($regenroll,$regenter,"返回注册");
                    }else{
                        $enrollput.eq(1).val("");
                        $enrollput.eq(2).val("");
                        $enrollput.eq(1).focus();
                        return enalert(regarc[i]);
                    }
                }
            })
        });

        //获取创建账号那时候的时间
        function chuangdate(){
            var time = new Date(),
                ff = time.getFullYear(),
                mm = time.getMonth()+1,
                dd = time.getDate();
                mm = mm > 9?mm:"0"+mm;
                dd = dd > 9?dd:"0"+dd;
            return ff+" - "+mm+" - "+dd+" 创建";
        }

        //点击登录
        $enterclick.on("click",function(){
            $enterput.each(function(i){
                var value = $.trim($enterput.eq(i).val());
                if (!value){
                    enalert(regarr[i]);
                    return false;
                }else if(i === 0 && !(storage.getItem(value))){
                    enalert("此用户名未被注册");
                    return false;
                }else if(i === ($enterput.length-1) && value !== regpass($.trim($enterput.eq(0).val())).password){
                    $enterput.eq(1).val("");
                    enalert("填写的密码不正确");
                    return false;
                }else if(i === $enterput.length-1){
                    var nameval = $.trim($enterput.eq(0).val());
                    var dataimg = regpass(nameval);
                    $register.stop().fadeOut();
                    $dermap.html(nameval);
                    if($dermap.width() >= 100){
                        $dermap.width(100);
                        $dermap.addClass("overheader");
                        $updateb.width(100);
                        $updateb.addClass("overheader");
                    }
                    $updateem.html(dataimg.timedate);
                    $updateb.html(nameval);
                    $updateimg.prop("src",dataimg.imgurl);
                    $dermai.prop("src",dataimg.imgurl);
                    judegenter = true;   //判断当前是登录状态还是没登录状态
                    enterName = nameval; //存储登陆的用户名
                    createLike();
                    return clearreg();
                }
            })
        });

        //登录后自动生成喜欢的音乐
        function createLike(){
            var json = JSON.parse(storage.getItem(enterName));
            $.each(json.regdata,function(index,value){
                return esttablishLike(value,index);
            });
            return addLike();
        }

        //删除当前账号
        $deramdelete.on("click",function(e){
           storage.removeItem(enterName);
            $dermaquit.click();
            e.stopPropagation();
        });

        //点击退出账号
        $dermaquit.on("click",function(e){
            $demaregquit.stop().fadeOut();
            $dermap.html("未登录").removeClass("overheader");
            $dermai.prop("src","#");
            $updateb.html("未登录").removeClass("overheader");
            $updateimg.prop("src","#");
            $updateem.html("0000 - 00 - 00 创建");
            judegenter = false;   //判断是否登录
            localmusic = {};
            localList = {};
            $updataul.html("");
            $updatai.addClass("icon-iconxihuan");
            $updatiani.addClass("icon-xihuan");
            $updatacoleft.css("backgroundImage","url('#')");
            e.stopPropagation();       //jq去除冒泡
            if (enrollNum() <= 0){
                $register.stop().fadeIn();
                $regreturn.click();
                $regapp.show();
                return
            }
            return regaccount();
        });

        $(document).on("click",function(){
            $demaregquit.hide();
        });

        //点击名字位置
        $regderma.on("click",function(e){
            e.cancelBubble = true;
            if(judegenter){
                $demaregquit.stop().fadeIn();
            }else{
                if($register.css("display") === "none"){
                    $register.stop().fadeIn();
                    return clearreg();
                }
            }
            return false;
        });

        //清除内容
        function clearreg(){
            regtuoxiang = true;
            $enrollput.val("");
            $enterput.val("");
            $enrolltuo.removeClass("show");
            $enterput.parent().removeClass("show");
            $enrollput.parent().removeClass("show");
        }

        //登录和注册的回退
        function regturn(obj1,obj2,str){
            $regbox.stop().hide();
            $regboz.stop().show();
            obj1.stop().hide();
            $returnem.html(str);
            obj2.stop().fadeIn();
        }

        //提示弹窗
        function enalert(str){
            $regalert.css({"display":"block","top":"30%"});
            $regalert.html(str);
            $regalert.addClass("show");
            $regalert.stop().delay(3000).queue(function(){
                $regalert.removeClass("show");
                $regalert.css("display","none");
                $(this).dequeue();
            })
        }

        //input输入框获得焦点文字上移
        regfocus($enrollput);
        regfocus($enterput);
        function regfocus(obj){
            obj.on("focus",function(){
                $(this).parent().addClass("show");
            });
            obj.on("blur",function(){
                if(!$(this).val()){
                    $(this).parent().removeClass("show");
                }
            });
        }

        //点击选择头像
        $enrolltuo.on("click",function(){
            regtuoxiang = false;
            $(this).addClass("show").siblings().removeClass("show");
        });

        //点击返回登录
        $regreturn.on("click",function(){
            $regboz.stop().hide();
            $regbox.stop().fadeIn();
        });
    }

    //搜索框的获得焦点和失去焦点事件
    $seek.on("focus",function(){
        $textem.hide();
        $sou.addClass("colo");
        //搜索框的键盘事件 ，回车搜索
        $seek.on("keydown",function(e){
            if (e.keyCode === 13){
                return seekContent();
            }
        })
    });
    $seek.on("blur",function(){
        $(this).off("keydown");
        if (!($seek.val())){
            $textem.show();
        }
        $sou.removeClass("colo");
    });

    //默认音量
    $audio[0].volume = 0.5;

    //点击搜索的点击事件
    $sou.on("click",function(){
        return seekContent();
    });

    function seekContent(){
        var value = $seek.val();
        if (value && value !== bevalue){
            $homeseek.html("");
            thindex = null;
            bevalue = value;
            //清除样式
            clearCss();
            var $li = $topli.find("li");
            $li.removeClass("borshow");
            $esul.removeClass("borshow");
            if ($homeseek.css("display") === "none"){
                $home.hide();
                $homelike.hide();
                $homeseek.show();
            }
            $.ajax({
                url: "https://route.showapi.com/213-1?keyword="+value+"&page=1&showapi_appid=48218&showapi_test_draft=false&showapi_sign=4820cdeaf66a43cbba5fd89fbfe38d3e",
                success: function(myjosn){
                    /** @namespace myjosn.showapi_res_body.pagebean.contentlist */
                    var data = myjosn.showapi_res_body.pagebean.contentlist;
                    var coll = $("<div class='coll'></div>");
                    var coltop = $("<div class='coltop'></div>");
                    coltop.append("<p class=\"colp\">" +
                        "搜索<span>\""+value+"\"</span>，找到"+data.length+"首单曲</p>\n" +
                        "<div class=\"coright\">\n" +
                        "<span class=\"list\">歌曲列表</span>\n" +
                        "</div>");
                    coll.append(coltop);
                    var column = $("<div class=\"column\">\n" +
                        "<div class=\"xulie\">序列号</div>\n" +
                        "<div class=\"mictit\">音乐标题</div>\n" +
                        "<div class=\"micname\">歌手</div>\n" +
                        "<div class=\"zuanji\">专辑</div>\n" +
                        "<div class=\"time\">时间</div>\n" +
                        "</div>");
                    coll.append(column);
                    var colul = $("<ul class=\"classify\"></ul>");
                    var mctit,mcge,mcdate,colli,mcming,lyricid;
                    $.each(data,function(index,value){
                        mctit = value.songname;
                        mcge = value.singername;
                        /** @namespace value.albumname */
                        mcming = value.albumname;
                        mcdate = timeBack(value.seconds);
                        colli = $("<li class='li"+(index+1)+"'>\n" +
                            "<div class=\"xulie\">"+mcsort(index+1)+"</div>\n" +
                            "<div class=\"mictit\">"+mctit+"</div>\n" +
                            "<div class=\"micname\">"+mcge+"</div>\n" +
                            "<div class=\"zuanji\">"+mcming+"</div>\n" +
                            "</li>");
                        //单击改变背景颜色和字体颜色
                        colli.on("click",function(){
                            $(this).addClass("show").siblings().removeClass("show");
                        });
                        colli.on("dblclick",function(){
                            var cothis = $(this).index();
                            if (cothis !== mcdext){
                                value.url = value.m4a;
                                mcdext = cothis;
                                judgeclick = true;   //让判断排行榜是否重复点击的值等于true；
                                likeDex = null;     //然判断喜欢音乐重复点击的值等于null
                                return mcplay(value,datanext);
                            }
                        });
                        colul.append(colli);
                    });
                    coll.append(colul);
                    $homeseek.append(coll).ready(function(){
                        return gundongTiao($homeseek,".coll");
                    });
                }
            })
        }
    }


    //创建右边排行榜列表
    var frag = document.createDocumentFragment();
    $.each($mclist,function(key,value){
        var addclass = index?"":"borshow";
        var listli = $("<li class='li"+index+" "+addclass+"'><i class='iconfont "+$mcicot[index]+"'></i><em>"+value+"</em></li>");
        listli.on("click",function(){
            var thdex = $(this).index();
            if(thdex !== thindex){
                if ($home.css("display") === "none"){
                    $homeseek.hide();
                    $home.show();
                    $homeseek.html("");
                    $homelike.hide();
                    $esul.removeClass("borshow");
                    bevalue = null;
                }
                $(this).addClass("borshow").siblings().removeClass("borshow");
                //创建当前排行榜里面的内容
                rankingData(thdex,key,value);
                thindex = thdex;
            }
        });
        $(frag).append(listli);
        index++;
    });
    $topli.append(frag);

    rankingData(0,3,"欧美");

    function rankingData(index,key,value){

        //清除上一次的上下曲的点击事件
        $control.each(function(i){
            $control.eq(i).off("click");
        });
        if(contentArr[index]){
            urll ="";
        }else{
            $("#boq").show();
            urll = "https://route.showapi.com/213-4?showapi_appid=48218&topid="+key+"&showapi_sign=4820cdeaf66a43cbba5fd89fbfe38d3e"
        }

        if(ajreq !== null)ajreq.abort();
        //ajax请求数据
        ajreq = $.ajax({
            url: urll,
            success : function(myjson){
                // return;
                if (!(contentArr[index])){
                    var datadex = index;
                    var datain = null;
                    var data,length,coli,
                        coll = $("<div class='coll coll"+index+"'></div>");
                    coll.attr("data-index",index);
                    /** @namespace myjson.showapi_res_body.pagebean */
                    var dataArr =  myjson.showapi_res_body.pagebean;
                    /** @namespace dataArr.songlist */
                    data = dataArr.songlist;

                    //储存每一个排行榜加载的内容
                    conteJson[index] = data;
                    conteJson[index].collindex = null;
                    datain = conteJson[index];
                    length = data.length;
                    var colltop = $("<div class=\"coltop\"></div>");
                    var coleft = $("<div class=\"coleft\">\n" +
                        "<i class=\"cover iconfont icon-xihuan\"></i>\n" +
                        "</div>");
                    coleft.css("backgroundImage","url("+data[0].albumpic_big+")");
                    colltop.append(coleft);

                    var coright = $("<div class=\"coright\">\n" +
                        "<b>云音乐"+value+"榜</b>\n" +
                        "<div class=\"update\">\n" +
                        "<i class=\"iconfont icon-wangyiyunyinle\"></i>\n" +
                        "<em>最近更新时间："+mction()+"</em>\n" +
                        "</div>\n" +
                        "<p>简讯：云音乐中"+value+"最热的的"+length+"首单曲，每日更新。</p>\n" +
                        "<span class=\"list\">歌曲列表</span>\n" +
                        "</div>");
                    colltop.append(coright);
                    coll.append(colltop);
                    var column = $("<div class=\"column\">\n" +
                        "<div class=\"xulie\">序列号</div>\n" +
                        "<div class=\"mictit\">音乐标题</div>\n" +
                        "<div class=\"micname\">歌手</div>\n" +
                        "<div class=\"zuanji\">专辑</div>\n" +
                        "<div class=\"time\">时间</div>\n" +
                        "</div>");
                    coll.append(column);
                    var collul = $("<ul class=\"classify\"></ul>");

                    var mctit,mcge,mcdate;
                    $.each(datain,function(index,value){
                        mctit = value.songname;
                        mcge = value.singername;
                        mcdate = timeBack(value.seconds);
                        coli = $("<li class='li"+(index+1)+"'>\n" +
                            "<div class=\"xulie\">"+mcsort(index+1)+"</div>\n" +
                            "<div class=\"mictit\">"+mctit+"</div>\n" +
                            "<div class=\"micname\">"+mcge+"</div>\n" +
                            "<div class=\"zuanji\">"+mctit+"</div>\n" +
                            "<div class=\"mctime\">"+mcdate+"</div>\n" +
                            "</li>");

                        //单击改变背景颜色和字体颜色
                        coli.on("click",function(){
                            $(this).addClass("show").siblings().removeClass("show");
                        });

                        //双击排行榜里面音乐播放
                        coli.on("dblclick",function(){
                            datanext = conteJson[datadex];  //点击下一曲或者上一曲时默认上一次双击的排行榜
                            var cothis = $(this).index();

                            //清除上一次排行榜点击的collindex值。
                            if (clearColl !== null && clearColl.index !== datadex){
                                clearColl.collindex = null;
                            }
                            if (judgeclick || cothis !== datanext.collindex){
                                mcplay(value,datanext);
                                datanext.collindex = cothis;
                                clearColl = datanext;        //上一次的data数据
                                clearColl.index = datadex;   //上一次点击的排行榜的index
                                judgeclick = false;     //让判断是否点击过搜索框然后再点击排行榜的值等于false；
                                mcdext = null;          //让判断搜索框是否重复点击同一首的值等于null
                                likeDex = null;         //让判断喜欢音乐是否重复点击的值等于null
                            }
                        });
                        collul.append(coli);
                    });
                    coll.append(collul);
                    contentArr[index] = coll;
                    $home.append(contentArr[index]).ready(function(){
                        $("#boq").fadeOut();
                    })
                }
                //append塞入的代码执行完，才会执行
                var homecoll = $home.find(".coll"+index);
                cla && cla.hide();
                homecoll.show();
                cla = homecoll;
                homecoll.ready(function(){
                    $home.off("mousewheel");

                    //点击播放暂停
                    $control.eq(1).on("click",function(){
                        return muplay(datanext);
                    });
                    //点击播放上一曲
                    $control.eq(0).on("click",function(){
                        return nextTime.call($(this),datanext)
                    });

                    //点击播放下一曲
                    $control.eq(2).on("click",function(){
                        return nextTime.call($(this),datanext)
                    });

                    //播放歌曲
                    function nextTime(data){
                        var x = data.collindex || 0;
                        mcdext = null;
                        if($(this).index()) {
                            return trol(++x,data);
                        }else{
                            return trol(--x,data);
                        }
                    }
                    homecoll.css("top","0");
                    return gundongTiao($home,".coll.coll"+index);
                });
            }
        });
    }

    //开头播放音乐，用定时器判断上面的数据是否加载完,解决异步加载的问题。
    (function conload(){
        if (conteJson[0]){
            datanext = conteJson[0];
            conteJson[0].collindex = 0;
            mcplay(datanext[0],datanext);
            $("#bon").stop().fadeOut();
        }else{
            setTimeout(conload,200)
        }
    })();

    //滚动条
    function gundongTiao(fuhome,zihome){
        $down.css({"top":"0","height":"0"});
        $roll.off("click");
        $down.off("click");
        //排行榜的滚动条
        var $coll = fuhome.find(zihome),
            collH = $coll.outerHeight(),
            rollH = $roll.outerHeight(),
            downH = rollH/collH,
            biliH = collH/rollH,
            str = 0;

        //判断歌曲列表的高度是否小于右边滚动条的高度
        downH = downH >= 1?rollH:downH*rollH;
        var downMax = rollH - downH;

        $down.css("height",downH);

        $down.on("click",function(e){
            e.stopPropagation();
            return false;
        });

        $down.on("mousedown",function(e){
            var chuY = e.pageY,
                chuT = $(this).position().top;
            $(document).on("mousemove",function(e){
                var muY = e.pageY;
                var y = (muY - chuY)+chuT;
                str = -y;
                y = Math.max(y,0);
                y = Math.min(y,downMax);
                move(y);
            });
            $(document).on("mouseup",function(){
                $(this).off("mouseup");
                $(this).off("mousemove");
            });
            return false
        });

        fuhome.on("mousewheel",function(e,d){
            str += d * 10;
            str = Math.max(str,-downMax);
            str = Math.min(str,0);
            move(-str);
            e.cancelBubble = true;
            e.preventDefault();
        });

        $roll.on("click",function(e){
            var topnum  = e.pageY - ($(this).offset().top + downH/2);
            topnum = Math.max(0,topnum);
            topnum = Math.min(topnum,downMax);
            str = -topnum;
            return move(topnum);
        });

        function move(y){
            $down.css("top",y);
            $coll.css("top",-(y*biliH));
        }
    }

    function trol(x,data){
        var length = data.length;
        var holi = $home.find(".coll>ul>li");
        var collindex = data.collindex;
        holi.eq(collindex).removeClass("show");
        data.collindex = x;
        collindex = data.collindex;
        if(collindex < 0)collindex = length-1;
        collindex %= length;
        holi.eq(collindex).addClass("show");

        return mcplay(data[collindex],data);
    }

    //显示播放的歌曲和名字
    function mcplay(data,datasu){
        //清除上一次的定时器
        cancelAnimationFrame(geciTimer);
        var url = data.url;
        /** @namespace data.singername */
        var name = data.singername;
        /** @namespace data.songname */
        var title = data.songname;
        /** @namespace data.albumpic_small */
        var img = data.albumpic_small;
        /** @namespace data.seconds */
        subtime = data.seconds;
        $audio.prop({"src":url,"autoplay":true});

        //audio的duration可能有异步加载的问题，所以用定时器获取。
        judgeTime();
        function judgeTime(){
            subtime = subtime || $audio[0].duration;
            if (subtime){
                data.seconds = subtime;
                $back.css("backgroundImage","url("+img+")");
                $descp.eq(0).html(title);
                $descp.eq(1).html(name);
                $startTime.html("00:00");
                $endTime.html(timeBack(subtime));
                outTime = new Date;
                ontime = 0;
                $audio[0].pause();
                //生成歌词弹窗
                lyricAlert(name,title,data.albumpic_big,data.songid,data);
                return muplay(datasu);
            }else{
                setTimeout(judgeTime,100);
            }
        }

    }
    //歌词弹窗
    function lyricAlert(name,title,img,lyricid,localdata){
        $updatai.addClass("icon-iconxihuan");
        $updatiani.addClass("icon-xihuan");
        $updatai.off("click");
        $updatiani.off("click");
        enterLike = null;

        //判断这首歌是否已经添加为喜欢了
        if(localList[localdata.songid]){
            enterLike = localdata;   //登录时判断当前音乐是不是添加喜欢的
            $updatai.removeClass("icon-iconxihuan");
            $updatiani.removeClass("icon-xihuan");
        }
        //点添加为喜欢，或取消喜欢
        $updatiani.on("click",function(){
            if(localdata){
                return addLike(localdata);
            }

        });
        //点添加为喜欢，或取消喜欢
        $updatai.on("click",function(){
            if(localdata){
                return addLike(localdata);
            }
        });

        $lygeci.html("");
        $('#li-3').remove();
        $bgtu.css("backgroundImage","url("+img+")");
        $('head').append('<style id="li-3">#box>.middle .lyric::before{ background-image: url('+img+');}</style>');
        $titleP1.html(title);
        $titleEm.eq(0).html(title);
        $titleEm.eq(1).html(name);
        $titleEm.eq(2).html(title);

        if(req !== null)req.abort();
        //请求歌词数据
        req = $.ajax({
            dataType : "json",
            url : "https://route.showapi.com/213-2?musicid="+lyricid+"&showapi_appid=48218&showapi_test_draft=false&showapi_sign=4820cdeaf66a43cbba5fd89fbfe38d3e",
            success:function(myjson){
                var data = myjson.showapi_res_body.lyric;
                var $ul = $("<ul>");
                var sing = 0;
                var div = $("<div>"+data+"</div>");
                data = div.html();

                //切割请求的歌词
                var arr = data.split("[");
                $.each(arr,function(index,value){
                    if (value.split("]")[1] && value.split("]")[1].length > 1){
                        var arr2 =  value.split("]");
                        var arr3 = arr2[0].split(":");
                        var arr4 = arr3[1].split(".");
                        var timezhi =((arr3[0]*60)+(arr4[0]*1))+"."+arr4[1];
                        var $li = $("<li class='li"+sing+"'>"+arr2[1]+"</li>");
                        $li.attr("data-time",timezhi);
                        $ul.append($li);
                        sing++;
                    }
                });
                $lygeci.append($ul).ready(function(){

                    $lyli = $lygeci.find("ul li");

                    $back.off("click");
                    $shrik.off("click");

                    //歌词滚动条的top值清除
                    $lydown.css("top",0);
                    $lygeci.css("top",0);


                    //歌词的滚动条
                    var $lygeciH = $lygeci.height(),
                        downH = $lyrollH/$lygeciH;

                    //处理在没有歌词的情况下
                    downH = downH >= 1?$lyrollH:downH*$lyrollH;

                    var downMax = $lyrollH - downH;

                    gundMax = $lygeciH - $rbotH;
                    lybili = $lygeciH/$lyrollH;

                    $lydown.css("height",downH);

                    $lydown.on("mousedown",function(e){
                        var chuY = e.pageY,
                            $lydownT = $lydown.position().top;

                        $(document).on("mousemove",function(e){
                            moveBler = false;
                            var muY = e.pageY,
                                y = (muY-chuY)+$lydownT;
                                y = Math.max(0,y);
                                y = Math.min(y,downMax);
                                $lydown.css("top",y);
                                $lygeci.css("top",-(lybili*y))
                        });
                        $(document).on("mouseup",function(){
                            moveBler = true;
                            $(this).off("mousemove");
                            $(this).off("mouseup");
                        });
                        return false;
                    });

                    //歌词滚动
                    lyricScroll = function(){
                        var time = 0,
                            getime = 0,
                            getop = 0,
                            gundong = 0,
                            rboBj = (($rbotH/2)-10);

                        (function auscroll(){
                            $.each($lyli,function(index,value){
                                time = $audio[0].currentTime;
                                getime = parseFloat($(value).attr("data-time"));
                                getop = $(value).position().top;
                                if (time >= getime){
                                    $(value).addClass("colo").siblings().removeClass("colo");
                                    if (getop > rboBj && moveBler){
                                        gundong =  getop - rboBj;
                                        gundong = Math.max(0,gundong);
                                        gundong = Math.min(gundong,gundMax);
                                        $lydown.css("top",(gundong/lybili));
                                        $lygeci.css("top",-(gundong));
                                    }
                                }
                            });
                            geciTimer = requestAnimationFrame(auscroll);
                        })();
                    };

                    $back.on("click",function(){
                        //开启打开状态判断的值
                        lytwoscro = true;
                        cancelAnimationFrame(geciTimer);
                        $lyric.addClass("transi");
                        if (lyopen && lytwoscro){
                            lyricScroll();
                            $gattop.delay(500).queue(function(){
                                $(this).removeClass("gatran").addClass("gatran");
                                $(this).dequeue()
                            });
                            $gatcen.delay(1500).queue(function(){
                                $(this).removeClass("cenroll cenclear").addClass("cenroll");
                                $(this).dequeue()
                            })
                        }

                    });
                    $shrik.on("click",function(){
                        return clearCss();
                    });
                });
            }
        })
    }

    //清除样式
    function clearCss(){
        lytwoscro = false;
        $lyric.removeClass("transi");
        cancelAnimationFrame(geciTimer);
        $lyric.removeClass("transi");
        $gattop.removeClass("gatran");
        $gatcen.removeClass("cenroll");
    }

    //播放，暂停，下一曲和上一曲
    function muplay(datasu){
        var time = 0;
        clearInterval(setTime);
        if ($audio[0].paused){
            $audio[0].play();
            auto = true;
            $control.eq(1).addClass("icon-zanting").removeClass("icon-bofang");
            $audio[0].ontimeupdate = function(){
                time = $audio[0].currentTime;
                auto && $jindu.css("width",(time/subtime)*scheW);
                $startTime.html(timeBack(time));
                if ($audio[0].ended){
                    $control.eq(1).addClass("icon-bofang").removeClass("icon-zanting");
                    cancelAnimationFrame(geciTimer);
                    var x = datasu.collindex;
                    mcdext = null;
                    likeDex = null;
                    return trol(++x,datasu)
                }
            };

            //音量静音，音量进度条拖动
            downsound();
            lyopen = true;
            //判断暂停时判断弹窗是否开启
            if (lyopen && lytwoscro){
                cancelAnimationFrame(geciTimer);
                lyopen && lyricScroll();
                $gattop.delay(500).queue(function(){
                    $(this).removeClass("gatran").addClass("gatran");
                    $(this).dequeue()
                });
                $gatcen.delay(1500).queue(function(){
                    $(this).removeClass("cenclear").addClass("cenadd cenroll");
                    $(this).dequeue()
                })
            }

            //进度条拖动
            return downmove();
        }else{
            lyopen = false;
            $control.eq(1).addClass("icon-bofang").removeClass("icon-zanting");
            $audio[0].pause();

            cancelAnimationFrame(geciTimer);
            $gattop.removeClass("gatran");
            $gatcen.removeClass("cenadd").addClass("cenclear");
            clearTimeout(setTime);
        }
    }

    //进度条的拖动事件
    function downmove(){
        var jintime = 0;
        var scheL = $schedule.offset().left;

        $schedule.off("click");

        //$scdown的mousedown事件
        $scdown.on("mousedown",function(e){
            var chuX = e.pageX,
                jinduW = $jindu.outerWidth();
            if ($audio[0].paused){
                $audio[0].play();
                $control.eq(1).addClass("icon-zanting").removeClass("icon-bofang");
            }
            $(document).on("mousemove",function(e){
                var muX = e.pageX,
                    x = (muX-chuX)+jinduW;
                x = Math.min(x,scheW);
                x = Math.max(x,0);
                $jindu.css("width",x);
                jintime = ((x/scheW)*subtime);
                $startTime.html(timeBack(jintime));
                auto = false;
            });
            $(document).on("mouseup",function(){
                $(this).off("mousemove");
                $(this).off("mouseup");
                ontime = jintime*1000;
                $audio[0].currentTime = jintime;
                auto = true;
            });
            return false
        });

        //播放进度条的点击事件
        $schedule.parent().on("click",function(e){
            var mux = e.pageX;
            var x = mux-scheL;
            var mcbili = (x/scheW)*subtime;
            $jindu.css("width",x);
            $startTime.html(timeBack(mcbili));
            $audio[0].currentTime = mcbili;
        });
    }

    //音量进度条拖动事件
    function downsound(){
        //清除上一次绑定的事件
        $sound.off("click");
        $volume.off("click");

        //点击静音
        $volume.on("click",function(){
            if ($audio[0].muted){
                $(this).addClass("icon-shengyin-copy").removeClass("icon-mute");
                $audio[0].muted = false;
                $soundDu.stop().fadeIn();
            }else{
                $(this).addClass("icon-mute").removeClass("icon-shengyin-copy");
                $audio[0].muted = true;
                $soundDu.stop().fadeOut();
            }
        });

        $soundDown.on("mousedown",function(e){
            var chuX = e.pageX;
            var sdownW = $soundDu.outerWidth();
            $(document).on("mousemove",function(e){
                var mX = e.pageX;
                var x = (mX - chuX)+sdownW;
                x = Math.min($soundW,x);
                x = Math.max(0,x);
                $soundDu.css("width",x);
                if (x/$soundW === 0){
                    $volume.addClass("icon-mute").removeClass("icon-shengyin-copy");
                    $audio[0].muted = true;
                }else{
                    $volume.addClass("icon-shengyin-copy").removeClass("icon-mute");
                    $audio[0].muted = false;
                    $audio[0].volume = (x/$soundW);
                }
            });
            $(document).on("mouseup",function(){
                $(this).off("mouseup");
                $(this).off("mousemove");
            });
            return false;
        });

        $sound.parent().on("click",function(e){
            var chuX = e.pageX;
            var mux = chuX - $soundL;
            mux = Math.max(mux,0);
            mux = Math.min($soundW,mux);
            $audio[0].volume = mux/$soundW;
            $soundDu.css("width",mux);
        });

        $volume.on("mouseup",function(){
            $(this).off(["mouseup","click"]);
        })

    }

    $audio[0].onerror = function(){
        tishiAlert("请求的数据有错误");
        //当前歌曲播放不出，自动下一曲
        $control.eq(2).click();

    };
    function tishiAlert(str){
        $hintalert.html(str);
        $hintalert.stop().fadeIn(500,function(){
            $(this).delay(2000).fadeOut();
        })
    }

    //排行榜的日期
    function mction(){
        var time = new Date,
            mm = time.getMonth()+1,
            dd = time.getDate();
        return mm+"月"+dd+"日";
    }

    //排行榜的序列号
    function mcsort(index){
        return index>9?index:"0"+index;
    }

    //排行榜歌曲的时间
    function timeBack(time){
        var fen = Math.floor(time/60);
        var miao = time%60;
        fen = fen>9?fen:"0"+fen;
        miao = miao>9?Math.ceil(miao):"0"+Math.ceil(miao);
        return fen+":"+miao;
    }



