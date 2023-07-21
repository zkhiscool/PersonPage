const $ = s => document.querySelector(s)
const $$ = s => document.querySelector(s)
$$('.search-tab').forEach($tab => {
    $tab.onclick = function () {
        // 给每个搜索去掉class
        $$('.search-tab').forEach($tab => $tab.classList.remove('active'))
        this
    }
});
