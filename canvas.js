const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d') //获取二次元上下文
var using = false
var lastPoint = {x:undefined,y:undefined}
var lineWidth = 10
var radius = 5

document.body.ontouchStart = function(e){
    console.log('hi')
    e.preventDeafault()
}
autoSetCanvas(canvas)
listenUserActions(canvas,context)
black.onclick = function(){
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}
red.onclick = function(){
    context.strokeStyle = 'red'
    context.fillStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')

}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    context.fillStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    context.fillStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
thin.onclick = function(){
    lineWidth = 2
    radius = 1
}
thick.onclick = function(){
    lineWidth = 10
    radius = 5
}

/*******/
var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
trash.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}
download.onclick = function(){
    console.log('hi')
    // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    // window.location.href=image;
    var a = document.createElement('a')
    document.body.appendChild(a)
    var url = canvas.toDataURL("image/png")
    a.href = url
    a.download = "我的画呀"
    a.target = "_blank"
    a.click()
}

// 按钮写法
// eraser.onclick = function(){
//     eraserEnabled = true
//     actions.classList.add('change')
// }
// brush.onclick = function(){
//     eraserEnabled = false
//     actions.classList.remove('change')
// }

// eraser.onclick = function(){
//     //切换某一个状态可以用以下方法
//     eraserEnabled = !eraserEnabled
// }


/*********/
function autoSetCanvas(canvas){
    windowSize()
    window.onresize = function(){
        windowSize()
    }
    function windowSize(){
        canvas.width = document.documentElement.clientWidth
        canvas.height = document.documentElement.clientHeight
    }
}
function draw(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
}
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.closePath()
    context.stroke()
}
function listenUserActions(canvas,context){
    if(document.body.ontouchstart !== undefined){
        //触屏
        canvas.ontouchstart = function(e){
            console.log(e)
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-10,y-10,20,20)
            }else{
                lastPoint = {x:x,y:y}
                //clinetX,Y获取的永远是距离body的距离
                // console.log(e.clientX)
                // console.log(e.clientY)
                draw(x,y,radius)
            }

        }
        canvas.ontouchmove = function(e){
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            if(using){
                if(eraserEnabled){
                        context.clearRect(x-10,y-10,20,20)
                }else{
                        let newPoint = {x:x,y:y}
                        draw(x,y,radius)
                        drawLine(lastPoint.x,lastPoint.y,
                            newPoint.x,newPoint.y)
                        lastPoint = newPoint
                    }
                }else{ return }
        }
        canvas.ontouchend = function(){
            using = false
        }
    }else{
        //非触屏
        canvas.onmousedown = function(e){
            let x = e.clientX
            let y = e.clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-10,y-10,20,20)
            }else{
                lastPoint = {x:x,y:y}
                //clinetX,Y获取的永远是距离body的距离
                // console.log(e.clientX)
                // console.log(e.clientY)
                draw(x,y,radius)
            }

        }
        canvas.onmousemove = function(e){
            let x = e.clientX
            let y = e.clientY
            if(using){
                if(eraserEnabled){
                        context.clearRect(x-10,y-10,20,20)
                }else{
                        let newPoint = {x:x,y:y}
                        draw(x,y,5)
                        drawLine(lastPoint.x,lastPoint.y,
                            newPoint.x,newPoint.y)
                        lastPoint = newPoint
                    }
                }else{ return }
            }

        canvas.onmouseup = function(){
            using = false
        }
    }

}


// context.fillStyle = "green" //先给颜色再画，顺序不要反
// context.fillRect(10,10,100,100)

// context.strokeStyle = "black"
// context.strokeRect(10,10,100,100)

// context.clearRect(50,50,10,10) // 起始位置，宽，高

// //draw a triangle
// // context.fill()
// context.beginPath()
// context.moveTo(240,240)
// context.lineTo(300,240)
// context.lineTo(300,300)
// context.fill()

// //draw a circle
// context.beginPath()
// context.arc(150,150,20,0,Math.PI*2,true)
// context.fill()
