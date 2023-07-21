const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
const searchMap = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'bing': 'https://cn.bing.com/search?q='
}
let searchType = 'baidu'
let PageStatus = 'setting'
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

$$('.icon-setting').onclick = function () {
    PageStatus = 'setting'
    $('body').classList.remove('preview')
    $('body').classList.add('setting')

}
$$('.icon-preview').onclick = function () {
    PageStatus = 'preview'
    $('body').classList.remove('setting')
    $('body').classList.add('setting')
}


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
render(data)
/* 
    <li class="item">
        <h2>常用网站</h2>
        <ul class="panel">
            <li class="tag "><a href="" target="_blank"></a>百度</li>
            <li class="tag "><a href="" target="_blank"></a>知乎</li>
        </ul>
    </li>
 */
function render(data) {
    const $itemArr = data.map(obj => {
        const $item = document.createElement('li')
        $item.classList.add('item')
        const $h2 = document.createElement('h2')
        $h2.append(obj.title)
        const $ul = document.createElement('ul')
        $ul.classList.add('panel')
        let $liArray = obj.data.map(item => {
            const $tag = document.createElement('li')
            $tag.classList.add('tag')
            const $a = document.createElement('a')
            $a.setAttribute('href', item.url)
            $a.setAttribute('target', '_blank')
            $a.append(item.name)
            $tag.append($a)
            return $tag
        })
        $ul.append(...$liArray)
        $item.append($h2, $ul)
        return $item
    })
    console.log($itemArr);

    $('#websites .list').innerHTML = ''
    $('#websites .list').append(...$itemArr)
}
