const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const BAIDU_URL = 'https://www.baidu.com/s?wd=';
let searchEngine = 'baidu'
$$('.search-tab').forEach($tab => {
    $tab.onclick = function () {
        // 给每个搜索去掉class
        $$('.search-tab').forEach($tab => $tab.classList.remove('active'))
        this.classList.add('active')
    }
});

$('.icon-search').onclick = function () {
    let value = $('.search-input').value
    const link = document.createElement('a')
    $link.setAttribute('href',)
}