// 1.写一个类
class small {
    constructor(options) {
        options = options || {};//如果上面都不传，options不是对象，需要给一个默认值
        this.ic = options.ic || '.item';
        this.et = options.et || 'mouseover';
        this.iac = options.iac || 'active';
        this.cc = options.cc || '.content';
        this.csc = options.csc || 'show';

        // 获取元素
        this.items = document.querySelectorAll(this.ic);
        this.contetns = document.querySelectorAll(this.cc);

        // 调用addEvent方法实现
        this.addEvent();
    }
    // 封装方法

    addEvent() {
        // 注册事件
        this.items.forEach((e, i) => {
            e.addEventListener(this.et, (e) => {
                let target = e.target;
                // 切换分类
                this.changeItems(target);
                // 切换内容
                this.changecurrent(i);
            })
        })
    }
    // 切换分类
    changeItems(current) {
        // 把当前点击的哪一个变红，把其他的变白
        this.items.forEach(e => {
            e.classList.remove(this.iac);
        })
        // 点击的变红
        current.classList.add(this.iac);
    }
    // 切换内容
    changecurrent(index) {
        // 把所有的隐藏
        this.contetns.forEach(e => {
            e.classList.remove(this.csc);
        })
        // 把对应的内容显示
        this.contetns[index].classList.add(this.csc);
    }
}