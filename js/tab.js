window.addEventListener('load', function () {
    // var that;
    class Tab {
        constructor(id) {
            // that = this;
            // 获取元素
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tabadd');
            // 获取li的父元素
            this.ul = this.main.querySelector('ul');
            // 获取secti父元素
            this.fsection = this.main.querySelector('.tabscon');
            // 实例化后即可立马调用该函数
            this.init();
        }
        init() {
            this.updateNode();
            // 初始化操作让相关的元素绑定事件
            this.add.addEventListener('click', this.addTab.bind(this.add, this));
            this.lis.forEach((element, index) => {
                // 每个li要先设定单独索引号
                this.lis[index].index = index;
                this.lis[index].addEventListener('click', this.toggleTab.bind(this.lis[index], this));  //bind中的this指向构造函数Tab,并传入相应的
                this.remove[index].addEventListener('click', this.removeTab.bind(this.remove[index], this));
                this.spans[index].addEventListener('dblclick', this.editTab);  //绑定双击事件
                this.sections[index].addEventListener('dblclick', this.editTab);
            });
        }
        // 获取所有li和section
        // 动态更改元素需要重新获取对应元素
        updateNode() {
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        }
        // 切换
        toggleTab(that) {
            that.clearClass();
            this.className = 'liactive';
            // 因为当前this指向lis，定义一个全局变量that使其指向constructor
            that.sections[this.index].className = 'conactive';
        }
        clearClass() {
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        // 添加
        addTab(that) {
            that.clearClass();
            // 创建li和section元素，利用insertAdjacentHTML可以把字符串格式元素添加到父元素中
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">测试</section>';
            // 把两个元素追加到对应父元素里边
            // appenChild不支持追加字符串的子元素，insertAdjacentHTML支持追加字符串元素
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            // 先获取新元素,再格式化
            that.init();
        }
        // 删除
        removeTab(that, e) {
            // 阻止冒泡事件,防止触发li的切换点击事件
            e.stopPropagation();
            var index = this.parentNode.index;
            // 根据索引号删除对应的li和section  remove方法可直接删除指定元素
            that.lis[index].remove();
            that.sections[index].remove();
            // 每次删除完再重新获取所有元素
            that.init();
            // 当删除了不是选中状态的li时，原来选中状态的li保持不变
            if (document.querySelector('.liactive')) return;
            // 当删除了选定状态的li,让他前一个li处于选定状态
            index--;
            // 手动调用点击事件,无需鼠标触发
            that.lis[index] && that.lis[index].click();
        }
        // 编辑
        editTab() {
            var str = this.innerHTML;
            // 双击禁止选定文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            this.innerHTML = '<input type="Text">';
            var input = this.children[0];
            input.value = str;
            input.select();
            // 当我们文本框失去焦点，将文本框的值赋给span
            input.addEventListener('blur', function () { this.parentNode.innerHTML = this.value; })
            // 按回车也可以把问文本框的值给span
            input.addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    // 手动调用失去焦点事件
                    this.blur();
                }
            })
        }

    }
    var tab = new Tab('#tab');
})

