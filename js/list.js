

// 获取商品数据
$(() => {
  // 获取一个空字符串，存储数据
  let html = ``;
  // 遍历这个数组，
  phoneData.forEach(e => {
    // 生成结构
    html += `<li class="goods-list-item">
        <a href="detail.html?${e.pID}">
          <div class="item-img">
            <img src="${e.imgSrc}" alt="">
          </div>
          <div class="item-title">
           ${e.name}
          </div>
          <div class="item-price">
            <span class="now">¥${e.price}</span> 
          </div>
          <div class="sold">
            <span> 已售 <em>${e.percent}% </em></span>
            <div class="scroll">
              <div class="per"></div>
            </div>
            <span>剩余<i>${e.left}</i>件</span>
          </div>
        </a>
        <a href="#" class="buy">
          查看详情
        </a>
      </li>`
  })
  $('.goods-list >ul').append(html);
})