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
    }
});

$('.icon-search').onclick = function () {
    let url = searchMap[searchType] + $('.search-inputinput').value
    const $link = document.createElement('a')
    $link.setAttribute('href', url)
    $link.setAttribute('target', '_blank')
    $link.click()
}