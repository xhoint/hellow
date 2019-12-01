
let arr = kits.loadData('jian');
let paopao = 0;
arr.forEach(e => {
    paopao += e.number;
})
$('.count').text(paopao);