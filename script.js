let Paddle1 = document.querySelector('#paddle1')
let Paddle2 = document.querySelector('#paddle2')
let Ball = document.querySelector('#ball')


Paddle1.style.marginLeft = "30px"
Paddle1.style.marginTop='0px'
Paddle2.style.marginLeft='1048px'
Paddle2.style.marginTop='0px'
Ball.style.marginLeft='534px'
Ball.style.marginTop = '262px'

let Up_pressed = false
let Down_pressed = false
let W_pressed = false
let S_pressed = false

let ID

let Vx = -1
let Vy = -1
let V = Math.sqrt(Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy, 2)))

document.addEventListener('keydown', (e)=>{
    if(e.keyCode=='87'){
        W_pressed = true
    }
    else if (e.keyCode=='83'){
        S_pressed = true
    }
})

document.addEventListener('keydown', (e)=>{
    if(e.keyCode=='38'){
        Up_pressed = true
    }
    else if (e.keyCode=='40'){
        Down_pressed = true
    }
})

document.addEventListener('keyup', (e)=>{
    if(e.keyCode=='87'){
        W_pressed = false
    }
    else if (e.keyCode=='83'){
        S_pressed = false
    }
})

document.addEventListener('keyup', (e)=>{
    if(e.keyCode=='38'){
        Up_pressed = false
    }
    else if (e.keyCode=='40'){
        Down_pressed = false
    }
})

gameLoop()

function reset() {
    new Audio('score.mp3').play()
    clearInterval(ID)
    Vx=-1
    Vy=-1
    V = Math.sqrt(Math.sqrt(Math.pow(Vx, 2), Math.pow(Vy,2)))
    Ball.style.marginLeft = '534px'
    Ball.style.marginTop = '262px'
    gameLoop()
}
function gameLoop(){
    setTimeout(() => {
       ID = setInterval(() =>{
            if(marginLeft(Ball)<0){
                document.querySelector('#player2').innerHTML = Number(document.querySelector('#player2').innerHTML)+1
                reset()
                return
            }
            if((marginLeft(Ball)+20)>1088){
                document.querySelector('#player1').innerHTML = Number(document.querySelector('#player1').innerHTML)+1
                reset()
                return
            }
            if(marginTop(Ball)<0 || (marginTop(Ball)+20)>544){
                new Audio('wall.mp3').play()
                Vy= -Vy
            }

            let paddle = (marginLeft(Ball)+10<544) ? Paddle1 : Paddle2

            if(collisionDetected(paddle)){
                new Audio('paddle.mp3').play()
                let angle
                let type = (marginLeft(paddle)==30) ? 'player1' : 'player2'
                if (Ball.centerY<paddle.centerY){
                    angle = (type=='player1' ? -Math.PI/4 : (-3*Math.PI)/4)

                }
                else if (Ball.centerY>paddle.centerY){
                    angle = (type=='player1' ? Math.PI/4 : (3*Math.PI)/4)
                }
                else if (Ball.centerY==paddle.centerY){
                    angle = (type=='player1' ? 0 : Math.PI)
                }
                V+= 0.5
                Vx = V*Math.cos(angle)
                Vy = V* Math.sin(angle)
            }

            Ball.style.marginLeft = `${marginLeft(Ball)+Vx}px`
            Ball.style.marginTop = `${marginTop(Ball)+Vy}px`

            if(W_pressed && marginTop(Paddle1)>0){
                Paddle1.style.marginTop = `${marginTop(Paddle1)-2}px`
            }
            else if (S_pressed && marginTop(Paddle1)<473){
                Paddle1.style.marginTop = `${marginTop(Paddle1)+2}px`
            }
            if(Up_pressed && marginTop(Paddle2)>0){
                Paddle2.style.marginTop = `${marginTop(Paddle2)-2}px`
            }
            else if (Down_pressed && marginTop(Paddle2)<473){
                Paddle2.style.marginTop = `${marginTop(Paddle2)+2}px`
            }

        },5)
        
    }, 500)
}

function marginTop(elem){
    return Number(elem.style.marginTop.split('p')[0])

}

function marginLeft(elem){
    return Number(elem.style.marginLeft.split('p')[0])
}

function collisionDetected(paddle){
    Ball.top = marginTop(Ball)
    Ball.bottom = marginTop(Ball)+20
    Ball.centerY= marginTop(Ball)+10
    Ball.left = marginLeft(Ball)
    Ball.right = marginLeft(Ball) + 20
    Ball.centerX = marginLeft(Ball)+10

    paddle.top = marginTop(paddle)
    paddle.bottom = marginTop(paddle)+72
    paddle.centerY = marginTop(paddle)+36
    paddle.left = marginLeft(paddle)
    paddle.right = marginLeft(paddle)+10
    paddle.centerX = marginLeft(paddle)+5

    return Ball.left <paddle.right && Ball.top < paddle.bottom && Ball.right > paddle.left && Ball.bottom > paddle.top

}