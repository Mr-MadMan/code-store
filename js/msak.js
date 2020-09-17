window.addEventListener('load',function () {  //加载完监听
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');

    preview_img.addEventListener('mouseover',function(){
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout',function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove',function(e){
        // 计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // 使得鼠标在移动块居中即盒子高度一半
        // mask移动距离
        var maskX = x - mask.offsetWidth/2;
        var maskY = y - mask.offsetHeight/2;
        // 遮挡层最大移动距离：小图片盒子宽度减去遮挡层盒子宽度
        // 当x坐标小于0则让其停在0位置上
        var maskMaxX = preview_img.offsetWidth - mask.offsetWidth;
        var maskMaxY = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        }else if(maskX >= maskMaxX){
            maskX = maskMaxX;
        }
        if (maskY <= 0) {
            maskY = 0;
        }else if(maskY >= maskMaxY){
            maskY = maskMaxY;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        var bigImg = document.querySelector('.bigImg');
        // 大图片最大移动距离
        var bigMax = big.offsetWidth - bigImg.offsetWidth;
        // var bigMaxY = bigImg.offsetHeight - big.offsetHeight;
        // 大图片移动距离 X Y
        var bigX = maskX * bigMax / maskX;
        var bigY = maskY * bigMax / maskY;
        // 遮罩层反向移动 要添加负号
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})
