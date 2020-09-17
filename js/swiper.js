window.addEventListener('load',function(){
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    
    // ul的移动距离为小圆圈索引号 * 图片宽度(负值：往左移动)
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter',function(){
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
    })
    focus.addEventListener('mouseleave',function(){
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function(){
            // 手动调用右侧点击按钮事件
            arrowr.click();
        },2000);
    })
    for (let i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 记录当前小圆圈索引号，通过设置自定义属性
        li.setAttribute('index',i)
        ol.appendChild(li);
        // 小圆圈的排他思想，生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click',function(){
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击圆圈，移动的是ul
            // 点击了某个li，就拿到当前li的索引号
            var index = this.getAttribute('index');
            // 当点击某个小li 就把这个li的索引号给num 
            num = index;
            // 当我们点击某个li 就把当前li的索引号给circle
            circle = index;
            animation(ul, -index * focusWidth)
        })
    }
    ol.children[0].className = 'current'
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    // 节流阀目的：当上一个函数动画内容执行完毕后，再执行下一个函数动画，让事件无法连续触发
    var flag = true;
    arrowr.addEventListener('click',function(){
        if (flag) {
            flag = false;  //关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animation(ul,-num * focusWidth,function(){
                flag = true;  //当播完一张图片后，打开节流阀
            });
            // 点击右侧按钮，小圆圈随之变化，再声明一个变量控制小圆圈播放 
            circle++;
            // 若小圆圈走到底，则复原，说明克隆到最后这一张图片
            // if (circle == ol.children.length) {
            //     circle = 0;
            // }
            circle = circle == ol.children.length ? circle = 0 : circle; 
            circleChange();
        }
    })
    arrowl.addEventListener('click',function(){
        if (flag) {
            flag = false;
            // 如果走到最后一张复制的图片，此时ul要复原left为0
            if (num == 0) {
                num = ul.children.length - 1;
                // 当点到第一张图想要跳到最后一张要加负号
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animation(ul,-num * focusWidth,function(){
                flag = true;
            });
            // 点击左侧按钮，小圆圈随之变化，再声明一个变量控制小圆圈播放 
            circle--;
            // 如果circle小于0 说明此刻为第一张图片，则小圆圈第四个小圆圈
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            // 三元优化
            circle = circle < 0 ? ol.children.length - 1 :circle;
            circleChange();     
        }   
    });
    function circleChange(){
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function(){
        // 手动调用右侧点击按钮事件
        arrowr.click();
    },2000)
})