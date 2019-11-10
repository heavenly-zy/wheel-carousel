class Carousel {
    constructor(root, animation) {
        this.animation = animation || ((fromNode, toNode, callback) => { callback() }) // 兜底写法，保证animation不为空
        this.root = root
        this.dotsWrapper = root.querySelector('.dots')
        this.dots = Array.from(root.querySelectorAll('.dots > span'))
        this.panels = Array.from(root.querySelectorAll('.panels > a'))
        this.pre = root.querySelector('.action .pre')
        this.next = root.querySelector('.action .next')

        this.bind()
    }

    get index() { // 相当于vue里面计算属性的用法
        return this.dots.indexOf(this.dotsWrapper.querySelector('span.active'))
    }

    get preIndex() { // this.index 调用  get index() 
        return (this.index - 1 + this.dots.length) % this.dots.length // 0 ~ 3
    }

    get nextIndex() {
        return (this.index + 1) % this.dots.length // 0 ~ 3
    }

    bind() {
        this.dotsWrapper.onclick = (e) => {
            if (e.target.tagName !== 'SPAN') return
            let index = this.dots.indexOf(e.target)
            this.setDots(index)
            this.setPanels(index, this.index)
        }
        this.pre.onclick = (e) => {
            // 注意setPanels要放在setDots前面，因为setDots会导致this.preIndex发生变化
            this.setPanels(this.preIndex, this.index)
            this.setDots(this.preIndex)
        }

        this.next.onclick = (e) => {
            this.setPanels(this.nextIndex, this.index)
            this.setDots(this.nextIndex)
        }
    }
    setDots(index) {
        this.dots.forEach(dot => dot.classList.remove('active'))
        this.dots[index].classList.add('active')
    }
    setPanels(toIndex, fromIndex) {
        this.animation(this.panels[fromIndex], this.panels[toIndex], () => { // 异步的过程，执行完animation后才到active状态，因此这里要使用回调
            this.panels.forEach(panel => panel.style.zIndex = 1)
            this.panels[toIndex].style.zIndex = 10
        }) // animation接收三个参数：之前的panels、要去的panels、最终状态
    }
}

function fade(fromNode, toNode, onFinish) {
    console.log(fromNode, toNode)
    let opacityOffset1 = 1
    let opacityOffset2 = 0
    let step = 0.04
    fromNode.style.zIndex = 10
    toNode.style.zIndex = 9

    function fromNodeAnimation() {
        if (opacityOffset1 > 0) {
            opacityOffset1 -= step
            fromNode.style.opacity = opacityOffset1
            requestAnimationFrame(fromNodeAnimation)
        } else {
            fromNode.style.opacity = 0
        }
    }

    function toNodeAnimation() {
        if (opacityOffset2 < 1) {
            opacityOffset2 += step
            toNode.style.opacity = opacityOffset2
            requestAnimationFrame(toNodeAnimation)
        } else {
            toNode.style.opacity = 1
            onFinish()
        }
    }

    fromNodeAnimation()
    toNodeAnimation()
}

function slide(fromNode, toNode, onFinish) {
    fromNode.style.zIndex = 10
    toNode.style.zIndex = 10

    let width = parseInt(getComputedStyle(fromNode).width)
    let offsetX = width // 要水平移动的距离
    let offset1 = 0 // 第一个元素已经移动的距离
    let offset2 = 0 // 第二个元素已经移动的距离
    let step = 15 // 每次移动的距离

    toNode.style.left = width + 'px' // 把toNode放到fromNode的左边

    function fromNodeAnimation() {
        if (offset1 < offsetX) {
            fromNode.style.left = parseInt(getComputedStyle(fromNode).left) - step + 'px'
            offset1 += step
            requestAnimationFrame(fromNodeAnimation)
        }
    }

    function toNodeAnimation() {
        if (offset2 < offsetX) {
            toNode.style.left = parseInt(getComputedStyle(toNode).left) - step + 'px'
            offset2 += step
            requestAnimationFrame(toNodeAnimation)
        } else {
            onFinish()
            fromNode.style.left = 0
            toNode.style.left = 0
        }
    }

    fromNodeAnimation()
    toNodeAnimation()
}

document.querySelectorAll('.carousel').forEach(x => { new Carousel(x, slide) })