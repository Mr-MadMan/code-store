window.addEventListener('load',function(){
    var swiper = new Swiper('.swiper-container', {
        autoplay:{
            delay:2000,
            disableOnInteraction: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
    });
    // var focus = document.querySelector('.focus');
    // var ul = focus.children[0];
    // var w = focus.offsetWidth;
    // var index = 0;
    // var ol = focus.children[1];
    // var flag = false;  //判断是否移动
    // var timer = setInterval(function(){
    //     index++;
    //     // 用当前索引号与宽度相乘加符号即可左移
    //     var translatex = -index * w;
    //     ul.style.transform = 'translateX(' + translatex + 'px)';
    //     ul.style.transition = 'all .3s';
    // }, 2000);
    // // 需要等待图片滚动完毕再去判断，即过渡完判断
    // // 此时应当添加过渡完成事件transitionend
    // ul.addEventListener('transitionend',function(){
    //     // 第一张照片不算进索引值
    //     if (index >= 3) {
    //         index = 0; 
    //         // 去掉过渡效果 这样让我们的ul 快速的跳到目标位置
    //         ul.style.transition = 'none';
    //         var translatex = -index * w;
    //         ul.style.transform = 'translateX(' + translatex + 'px)';
    //     }else if (index < 0) {
    //         index = 2; 
    //         // 去掉过渡效果 这样让我们的ul 快速的跳到目标位置
    //         ul.style.transition = 'none';
    //         var translatex = -index * w;
    //         ul.style.transform = 'translateX(' + translatex + 'px';
    //     }
    //     // 当图片变化结束后，圆点跟随变化
    //     // 把ol里面li带有current类名的选出来去掉类名 remove
    //     ol.querySelector('.current').classList.remove('current');
    //     // 让当前索引号 的小li 加上 current   add
    //     ol.children[index].classList.add('current');
    // })
    // //  手指滑动轮播图 
    // // 触摸元素 touchstart： 获取手指初始坐标
    // var startX = 0;
    // var moveX = 0;  //移动距离
    // ul.addEventListener('touchstart',function(e){
    //     startX = e.targetTouches[0].pageX;
    //     clearInterval(timer);
    // })
    // ul.addEventListener('touchmove',function(e){
    //     // 移动距离： 
    //     moveX = e.targetTouches[0].pageX - startX;
    //     // 移动盒子：  盒子原来的位置 + 手指移动的距离
    //     var translatex = -index * w + moveX;
    //     // 手指拖动不需要添加动画过渡效果
    //     ul.style.transition = 'none';
    //     ul.style.transform = 'translateX(' + translatex + 'px';
    //     flag = true;  // 如果用户手指移动过我们再去判断否则不做判断效果
    //     e.preventDefault();
    // })
    // // 手指离开 根据移动距离判断回弹还是播放上一张或下一张
    // ul.addEventListener('touchend',function(e){
    //     if (flag) {
    //         // 滑动距离只要大于50不论正负
    //         if (Math.abs(moveX) > 50) {
    //             // 右滑播放上一张 moveX为正值
    //             if (moveX > 0) {
    //                 index--;
    //             }else{
    //                 // 左滑则是播放下一张 moveX为负值
    //                 index++;
    //             }
    //         }
    //         var translatex = -index * w;
    //         ul.style.transition = 'all .3s';
    //         ul.style.transform = 'translateX(' + translatex + 'px';
    //     }
    //     clearInterval(timer);
    //     timer = setInterval(function(){
    //         index++;
    //         // 用当前索引号与宽度相乘加符号即可左移
    //         var translatex = -index * w;
    //         ul.style.transform = 'translateX(' + translatex + 'px)';
    //         ul.style.transition = 'all .3s';
    //     }, 2000);
    // })
})