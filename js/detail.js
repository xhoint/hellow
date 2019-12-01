$(() => {
    // 截取location.search里面的id
    let id = location.search.substring(1);

    // 在数组中把对应的id数据获取出来
    let target = phoneData.find(e => {
        // 返回条件
        return e.pID == id;
    });

    // 把数据动态获取到结构里面
    // 修改图片
    $('.preview-img>img').attr('src', target.imgSrc);
    // 修改名字
    $('.sku-name').text(target.name);
    // 修改价格
    $('.summary-price  em').text(`￥${target.price}`);






    // 点击添加购物车
    $('.addshopcar').on('click', function () {

        // 先获取输入框里面的件数
        let number = $('.choose-number').val();

        // 判断输入框里面是否输入数字，且数字不小于0，并且不能为空

        if (isNaN(number) || parseInt(number) <= 0 || number.trim().length === 0) {
            alert('商品数量不正确，请正确输入');
            return;
        }

        // 把件数和商品的信息存储到本地数据中
        // 先定义一个数组存储到本地数据
        // let  arr=kits.loadData('键是自己定义的')
        let arr = kits.loadData('j')

        // 创建数据对象
        let obj = {
            pID: target.pID,
            imgSrc: target.imgSrc,
            name: target.name,
            price: target.price,
            // 件数从输入框里面获取
            number: number,
            // 实现选中状态的保持
            isChecked: true
        };
        // 把数据存储到数组里面，
        arr.push(obj);
        // 然后存到本地数据中
        kits.saveData('j', arr);

        // 最后跳转到购物车页面
        location.href = './cart.html';
    })
})