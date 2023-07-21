const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
const searchMap = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'bing': 'https://cn.bing.com/search?q='
}
let searchType = 'baidu'
//切换浏览器的样式
$$('.search-tab').forEach($tab => {
    $tab.onclick = function () {
        // 给每个搜索去掉class
        $$('.search-tab').forEach($tab => $tab.classList.remove('active'))
        this.classList.add('active')
        // data-xxx这种带 “-”的自定义属性，有默认dataset方法
        searchType = this.dataset.type
    }
});

//监听键盘按下
document.onkeyup = function (e) {
    if (e.key === 'Enter') {
        search()
    }
}

$('.icon-search').onclick = search

// 封装搜索
function search() {
    let url = searchMap[searchType] + $('.search-input input').value
    const $link = document.createElement('a')
    $link.setAttribute('href', url)
    $link.setAttribute('target', '_blank')
    $link.click()
}

const data = [
    {
        title: '常用网站',
        data: [
            {
                name: '饥人谷',
                url: 'https://www.jirengu.com'
            }
        ]
    }
]