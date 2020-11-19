class Checklist extends Object {
    constructor(list, el) {
        super()
        this.$el = document.querySelector(el); //挂载元素
        this.maxIndex = 5;
        this.minIndex = 0;
        this.index = 0; //点击下标
        this.maxpage = 5  //本组件允许显示的页数按钮
        this.page = Math.ceil(list.length / 5);  //总页数,实际数据需要的总页数
        this.DOMS = new Array()  //按钮容器
        this.update()
    }
    update() {
        //创建两个翻页按钮;
        let leftbutton = document.createElement('button');
        let rightbutton = document.createElement('button');
        leftbutton.innerText = '上一页';
        leftbutton.addEventListener('click', () => {
            if (this.index <= 0) {
                this.index = 0;
                if (this.minIndex > 0) {
                    this.minIndex--;
                    this.maxIndex--;
                    this.DOMS.forEach((item) => {
                        item.value = parseInt(item.value) - 1
                    })
                } else {
                    this.minIndex = 0;
                    return
                }
            } else {
                this.index--;
            }
            this.DOMS.forEach((item) => {
                item.style.color = `#000`
            })
            this.DOMS[this.index].style.color = `#ff6700`
        })
        rightbutton.innerText = '下一页';
        rightbutton.addEventListener('click', () => {
            if (this.index + 1 >= Math.min(this.maxpage,this.page)) {
                this.index = Math.min(this.maxpage,this.page)-1;
                if (this.maxIndex >= this.page) {
                    this.maxIndex = this.page;
                    return;
                } else {
                    this.maxIndex++;
                    this.minIndex++;
                    this.DOMS.forEach((item) => {
                        item.value = parseInt(item.value) + 1
                    })
                }

            } else {
                this.index++;
            }
            this.DOMS.forEach((item) => {
                item.style.color = `#000`
            })
            this.DOMS[this.index].style.color = `#ff6700`
        })
        this.$el.appendChild(leftbutton);
        //创建一个点击按钮列表
        let ul = document.createElement('ul');
        ul.style = `list-style:none;display:flex;margin:0;padding:0`
        for (let i = 0; i < Math.min(this.maxpage, this.page); i++) {
            let li = document.createElement('li');
            let input = document.createElement('input')
            input.type = 'button';
            input.value = parseInt(i + 1);
            input.style = `padding:0;border:none;width:100%;height:100%;outline:none;cursor: pointer;`;
            input.addEventListener('click', (ev) => {
                switch (i) {
                    case 1:
                        if (ev.target.value > 2) {
                            this.DOMS.forEach((item) => {
                                item.value = parseInt(item.value) - 1
                            })
                            this.maxIndex--
                            this.minIndex--
                        }
                        break;
                    case 0:
                        if (ev.target.value > 1) {
                            this.DOMS.forEach((item) => {
                                item.value = parseInt(item.value) - 1
                            })
                            this.maxIndex--
                            this.minIndex--
                        }
                        break;
                    case 3:
                        if (ev.target.value <= this.page - 2) {
                            this.DOMS.forEach((item) => {
                                item.value = parseInt(item.value) + 1
                            })
                            this.maxIndex++
                            this.minIndex++
                        }
                        break;
                    case 4:
                        if (ev.target.value < this.page) {
                            this.DOMS.forEach((item) => {
                                item.value = parseInt(item.value) + 1
                            })
                            this.maxIndex++
                            this.minIndex++
                        }
                        break;
                }
                this.index = i
                this.DOMS.forEach((item) => {
                    item.style.color = '#000'
                })
                this.DOMS[this.index].style.color = "#ff6700"
            })

            this.DOMS.push(input)
            li.appendChild(input)
            li.style = `width:20px;height:20px;line-height:20px;text-align:center;margin:0 5px;border-radius:2px;`
            ul.appendChild(li)
        }
        this.$el.style = `display:flex`
        this.$el.append(ul, rightbutton)
    }

}