const $ = x => document.querySelector(x)
const $$ = x => document.querySelectorAll(x)

$('.carousel .dots').onclick = function (e) {
    if (e.target.tagName !== 'SPAN') return
    let index = Array.from($$('.carousel .dots span')).indexOf(e.target)
    // 切换dots
    $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'))
    $$('.carousel .dots span')[index].classList.add('active')
    // 切换图片
    $$('.carousel .panels a').forEach(panel => panel.style.zIndex = 1)
    $$('.carousel .panels a')[index].style.zIndex = 10
}

$('.pre').onclick = function (e) {
    let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots span.active'))
    index = (index - 1 + $$('.carousel .dots span').length) % $$('.carousel .dots span').length // 0 ~ 3
    // 切换dots
    setDots(index)
    // 切换图片
    setPanels(index)
}

$('.next').onclick = function (e) {
    let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots span.active'))
    index = (index + 1) % $$('.carousel .dots span').length // 0 ~ 3
    // 切换dots
    setDots(index)
    // 切换图片
    setPanels(index)
}

function setDots(index) {
    $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'))
    $$('.carousel .dots span')[index].classList.add('active')
}
function setPanels(index) {
    $$('.carousel .panels a').forEach(panel => panel.style.zIndex = 1)
    $$('.carousel .panels a')[index].style.zIndex = 10
}