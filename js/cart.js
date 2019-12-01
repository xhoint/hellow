$(() => {
  // 先读取本地数据中的数据，动态生成列表
  let arr = kits.loadData('j');
  // 准备一个空字符串
  let html = '';
  // 遍历数组，生成指定结构
  arr.forEach(e => {
    // 有一个产品id，用于后期的其他操作
    html += `<div class="item" data-id="${e.pID}">
        <div class="row">
          <div class="cell col-1 row">
            <div class="cell col-1">
              <input type="checkbox" class="item-ck" ${e.isChecked ? "checked" : ''}>
            </div>
            <div class="cell col-4">
              <img src="${e.imgSrc}" alt="">
            </div>
          </div>
          <div class="cell col-4 row">
            <div class="item-name">${e.name}</div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="price">${e.price}</em>
          </div>
          <div class="cell col-1 tc lh70">
            <div class="item-count">
              <a href="javascript:void(0);" class="reduce fl ">-</a>
              <input autocomplete="off" type="text" class="number fl" value="${e.number}">
              <a href="javascript:void(0);" class="add fl">+</a>
            </div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="computed">${e.number * e.price}</em>
          </div>
          <div class="cell col-1">
            <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
          </div>
        </div>
      </div>`;

  })
  $('.item-list').append(html);

  // 如果arr里面的数据不是全部不勾选的，需要把全选的勾选去掉去掉
  let bqx = arr.find(e => {

    return e.isChecked === false;
    // ?????
  });
  if (bqx) {
    // 勾选的产品
    $('.pick-all').prop('checked', false);

  }


  if (arr.length != 0) {
    // 处理显示隐藏
    // 隐藏购物车
    $('.empty-tip').hide();
    // 显示头部
    $('.cart-header').show();
    // 显示尾部
    $('.total-of ').show();
  }

  // 实现全选
  $('.pick-all').on('click', function () {
    let qx = $(this).prop('checked');
    // 全选
    $('.pick-all').prop('checked', qx);
    // 单选
    $('.item-ck').prop('checked', qx);
    // 勾选本地数据里面的所有数据
    arr.forEach(e => {
      e.isChecked = qx;
    })

    // 重新存进本地数据
    kits.saveData('j', arr);
    // 计算总价
    z();

  })

  // 实现点选
  // 点选都是动态生成的，使用委派实现
  $('.item-ck').on('click', function () {
    // 勾选的个数和总个数一致-全选
    let dx = $('.item-ck').length === $('.item-ck:checked').length;
    // 设置全选的状态和单选的状态一样
    $('.pick-all').prop('checked', dx);

    // 点选的同时，要修改多选框对应 的本地数据里面的选中状态，
    // 根据商品的id，到本地数据中，修改选中的属性
    let pID = $(this).parents('.item').attr('data-id');
    // 获取当前这个单选是否是选中
    let isChecked = $(this).prop('checked');
    // console.log(pID);
    arr.forEach(e => {
      if (e.pID == pID) {
        // 就需要把当前这个产品的选中状态改成和勾选状态一致
        e.isChecked = isChecked;
      }
    });

    // 把数据更新会本地数据
    kits.saveData('j', arr);
    // 计算总价
    z();
  })

  // 封装一个计算总价和总件数

  function z() {
    // 获取总件数和总价格
    let js = 0;
    let jg = 0;
    arr.forEach(e => {
      if (e.isChecked) {
        // 注意数据类型
        // number 可能是数字，也可能是字符串
        js += parseInt(e.number);
        jg += e.number * e.price;
      }
    })
    // 把总价格和总件数更新到页面
    $('.selected').text(js);
    $('.total-money').text(jg);
  }
  // 在一开始就计算
  z();
  // 实现数量的增加和减少
  // 点击加号
  $('.item-list').on('click', '.add', function () {
    // 输入框中的数量增加
    // prev 内容中的上一子元素
    let prev = $(this).prev();
    let nr = prev.val();
    prev.val(++nr);
    // 数量更新到本地数据里
    let id = $(this).parents('.item').attr('data-id');
    let obj = arr.find(e => {
      return e.pID == id;
    });
    obj.number = parseInt(nr);
    // 把数据存储到本地
    kits.saveData('j', arr);
    // 更新总价
    z();
    // 修改右边的价格
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);

  })

  // 实现减号
  $('.item-list').on('click', '.reduce', function () {
    // 输入框中的数量增加
    // prev 内容中的上一子元素
    let next = $(this).next();
    let nr = next.val();
    next.val(--nr);
    // 数量更新到本地数据里
    let id = $(this).parents('.item').attr('data-id');
    let obj = arr.find(e => {
      return e.pID == id;
    });
    obj.number = parseInt(nr);
    // 把数据存储到本地
    kits.saveData('j', arr);
    // 更新总价
    z();
    // 修改右边的价格
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);

  })


  // 输入框回车键





  // 点击删除

  $('.item-list').on('click', '.item-del', function () {
    // 在这里执行 删除的逻辑
    layer.confirm('你确定要删除吗?', { icon: 0, title: '警告' }, (index) => {
      layer.close(index);
      // 得到当前要删除数据的id
      let id = $(this).parents('.item').attr('data-id');
      // 删除点击对应的一行
      $(this).parents('.item').remove();
      // 在本地存储中删除
      arr = arr.filter(e => {
        return e.pID != id;
      });
      kits.saveData('j', arr);
      z();
    });
  })
})