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
{/* 
<ul class="list">
    <li class="item">
        <h2>常用网站</h2>
        <ul class="panel">
            <li class="tag color-1">百度</li>
            <li class="tag color-2">知乎</li>
        </ul>
    </li>
</ul>
 */
}
const data = [
    {
        title: '常用网站',
        data: [
            {
                name: '饥人谷',
                url: 'https://jirengu.com'
            },
            {
                name: '知乎',
                url: 'https://zhihu.com'
            },
        ]
    },
    {
        title: '精品博客',
        data: [
            {
                name: '阮一峰',
                url: 'https://javascript.ruanyifeng.com'
            },
            {
                name: '若愚',
                url: 'https://zhuanlan.zhihu.com/study-fe'
            },
        ]
    },
]