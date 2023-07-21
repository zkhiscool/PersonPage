const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
const searchMap = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'bing': 'https://cn.bing.com/search?q='
}
let searchType = 'baidu'

$$('.search-tab').forEach($tab => {
    $tab.onclick = function () {
        // 给每个搜索去掉class
        $$('.search-tab').forEach($tab => $tab.classList.remove('active'))
        this.classList.add('active')
        // data-xxx这种带 “-”的自定义属性，有默认dataset方法
        searchType = this.dataset.type
    }
});

document.onkeyup = function (e) {
    console.log(e.key)
    if (e.key === 'Enter') {
        let url = searchMap[searchType] + $('.search-input input').value
        const $link = document.createElement('a')
        $link.setAttribute('href', url)
        $link.setAttribute('target', '_blank')
        $link.click()
    }
}

$('.icon-search').onclick = function () {

}

function search() {
    let url = searchMap[searchType] + $('.search-input input').value
    const $link = document.createElement('a')
    $link.setAttribute('href', url)
    $link.setAttribute('target', '_blank')
    $link.click()
}