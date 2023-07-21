const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
const searchMap = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'bing': 'https://cn.bing.com/search?q='
}
let searchType = 'baidu'
let PageStatus = 'setting'
//当前修改的下标为0
let curMdifyIdx = 0
//当前修改的值为null
let $curModify = null
let data = []
// const data = [
//     {
//         title: '常用网站',
//         data: [
//             {
//                 name: '饥人谷',
//                 url: 'https://jirengu.com'
//             },
//             {
//                 name: '知乎',
//                 url: 'https://zhihu.com'
//             },
//         ]
//     },
//     {
//         title: '精品博客',
//         data: [
//             {
//                 name: '阮一峰',
//                 url: 'https://javascript.ruanyifeng.com'
//             },
//             {
//                 name: '若愚',
//                 url: 'https://zhuanlan.zhihu.com/study-fe'
//             },
//         ]
//     },
// ]

load()
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

$('.icon-setting').onclick = function () {
    PageStatus = 'setting'
    $('body').classList.remove('preview')
    $('body').classList.add('setting')

}
$('.icon-back').onclick = function () {
    PageStatus = 'preview'
    $('body').classList.remove('setting')
    $('body').classList.add('preview')
}
$('.icon-plus').onclick = function () {
    $('.modal-1').classList.add('show')
}
$('.modal-1 .cancel').onclick = function () {
    $('.modal-1').classList.remove('show')
}
$('.modal-2 .cancel').onclick = function () {
    $('.modal-2').classList.remove('show')
}

$('.modal-1 .confirm').onclick = function () {
    let value = $('.modal-1 input').value
    if (value === '') {
        alert('输入不能为空')
        return
    }
    let obj = {
        title: value,
        data: []
    }
    data.push(obj)
    render(data)
    save()
    $('.modal-1').classList.remove('show')
}

$('.modal-2 .confirm').onclick = function () {
    let value = $('.modal-2 input').value
    if (value === '') {
        alert('输入不能为空')
        return
    }
    data[curMdifyIdx].title = value
    render(data)
    save()
    $('.modal-2').classList.remove('show')
}
//============删除分类================
$('.list').onclick = function (e) {
    var composed = e.composedPath();
    //新版谷歌去除了e.path，使用e.composedPath()方法
    let $delete = composed.find($node => $node.classList && $node.classList.contains('icon-delete'))
    if ($delete) {
        let $result = composed.filter($node => $node.classList && $node.classList.contains('item'))
        // console.log($result);
        if ($result.length > 0) {
            //获取到当前点击的item的li
            let $item = $result[0]
            console.log($item)
            let index = [...$$('.item')].indexOf($item)
            console.log(index)
            //删除点击的项
            data.splice(index, 1)
            render(data)
            save()
        }
    }
    // ==============编辑分类=================
    let $edit = composed.find($node => $node.classList && $node.classList.contains('icon-edit'))
    if ($edit) {
        let $result = composed.filter($node => $node.classList && $node.classList.contains('item'))
        // console.log($result);
        if ($result.length > 0) {
            //获取到当前点击的item的li
            let $item = $result[0]
            console.log($item)
            let index = [...$$('.item')].indexOf($item)
            curMdifyIdx = index
            $curModify = $item
            console.log(index)
            $('.modal-2').classList.add('show')
            let title = $item.querySelector('h2').innerText
            $('.modal-2 input').value = title

        }
    }

    let $add = composed.find($node => $node.classList && $node.classList.contains('icon-add'))
    if ($add) {
        let $result = composed.filter($node => $node.classList && $node.classList.contains('item'))
        // console.log($result);
        if ($result.length > 0) {
            //获取到当前点击的item的li
            let $item = $result[0]
            console.log($item)
            let index = [...$$('.item')].indexOf($item)
            console.log(index)
            $('.modal-3').classList.add('show')

        }
    }
}
// 封装搜索
function search() {
    let url = searchMap[searchType] + $('.search-input input').value
    const $link = document.createElement('a')
    $link.setAttribute('href', url)
    $link.setAttribute('target', '_blank')
    $link.click()
}


render(data)
/* 
    <li class="item">
        <h2>常用网站</h2>
        <ul class="panel">
            <li class="tag "><a href="" target="_blank"></a>百度</li>
            <li class="tag "><a href="" target="_blank"></a>知乎</li>
            <li class="tag "><svg class="icon icon-add" aria-hidden="true"><use xlink:href="#icon-plus"></use></svg></li>
        </ul>
    </li>
 */
function render(data) {
    const $itemArr = data.map(obj => {
        const $item = document.createElement('li')
        $item.classList.add('item')
        const $h2 = document.createElement('h2')
        $h2.append(obj.title)
        const $iconSpan = document.createElement('span')
        $iconSpan.innerHTML = `<svg class="icon icon-delete" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg><svg class="icon icon-edit" aria-hidden="true"><use xlink:href="#icon-edit"></use></svg>`
        $h2.append($iconSpan)
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
        let $icon = document.createElement('li')
        $icon.classList.add('tag')
        $icon.classList.add('icon-add')
        $icon.innerHTML = `<svg class="icon icon-add" aria-hidden="true"><use xlink:href="#icon-plus"></use></svg>`
        $ul.append($icon)
        $item.append($h2, $ul)
        return $item
    })
    // console.log($itemArr);

    $('#websites .list').innerHTML = ''
    $('#websites .list').append(...$itemArr)
}

function save() {
    localStorage.setItem('website', JSON.stringify(data))
}
function load() {
    let storagedData = localStorage.getItem('website')
    if (storagedData) {
        data = JSON.parse(storagedData)
    } else {
        data = []
    }

}