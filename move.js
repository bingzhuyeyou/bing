(function(){
    /*
     * t: current time（当前时间）；
     * b: beginning value（初始值）；
     * c: change in value（变化量）；
     * d: duration（持续时间）。
     */
    var Tween = {
        linear: function (t, b, c, d){  //匀速
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){  //减速曲线
            return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){  //加速减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){  //加加速曲线
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){  //减减速曲线
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）//先在原地前后回弹，再突然加速到目标值
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）//加速到目标值进行前后进行回弹运动
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        elasticBoth: function(t, b, c, d, a, p){  //现在原地小幅度前后回弹，再加速到目标值回弹一下，也是小幅度。
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
            }
            if ( !a || a < Math.abs(c) ) {
                a = c;
                var s = p/4;
            }
            else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                        Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){     //回退加速（回退渐入）//先后退一点，然后再加速下坠，停留在目标值
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){  //自由落体快速下坠，超出目标值，再退回目标值
            if (typeof s == 'undefined') {
                s = 3.70158;
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        backBoth: function(t, b, c, d, s){//先往后退一点，再加速超出目标值一点再退回到目标值
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            if ((t /= d/2 ) < 1) {
                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            }
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）原地弹几下，越弹越高，再突然弹到目标值去
            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
        },
        bounceOut: function(t, b, c, d){     //坠落回弹运动
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            }
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        },
        bounceBoth: function(t, b, c, d){   //原地弹几下，越弹越高，再突然弹到目标值去，再在目标值弹几下
            if (t < d/2) {
                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    };

    /*
     **时间版运动框架，占用全局 tMove 变量
     *
     * 参数：
     @ obj   object 执行动画的对象
     @ json  json 要改变的属性及目标值
     @ time  number 动画持续时间
     @ type  string （可缺省） 运动曲线,也可以直接写回掉函数，默认的是匀速运动
     @ callback function （可缺省） 回调函数

     * return：
     *   默认不需要使用return，当tMove变量被占用是，可以用来代替
     *
     * tMove 函数本身返回一个json，拥有timer属性，可以用来清楚定时器
     */
    function move(obj,myjson,time,type,callback){
        window.requestAnimationFrame = window.requestAnimationFrame||function a(x){return setTimeout(x,1000/60)};
        window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
        var sss = {};
        if (typeof type === "function"){
            callback = type;
            type = "linear";
        }else{
            type = type || "linear";
        }
        var myclass = obj.currentStyle||getComputedStyle(obj),
            inClass = {},tarClass = {},
            intime = new Date();//获取初始时间
        for (var key in myjson) {
            inClass[key] = parseFloat(myclass[key]);//初始值的获取
            tarClass[key] = parseFloat(myjson[key]) - parseFloat(myclass[key]);//目标值的获取
            if(!tarClass[key]){       //判断初始值和目标值是否一样大
                delete tarClass[key];
                delete inClass[key];
            }
        }

        (function m(){
            var t = new Date()-intime;
            t >= time?t = time:sss.timer = requestAnimationFrame(m);
            for(var key in myjson){
                var val = Tween[type](t,inClass[key],tarClass[key],time);
                if (key === "opacity"){
                    obj.style[key] = val;
                    obj.style.filter = "alpha(opacity = "+val*100+")";
                }else{
                    obj.style[key] = val+"px";
                }
            }
            //回掉函数
            if (t >= time){
                callback && callback.call(obj)
            }
        })();
        return sss;
    }
    window.move = move;
    return move;
})();
