class Carousel {
    constructor(root) {
        this.root = root
        this.dotsWrapper = root.querySelector('.dots')
        this.dots = Array.from(root.querySelectorAll('.dots > span'))
        this.panels = Array.from(root.querySelectorAll('.panels > a'))
        this.pre = root.querySelector('.action .pre')
        this.next = root.querySelector('.action .next')

        this.bind()
    }

    bind() {
        this.dotsWrapper.onclick = (e) => {
            if (e.target.tagName !== 'SPAN') return
            let index = this.dots.indexOf(e.target)
            this.setDots(index)
            this.setPanels(index)
        }
        this.pre.onclick = (e) => {
            let index = this.dots.indexOf(this.dotsWrapper.querySelector('span.active'))
            index = (index - 1 + this.dots.length) % this.dots.length // 0 ~ 3
            this.setDots(index)
            this.setPanels(index)
        }

        this.next.onclick = (e) => {
            let index = this.dots.indexOf(this.dotsWrapper.querySelector('span.active'))
            index = (index + 1) % this.dots.length // 0 ~ 3
            this.setDots(index)
            this.setPanels(index)
        }
    }
    setDots(index) {
        this.dots.forEach(dot => dot.classList.remove('active'))
        this.dots[index].classList.add('active')
    }
    setPanels(index) {
        this.panels.forEach(panel => panel.style.zIndex = 1)
        this.panels[index].style.zIndex = 10
    }
}

document.querySelectorAll('.carousel').forEach(x => { new Carousel(x) })