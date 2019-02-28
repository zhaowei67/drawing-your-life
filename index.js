var canvasA = document.querySelector('#canvas')
var using = false
canvasA.onmousedown = function(a){
    using = true
    // console.log(a)
    var x = a.clientX
    var y = a.clientY
    var point = document.createElement('div')
    console.log(point)
    point.style = "width:6px;height:6px;"+
    "background-color:black;border-radius:50%;"+
    "position:absolute;left:"+(x-3)+"px;top:"+(y-3)+"px;"
    canvasA.append(point)
}

canvasA.onmousemove = function(b){
    // console.log(a)
    if(using){
        var x = b.clientX
        var y = b.clientY
        var point = document.createElement('div')
        point.style = "width:6px;height:6px;"+
        "background-color:black;border-radius:50%;"+
        "position:absolute;left:"+(x-3)+"px;top:"+(y-3)+"px;"
        canvasA.append(point)
    }else{

    }

}

canvasA.onmouseup = function(){
    using = false
}