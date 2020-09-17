// 移动端拖动原理： 手指移动中，计算出手指移动的距离。用盒子原来的位置 + 手指移动的距离
// 手指移动的距离： 手指滑动中的位置减去手指刚开始触摸的位置
var startX = 0;  //获取手指初始位置
var startY = 0;
var x = 0;  //获得盒子原来的位置
var y = 0;
window.addEventListener('load',function(){
    var div = document.querySelector('div');
    div.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;
        x = this.offsetLeft;
        y = this.offsetTop;
        
    });
    div.addEventListener('touchmove',function(e){
        // 计算手指移动的距离： 手指移动之后的坐标减去手指初始坐标
        var moveX = e.targetTouches[0].pageX - startX;
        var moveY = e.targetTouches[0].pageY - startY;
        // 盒子原来的位置 + 手指移动的距离
        this.style.left = x + moveX + 'px'; 
        this.style.top = y + moveY + 'px';
        e.preventDefault();  //阻止屏幕滚动的默认行为
    })
})