function animation(obj,target,callback){
    clearInterval(obj.timer);  //排他思想，先清除以前的定时器，只保留当前一个即可
    obj.timer = setInterval(function(){
        // 步长值要取整数
        var step = (target - obj.offsetLeft) / 10;
        // 负值往小的取，正值往大的取
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
        // 每次加上这个慢慢变小的值  步长公式:(目标值 - 现在的位置) / 10
        // 往回走时step为负值
        obj.style.left = obj.offsetLeft + step + 'px';
    },15)
}