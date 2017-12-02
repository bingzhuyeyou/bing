
/*
    1，倒序，直接return 正数
    2,顺序,return 负数
    3,从大到小 传入的第二个减去第一个return b - a;
    4,从小到大 传入的第一个减去第二个return a - b;
    5,随机数, return Math.random()减去小于1大于0的数,
        比如 return Math.random()-0.4;
*/
Object.prototype.osort = function(fly){
    var length = this.length,
        arc = [],tharr = [],str = 0,cuowu = false,
        index = 0,dex = 4,rancuo = false,attr = 0;
    //判断数组里面是不是都是数字
    for (var s = 0; s < length; s++) {
        if (!Number(this[s])){
            return "数组里面只能都是数字";
        }
    }
    //把this遍历给另一个变量;
    for(var x = 0; x < length; x++) {
        tharr[x] = this[x];
    }

    //判断是倒序和顺序，还是从小到大和从大到小
    for (var i = 0; i < length-1; i++) {
        var aff = fly(tharr[i],tharr[i+1]);
        if( aff === tharr[i]-tharr[i+1] || aff === (tharr[i+1]-tharr[i])){
            cuowu = false;
        }else{
            cuowu = true;
            break;
        }
    }

    //是否符合随机排序的条件
    for (var e = 0; e < length*2; e++) {
        if (index < dex){
            var flt = fly(0,1);
            if (flt !== fly(0,1)){
                if (flt > 0 && flt < 1){
                    if(dex < length*2){
                        dex++;
                        rancuo = true;
                    }
                }
            }
            index++;
        }else{
            break;
        }
    }
    //随机排序
    if (rancuo){
        for (var h = 0; h < length; h++) {
            var olength = tharr.length;
            var random = tharr[Math.floor(Math.random()*olength)];
            for (var k = 0; k < olength; k++) {
                if (tharr[k] === random){
                    str = random;
                    attr = k;
                    break;
                }
            }
            arc[h] = str;
            tharr.splice(attr,1);
        }
        return arc;
    }


    //倒序和顺序，默认顺序；
    if (cuowu){
        if (fly() > 0){
            for (var c = length-1; c >= 0; c--) {
                arc.push(tharr[c]);
            }
            return arc;
        }else{
            return tharr;
        }
    }
    //从大到小排序和从小到大排序
    cuowu || fly(0,1) < 0?baozhu(10):baozhu(0);
    return arc;

    function baozhu(bool){
        for (var i = 0; i < length; i++) {
            var num = tharr[0]+bool;
            var thlength = tharr.length;
            for (var j = thlength-1; j >= 0 ; j--) {
                if (bool){
                    if (tharr[j] <= num){
                        num = tharr[j];
                        str = j;
                    }
                }else{
                    if (tharr[j] >= num){
                        num = tharr[j];
                        str = j;
                    }
                }
            }
            arc.push(num);
            tharr.splice(str,1);
        }
    }
};
